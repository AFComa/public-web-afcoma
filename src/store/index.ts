// src/store/index.ts
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authModule from './user';

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}

export default createStore({
  modules: {
    auth: authModule,
    // Otros módulos...
  },
  plugins: [
    createPersistedState({
      key: 'my-app', // Puedes cambiar el nombre de la clave si lo deseas
      paths: ['auth'], // Especifica los módulos que deseas persistir
    }),
  ],
});
