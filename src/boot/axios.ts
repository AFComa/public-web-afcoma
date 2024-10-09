import axios from 'axios';
import { Dialog } from 'quasar';
let isDialogShown = false;

const api = axios.create({
  baseURL: 'https://apolo.afcoma.com.mx/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://apolo.afcoma.com.mx',
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['x-api-key'] = 'cls[ty-5JDrkzE1HFN9v';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!isDialogShown) {
        isDialogShown = true;
        Dialog.create({
          title: 'Sesión Expirada',
          message: 'Tu sesión ha expirado. ¿Quieres continuar trabajando?.',
          persistent: true,
          style: {
            width: '630px',
            maxWidth: '80vw',
            height: '180px',
            borderRadius: '24px',
          },
          ok: {
            label: 'Continuar',
            color: 'secondary',
            rounded: true,
            style: 'text-transform: none;',
          },
          cancel: {
            label: 'Cerrar Sesión',
            color: 'primary',
            rounded: true,
            style: 'text-transform: none;',
          },
        })
          .onOk(async () => {
            try {
              const { headers } = await api.post('/login/renewtoken', {
                _id: localStorage.getItem('identity'),
              });
              localStorage.removeItem('token');
              localStorage.setItem('token', headers.token);
              isDialogShown = false;
              window.location.href = '/dashboard';
            } catch (renewError) {
              console.error('Error al renovar el token', renewError);
            }
          })
          .onCancel(() => {
            localStorage.clear();
            window.location.href = '/';
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { api };
