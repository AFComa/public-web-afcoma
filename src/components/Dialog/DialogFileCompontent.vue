<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md modal-general" style="width: 800px; max-width: 90vw">
      <q-form @submit="onSubmit" dense>
        <q-card-section class="modal-tex">
          <p>{{ props.title }}</p>
          <div class="row q-pt-md q-col-gutter-sm justify-center q-pt-xs">
            <div class="col-xs-12 col-md-5 col-lg-5" v-if="!viewCartera">
              <q-input
                dense
                rounded
                v-model="FileForm.cartera"
                outlined
                label="Cartera"
                lazy-rules
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-5" v-if="!viewCartera">
              <q-input
                dense
                rounded
                v-model="FileForm.cesion"
                outlined
                label="Cesión"
                lazy-rules
                :disable="actionBoton === 'view'"
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-10">
              <q-file
                dense
                rounded
                outlined
                v-model="fileName"
                label="Archivo de carga"
                no-error-icon
                @input="onFileChange($event)"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
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
import { ref, onMounted, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
import * as XLSX from 'xlsx';

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});
const route = useRoute();
const visible = ref(true);
const viewCartera = ref(false);
const actionBoton = ref();
const fileName = ref(null);
const FileForm = ref({
  cartera: '',
  cesion: '',
  data: '',
});
const report = ref(null);

const emits = defineEmits(['cancel', 'select']);

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

const onFileChange = (e) => {
  if (route.name === 'CarteraList') {
    report.value = e.target.files[0];
  } else {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const CargaRegistros = XLSX.utils.sheet_to_json(worksheet);
        FileForm.value.data = CargaRegistros;
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
};
onMounted(async () => {
  if (route.name === 'CarteraList') {
    viewCartera.value = true;
  } else {
    viewCartera.value = false;
  }
});

const onSubmit = () => {
  if (route.name === 'CarteraList') {
    emits('select', report.value);
  } else {
    emits('select', FileForm.value);
  }

  closeDialog();
};
</script>
