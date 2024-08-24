<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md modal-general" style="width: 800px; max-width: 90vw">
      <q-form @submit="onSubmit" dense>
        <q-card-section class="modal-tex">
          <p>{{ props.title }}</p>
          <div class="row q-pt-md q-col-gutter-sm justify-center q-pt-xs">
            <div class="col-xs-12 col-md-5 col-lg-5">
              <q-input
                dense
                rounded
                v-model="ContratForm.name"
                outlined
                label="Nombre del contacto*"
                @keypress="onlyAlphabetic"
                lazy-rules
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-5">
              <q-input
                dense
                rounded
                v-model="ContratForm.email"
                outlined
                label="Correo del contacto*"
                lazy-rules
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                  isValidEmail,
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-5">
              <q-input
                dense
                rounded
                v-model="ContratForm.telefono"
                outlined
                label="Teléfono del contacto*"
                @keypress="onlyNumeric"
                lazy-rules
                maxlength="10"
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-5">
              <q-input
                dense
                rounded
                outlined
                v-model="ContratForm.reporteoApi"
                label="Url de reportero por API*"
                lazy-rules
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-10 col-lg-10">
              <q-input
                dense
                rounded
                outlined
                v-model="ContratForm.incidenciaApi"
                :disable="actionBoton === 'view'"
                label="Url de incidencias por API*"
                lazy-rules
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Cancelar"
            @click="closeDialog"
          />

          <q-btn
            color="secondary"
            no-caps
            unelevated
            size="lg"
            rounded
            label="Aceptar"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<style scoped src="./DialogComponent.scss"></style>
<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import {
  isValidEmail,
  onlyNumeric,
  onlyAlphabetic,
} from '../../utils/validations/validationInputs';

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});

const visible = ref(true);
const router = useRoute();
const actionBoton = ref();
const { isViewProyects } = sysadocAuth();
const ContratForm = ref({
  name: '',
  email: '',
  telefono: '',
  reporteoApi: '',
  incidenciaApi: '',
});

const emits = defineEmits(['cancel', 'select']);

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

const onSubmit = () => {
  emits('select', ContratForm.value);
  closeDialog();
};
onMounted(() => {
  console.log('isViewProyects: ', isViewProyects);
  actionBoton.value = localStorage.getItem('actionuser');
  if (router.params.id) {
    ContratForm.value.name = isViewProyects.value[0].NombreContacto;
    ContratForm.value.email = isViewProyects.value[0].CorreoContacto;
    ContratForm.value.telefono = isViewProyects.value[0].TelefonoContacto;
    ContratForm.value.reporteoApi = isViewProyects.value[0].UrlReporte;
    ContratForm.value.incidenciaApi = isViewProyects.value[0].UrlIncidencias;
  }
});
</script>
