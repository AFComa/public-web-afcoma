<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md modal-general" style="width: 800px; max-width: 90vw">
      <q-form @submit="onSubmit" dense>
        <q-card-section class="modal-tex">
          <p>{{ props.title }}</p>
          <div class="row q-pt-md q-col-gutter-sm justify-center q-pt-xs">
            <div
              class="col-xs-12 col-md-5 col-lg-10"
              v-if="title === 'Cargar Url Power By'"
            >
              <q-input
                dense
                rounded
                v-model="link"
                outlined
                label="Agregar Url power by"
                lazy-rules
                no-error-icon
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Este campo es obligatorio',
                ]"
              />
            </div>
            <div class="col-xs-12 col-md-5 col-lg-10" v-else>
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

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});
const route = useRoute();
const visible = ref(true);
const viewCartera = ref(false);
const fileName = ref(null);
const link = ref('');
const report = ref(null);

const emits = defineEmits(['cancel', 'select']);

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

onMounted(async () => {
  if (route.name === 'CarteraList') {
    viewCartera.value = true;
  } else {
    viewCartera.value = false;
  }
});

const onFileChange = (event) => {
  report.value = event.target.files[0];
};

const onSubmit = () => {
  if (props.title === 'Cargar Url Power By') {
    emits('select', link.value);
  } else {
    emits('select', report.value);
  }

  closeDialog();
};
</script>
