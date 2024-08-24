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
