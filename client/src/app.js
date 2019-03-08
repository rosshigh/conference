export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'home'],
        moduleId: './modules/home/home',
        name: 'Home',
        settings: { auth: false, roles: [] },
        title: 'Conference'
      }
    ])
  }
}
