import { HttpClient } from "aurelia-fetch-client";
import { Course } from "./course";
import { autoinject } from "aurelia-framework";
import { NavigatorProperties } from "../resources/elements/iconography/styles";
import * as path from "path";
import { findCourseUrls, lastSegment } from "./utils";

@autoinject
export class CourseRepo {
  course: Course;
  courseUrl = "";

  constructor(private http: HttpClient, private navigatorProperties: NavigatorProperties) {}

  async getCourse(url) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = new Course(this.http, url);
      try {
        await this.course.fetchCourse();
        this.navigatorProperties.init(this.course);
      } catch (e) {
        this.courseUrl = "";
        this.course = null;
      }
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.fetchCourse(path.dirname(url));
    return this.course.topicIndex.get(lastSegment(url));
  }

  async fetchCourseFromTalk(url: string) {
    console.log(url);
    const urls = findCourseUrls(url);
    await this.fetchCourse(urls[0]);
    return this.course;
  }

  async fetchWall(url: string, type: string) {
    await this.fetchCourse(url);
    return this.course.walls.get(type);
  }
}
