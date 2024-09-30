import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Importa tus rutas

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.name !== 'login' && !isAuthenticated && to.name !== 'password') {
    next({ name: 'login' });
  } else {
    console.log('pasoiii2');
    next();
  }
});

export default router;
