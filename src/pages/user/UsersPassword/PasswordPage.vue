<template>
  <q-page class="password-code flex flex-center">
    <q-card class="card-content">
      <q-card-section>
        <div
          class="text-h5 text-center font-afcoma-regular"
          v-if="!passChange()"
        >
          Crea tu Contraseña
        </div>
        <div
          class="text-h5 text-center font-afcoma-regular"
          v-if="passChange()"
        >
          Desbloquear Contraseña
        </div>
        <div class="row justify-center">
          <div class="q-mt-lg col-xs-10 col-sm-9 col-md-9" v-if="!passChange()">
            Para el uso del sistema favor de crear su contraseña.
          </div>
          <div class="q-mt-lg col-xs-10 col-sm-9 col-md-9" v-if="passChange()">
            Para desbloquear su cuenta favor de actualizar su contraseña.
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="row justify-center">
          <div class="col-xs-10 col-sm-9 col-md-9">
            <q-input
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              :rules="passwordRules"
              maxlength="8"
              rounded
              outlined
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="q-mt-md col-xs-10 col-sm-9 col-md-9">
            <q-input
              v-model="confirmPassword"
              :type="isPwd2 ? 'password' : 'text'"
              label="Confirmar Contraseña"
              :rules="confirmPasswordRules"
              rounded
              outlined
              lazy-rules
              maxlength="8"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAuth } from 'src/composables/userAuth';
import LoadingOver from '../../../components/Loading/LoadingComponent.vue';

export default {
  name: 'PasswordForm',
  components: {
    LoadingOver,
  },
  setup() {
    const password = ref('');
    const confirmPassword = ref('');
    const isPwd = ref(true);
    const isPwd2 = ref(true);
    const urlParams = ref('');
    const loading = ref(false);
    const $q = useQuasar();
    const { CreatePass, ValidToken, ResetPassComplete } = useAuth();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const router = useRouter();
    const route = useRoute();
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
      setTimeout(async () => {
        const response = passChange()
          ? await ResetPassComplete({
              token: urlParams.value.get('token'),
              password: password.value,
            })
          : await CreatePass({
              token: urlParams.value.get('token'),
              password: password.value,
            });
        if (response.ok) {
          $q.notify({
            type: 'positive',
            message:
              'Tu cuenta se ha validado correctamente, favor de iniciar sesión.',
          });
          router.push('/');
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        loading.value = false;
      }, 5000);
    };

    const passChange = () => {
      if (route.path === '/reset-password') {
        return true;
      } else {
        return false;
      }
    };

    onMounted(async () => {
      passChange();
      urlParams.value = await new URLSearchParams(window.location.search);
      const resultToken = await ValidToken(urlParams.value.get('token'));
      if (resultToken.ok) {
        $q.notify({
          type: 'positive',
          message: 'Favor de colocar tu contraseña.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: resultToken.message,
        });
        router.push('/');
      }
    });

    return {
      password,
      confirmPassword,
      passwordRules,
      confirmPasswordRules,
      onSubmit,
      loading,
      urlParams,
      isPwd,
      isPwd2,
      passChange,
    };
  },
};
</script>

<style scoped src="./PasswordPage.scss"></style>
