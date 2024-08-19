import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'; // Importa tus rutas
import { useAuth } from 'src/composables/userAuth';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isToken } = useAuth();
  const isAuthenticated = isToken.value;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
