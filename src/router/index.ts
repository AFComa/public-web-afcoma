import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Importa tus rutas

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!!!localStorage.getItem('token');

  console.log('isAuthenticated: ', isAuthenticated);
  console.log('o.meta.requiresAuth: ', to.name);

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
    next(false);
  } else {
    next();
  }
});

export default router;
