import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/home/HomePage.vue'),
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('pages/code/CodePage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('pages/user/UsersPassword/PasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'Resetpassword',
        component: () => import('pages/user/UsersPassword/PasswordPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    meta: { requiresAuth: true }, // Requiere autenticación
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '',
        name: 'section',
        component: () => import('pages/section/SectionPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'usuarios/:id',
        name: 'UsuariosId',
        component: () => import('src/pages/user/UsersCreate/UsersPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: () => import('src/pages/user/UsersCreate/UsersPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'listar-usuarios',
        name: 'UsuariosList',
        component: () => import('src/pages/user/UsersList/ListPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'validar-information',
        name: 'ValidInformation',
        component: () =>
          import('src/pages/mandatos/Information/ValidInformationPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'listar-mandatos',
        name: 'MandatosList',
        component: () => import('src/pages/mandatos/MandatosList/ListPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'view-mandatos/:id',
        name: 'MandatosView',
        component: () => import('src/pages/mandatos/UploadPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'view-doc',
        name: 'DocSection',
        component: () => import('pages/sisadoc/DocSection/DocSectionPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'listar-proyectos',
        name: 'ProyectosList',
        component: () =>
          import('src/pages/sisadoc/DocListProyect/ListPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'proyectos',
        name: 'ProyectosCreate',
        component: () => import('src/pages/sisadoc/DocCreate/ProyectPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'proyectos/:id',
        name: 'ProyectosEdit',
        component: () => import('src/pages/sisadoc/DocCreate/ProyectPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'config',
        name: 'ConfigUser',
        component: () =>
          import('src/pages/sisadoc/DocListProyect/ListPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'registro-proyecto/:id/:cesion/:name',
        name: 'RegisterProyect',
        component: () =>
          import('src/pages/sisadoc/RegisterProyect/RegisterProyectPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'valid-proyecto/:id/:uid/:cartera/:cesion/:name',
        name: 'ValidProyect',
        component: () =>
          import('src/pages/sisadoc/ValidProyect/ValidProyectPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'listar-cartera',
        name: 'CarteraList',
        component: () => import('src/pages/cartera/carteralist/ListPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'configuration-cartera',
        name: 'CarteraConfig',
        component: () =>
          import('src/pages/cartera/configCartera/ConfigCarteraPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'configuration-relation',
        name: 'RelationConfig',
        component: () =>
          import('src/pages/cartera/configRelation/ConfigRelationPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'configuration-carga',
        name: 'uploadDirect',
        component: () =>
          import('src/pages/cartera/cargaDirecta/CarteraConfigPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
      {
        path: 'reporte-powerby',
        name: 'power',
        component: () => import('src/pages/cartera/powerframe/PowerbiPage.vue'),
        meta: { requiresAuth: true }, // Requiere autenticación
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
