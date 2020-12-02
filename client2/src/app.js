export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'homePage'],
        moduleId: PLATFORM.moduleName('./modules/site/homePageGaia'),
        name: 'Home Page',
        settings: { auth: false, roles: [] },
        title: 'SAP Academic User Group'
      },
      {
        route: 'events',
        moduleId: PLATFORM.moduleName('./modules/site/events'),
        name: 'Events',
        settings: { auth: false, roles: [] },
        title: 'Events'
      },
      {
        route: 'board',
        moduleId: PLATFORM.moduleName('./modules/site/board'),
        name: 'Board',
        settings: { auth: false, roles: [] },
        title: 'Board'
      },
      {
        route: 'contact',
        moduleId: PLATFORM.moduleName('./modules/site/contact'),
        name: 'Contact',
        settings: { auth: false, roles: [] },
        title: 'Contact'
      },
      {
        route: 'uccs',
        moduleId: PLATFORM.moduleName('./modules/site/uccs'),
        name: 'UCCs',
        settings: { auth: false, roles: [] },
        title: 'UCCs'
      },
      {
        route: 'news',
        moduleId: PLATFORM.moduleName('./modules/site/news'),
        name: 'news',
        settings: { auth: false, roles: [] },
        title: 'news'
      },
      {
        route: 'sapua',
        moduleId: PLATFORM.moduleName('./modules/site/sapua'),
        name: 'sapua',
        settings: { auth: false, roles: [] },
        title: 'sapua'
      },
      {
        route: 'library',
        moduleId: PLATFORM.moduleName('./modules/site/library'),
        name: 'library',
        settings: { auth: false, roles: [] },
        title: 'library'
      },
      {
        route: 'conf2019',
        moduleId: './modules/conf2019/home',
        name: 'Conference 2019',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2019'
      },
      {
        route: 'conf2020',
        moduleId: PLATFORM.moduleName('./modules/conf2020/home'),
        name: 'Conference 2020',
        settings: { auth: false, roles: [] },
        title: 'SAP University Alliance Conference 2020'
      }
    ])
  }
}
