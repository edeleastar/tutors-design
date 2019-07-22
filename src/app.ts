import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';
import environment from './environment';

export class App {
  title = 'Tutors';

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.options.pushState = environment.pushState;
    config.options.root = '/';
    config.map ([
      { route: '',                          moduleId: PLATFORM.moduleName('./components/main/main-view'),     name: 'start',   title: 'Module' },
      { route: 'course/*courseurl',         moduleId: PLATFORM.moduleName('./components/course/course-view'), name: 'course',  title: 'Module' },
      { route: 'topic/*topicurl',           moduleId: PLATFORM.moduleName('./components/topic/topic-view'),   name: 'topic',   title: 'Topic' },
      { route: 'lab/*laburl/:step?',        moduleId: PLATFORM.moduleName('./components/lab/lab-view'),       name: 'lab',     title: 'Lab' },
      { route: 'video/*courseUrl/:videoid', moduleId: PLATFORM.moduleName('./components/video/video-view'),   name: 'video',   title: 'Video' },
      { route: 'talk/*courseUrl/:talkid',   moduleId: PLATFORM.moduleName('./components/talk/talk-view'),     name: 'talk',    title: 'Talk' },
      { route: 'talks/*courseurl',          moduleId: PLATFORM.moduleName('./components/wall/wall-view'),     name: 'talk',    title: 'Talks' },
      { route: 'labs/*courseurl',           moduleId: PLATFORM.moduleName('./components/wall/wall-view'),     name: 'lab',     title: 'Labs' },
      { route: 'archives/*courseurl',       moduleId: PLATFORM.moduleName('./components/wall/wall-view'),     name: 'archive', title: 'Archives' },
      { route: 'githubs/*courseurl',        moduleId: PLATFORM.moduleName('./components/wall/wall-view'),     name: 'github',  title: 'Repos' },
      { route: 'videos/*courseurl',         moduleId: PLATFORM.moduleName('./components/wall/wall-view'),     name: 'video',   title: 'Videos' }
    ]);
  }
}
