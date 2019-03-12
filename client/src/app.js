export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'landing'],
        moduleId: './modules/home/landing',
        name: 'Landing',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      },
      {
        route: 'home',
        moduleId: './modules/home/home',
        name: 'Home',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      },
      {
        route: 'register',
        moduleId: './modules/home/register',
        name: 'Register',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      },
      {
        route: 'agenda',
        moduleId: './modules/home/agenda',
        name: 'Agenda',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      },
      {
        route: 'submit',
        moduleId: './modules/home/submit',
        name: 'Submission',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      }
    ])
  }
}
