import { computed } from 'vue';
import { useStore } from 'vuex';
import type { UserI } from '../interfaces/auth/Acces.interfaces';
import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';
// import { CreateGUI } from 'src/interfaces/components/Grid.interfaces';

export const useAuth = () => {
  const store = useStore();

  return {
    isToken: computed(() => store.state.auth.data),
    // Getters
    isLogged: computed(() => store.getters['auth/isLogged']),
    // Actions
    saveUser: (data: UserI) => store.dispatch('auth/loginUser', data),
    validCode: (valid: string) => store.dispatch('auth/accesLogin', valid),
    createUsers: (data: CreateGUI) => store.dispatch('auth/createUser', data),
    resetPass: (id: number | undefined) =>
      store.dispatch('auth/resetPassword', id),
  };
};
