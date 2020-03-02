export class Conf2020Home {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['','landing'],
        moduleId: './landing',
        name: 'Landing',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'home',
        moduleId: './home',
        name: 'Home',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'sponsorships',
        moduleId: './sponsorships',
        name: 'Sponsorships',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'highlights',
        moduleId: './highlights',
        name: 'Highlights',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'files',
        moduleId: './files',
        name: 'Files',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'uploadFiles',
        moduleId: './uploadFiles',
        name: 'UploadFiles',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'register',
        moduleId: './register',
        name: 'Register',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'social',
        moduleId: './social',
        name: 'Social',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'logistics',
        moduleId: './logistics',
        name: 'Logistics',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'agenda',
        moduleId: './agenda',
        name: 'Agenda',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'submit',
        moduleId: './submit',
        name: 'Submission',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      },
      {
        route: 'contact',
        moduleId: './contact',
        name: 'Contact',
        settings: { auth: false, roles: [] },
        title: 'SAP Next-Gen Chapter Conference 2020'
      }
    ])
  }
}
