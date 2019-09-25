export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'homePage'],
        moduleId: './modules/site/homePage',
        name: 'Home Page',
        settings: { auth: false, roles: [] },
        title: 'SAP Academic User Group'
      },
      {
        route: 'conf2019',
        moduleId: './modules/conf2019/home',
        name: 'Conference 2019',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2019'
      }
      ,
      {
        route: 'conf2020',
        moduleId: './modules/conf2020/home',
        name: 'Conference 2020',
        settings: { auth: false, roles: [] },
        title: 'SAP University Alliance Conference 2020'
      }
    ])
  }
}
