import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '',
        name: 'login',
        component: () => import('pages/home/HomePage.vue'),
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('pages/code/CodePage.vue'),
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
      },
      {
        path: 'usuarios/:id',
        name: 'UsuariosId',
        component: () => import('src/pages/user/UsersCreate/UsersPage.vue'),
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: () => import('src/pages/user/UsersCreate/UsersPage.vue'),
      },
      {
        path: 'listar-usuarios',
        name: 'UsuariosList',
        component: () => import('src/pages/user/UsersList/ListPage.vue'),
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
