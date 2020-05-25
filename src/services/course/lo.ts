import { Topic } from "./topic";

export interface Student {
  name: string;
  github: string;
}

export interface VideoIdentifier {
  service: string;
  id: string;
}

export interface VideoIdentifiers {
  videoid: string;
  videoIds: VideoIdentifier[];
}

export interface Lo {
  properties: { [prop: string]: string };
  enrollment: { students: Student[] };
  version: string;
  type: string;
  shortTitle: string;
  title: string;
  img: string;
  video: string;
  videoids?: VideoIdentifiers;
  pdf: string;
  summary: string;
  contentMd: string;
  route: string;
  id: string;
  hide: boolean;
  los: Lo[];
  parent: Topic;
}
