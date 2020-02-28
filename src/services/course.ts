import { Lo, Student } from "./lo";
import { HttpClient } from "aurelia-fetch-client";
import { allLos, allVideoLos, fixRoutes, getSortedUnits, injectCourseUrl } from "./utils";
import { Topic } from "./topic";

export class Course {
  lo: Lo;
  topics: Topic[] = [];
  units: Lo[];
  standardLos: Lo[];
  allLos: Lo[];
  url: string;
  authLevel = 0;
  analytics = 0;
  topicIndex = new Map<string, Topic>();
  videos = new Map<string, Lo>();
  talks = new Map<string, Lo>();
  labIndex = new Map<string, Lo>();
  walls = new Map<string, Lo[]>();

  constructor(private http: HttpClient, url: string) {
    this.url = url;
  }

  async fetch(url: string, complete = false) {
    const response = await this.http.fetch("https://" + url + "/tutors.json");
    const lo = await response.json();
    injectCourseUrl(lo, url);
    if (lo.properties.hasOwnProperty("auth")) this.authLevel = lo.properties.auth;
    if (lo.properties.hasOwnProperty("analytics")) this.analytics = lo.properties.analytics;
    this.lo = lo;
    return lo;
  }

  populate() {
    for (let lo of this.lo.los) {
      const topic = new Topic(lo, this.url);
      this.topics.push(topic);
      this.topicIndex.set(lo.id, topic);
    }
    this.standardLos = this.lo.los;
    const talkLos = allLos("talk", this.lo.los);
    talkLos.forEach(lo => {
      this.talks.set(`${lo.route}`, lo);
    });
    const videoLos = allVideoLos(this.lo.los);
    videoLos.forEach(lo => {
      this.videos.set(`${lo.video}`, lo);
    });

    this.addWall("talk");
    if (videoLos.length > 0) {
      this.walls.set("video", videoLos);
    }
    const labLos = allLos("lab", this.lo.los);
    labLos.forEach(lo => {
      fixRoutes(lo);
      this.labIndex.set(lo.route, lo);
    });
    if (labLos.length > 0) {
      this.walls.set("lab", labLos);
    }

    this.addWall("github");
    this.addWall("archive");

    this.units = getSortedUnits(this.lo.los);
    this.standardLos = this.lo.los.filter(
      lo => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk"
    );
  }

  async fetchCourse() {
    this.lo = await this.fetch(this.url);
    this.allLos = this.lo.los;
    this.lo.los = this.lo.los.filter(lo => lo.hide != true);
    this.populate();
  }

  addWall(type: string) {
    const los = allLos(type, this.lo.los);
    if (los.length > 0) {
      this.walls.set(type, los);
    }
  }

  showAllLos() {
    this.lo.los = this.allLos;
    this.populate();
  }

  isPortfolio() {
    let isPortfolio = false;
    if (this.lo.properties.portfolio !== undefined) {
      const portfolio: any = this.lo.properties.portfolio;
      isPortfolio = portfolio == true;
    }
    return isPortfolio;
  }

  hasEnrollment(): boolean {
    return this.lo.enrollment !== undefined;
  }

  getStudents(): Student[] {
    return this.lo.enrollment.students;
  }
}
