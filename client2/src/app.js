export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'homePage'],
        moduleId: PLATFORM.moduleName('./modules/site/homePageGaia'),
        name: 'Home Page',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'events',
        moduleId: PLATFORM.moduleName('./modules/site/events'),
        name: 'Events',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'board',
        moduleId: PLATFORM.moduleName('./modules/site/board'),
        name: 'Board',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'committees',
        moduleId: PLATFORM.moduleName('./modules/site/committees'),
        name: 'Committees',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'contact',
        moduleId: PLATFORM.moduleName('./modules/site/contact'),
        name: 'Contact',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'uccs',
        moduleId: PLATFORM.moduleName('./modules/site/uccs'),
        name: 'UCCs',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'news',
        moduleId: PLATFORM.moduleName('./modules/site/news'),
        name: 'news',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'sapua',
        moduleId: PLATFORM.moduleName('./modules/site/sapua'),
        name: 'sapua',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'library',
        moduleId: PLATFORM.moduleName('./modules/site/library'),
        name: 'library',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'conf2019',
        moduleId: './modules/conf2019/home',
        name: 'Conference 2019',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'conf2020',
        moduleId: PLATFORM.moduleName('./modules/conf2020/home'),
        name: 'Conference 2020',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'conf2021', 
        moduleId: PLATFORM.moduleName('./modules/site/conf2021'),
        name: 'Conference 2021',
        settings: { auth: false, roles: [] },
        title: 'SAP North American Academic Community'
      },
      {
        route: 'naerpsim', 
        moduleId: PLATFORM.moduleName('./modules/site/naerpsim'),
        name: 'ERPSim',
        settings: { auth: false, roles: [] },
        title: '2021 North American ERPsim Competition'
      }
    ])
  }
}
