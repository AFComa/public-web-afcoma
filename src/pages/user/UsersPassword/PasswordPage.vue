<template>
  <q-page class="password-code flex flex-center">
    <q-card class="card-content">
      <q-card-section>
        <div class="text-h5 text-center font-afcoma-regular">
          Crea tu Contraseña
        </div>
        <div class="row justify-center">
          <div class="q-mt-lg col-xs-10 col-sm-9 col-md-9">
            Para el uso del sistema favor de crear su contraseña.
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="row justify-center">
          <div class="col-xs-10 col-sm-9 col-md-9">
            <q-input
              v-model="password"
              type="password"
              label="Contraseña"
              :rules="passwordRules"
              rounded
              outlined
              lazy-rules
            >
              <template v-slot:append>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>
          <div class="q-mt-md col-xs-10 col-sm-9 col-md-9">
            <q-input
              v-model="confirmPassword"
              type="password"
              label="Confirmar Contraseña"
              :rules="confirmPasswordRules"
              rounded
              outlined
              lazy-rules
            >
              <template v-slot:append>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>

          <!-- <q-btn type="submit" label="Submit" color="primary" /> -->
          <div class="q-mt-md col-xs-12 col-sm-12 col-md-7 text-center">
            <q-btn
              class="custom-button"
              type="submit"
              no-caps
              rounded
              size="lg"
              label="Continuar"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <LoadingOver
      v-if="loading"
      :messageOne="'Espere un momento estamos validando la información...'"
      :messageTwon="'El usuario se esta creando, el sistema lo direccionará al login para su acceso..'"
    />
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';

export default {
  name: 'PasswordForm',
  components: {
    LoadingOver,
  },
  setup() {
    const password = ref('');
    const confirmPassword = ref('');
    const loading = ref(false);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const router = useRouter();
    const passwordRules = [
      (val) => !!val || 'La contraseña es requerida.',
      (val) =>
        passwordRegex.test(val) ||
        'La contraseña debe contener 8 characteres, letras, números y carácter especial.',
    ];

    const confirmPasswordRules = [
      (val) => !!val || 'La contraseña es requerida.',
      (val) => val === password.value || 'La contraseña no coinciden.',
    ];

    const onSubmit = async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        router.push('/');
      } finally {
        loading.value = false;
      }
    };

    return {
      password,
      confirmPassword,
      passwordRules,
      confirmPasswordRules,
      onSubmit,
      loading,
    };
  },
};
</script>

<style scoped src="./PasswordPage.scss"></style>
