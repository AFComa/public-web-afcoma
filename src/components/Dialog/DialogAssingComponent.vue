<template>
  <q-dialog v-model="visible" persistent>
    <q-card class="q-pa-md modal-general" style="width: 700px; max-width: 80vw">
      <q-card-section class="modal-content-sesion">
        <p>{{ props.title }}</p>
        <div class="row q-pt-md justify-center">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <label for="user">Selecciona un Usuario:</label>
            <q-select
              class="q-pt-md"
              filled
              v-model="model"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <label for="user">Selecciona una opción:</label>
            <q-select
              class="q-pt-md"
              filled
              v-model="model2"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options2"
              @filter="filterFn2"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
          @click="acceptDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped src="./DialogComponent.scss"></style>
<script setup>
import { ref, defineEmits } from 'vue';
import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'Mi Diálogo',
  },
});

const router = useRoute();
const visible = ref(true);
const model = ref(null);
const model2 = ref(null);
const { isAssingUser } = useAuth();
const { isAssingMandatos } = mandatosAuth();
const { isListProyects } = sysadocAuth();

const emits = defineEmits(['confirm', 'cancel', 'select']);

const options = ref(
  isAssingUser?.value?.map((item) => ({
    label: `${item.user} ${item.apellidos}`, // Concatenar user y apellidos
    value: item._id, // Usar _id como value
  }))
);

console.log('isListProyects: ', isListProyects.value);

const options2 = ref(
  router.path === '/dashboard/listar-proyectos'
    ? isListProyects?.value?.map((item) => ({
        label: item.NombreProyecto, // Concatenar user y apellidos
        value: item.id, // Usar _id como value
      }))
    : isAssingMandatos?.value?.map((item) => ({
        label: item.idmandato, // Concatenar user y apellidos
        value: item._id, // Usar _id como value
      }))
);

// Función de filtrado
const filterFn = (val, update) => {
  const needle = val.toLowerCase();
  update(() => {
    options.value = isAssingUser.value
      .map((item) => ({
        label: `${item.user} ${item.apellidos}`, // Concatenar user y apellidos
        value: item._id, // Usar _id como value
      }))
      .filter((option) => option.label.toLowerCase().includes(needle));
  });
};

const filterFn2 = (val, update) => {
  const needle = val.toLowerCase();
  update(() => {
    router.path === '/dashboard/listar-proyectos'
      ? (options2.value = isListProyects.value
          .map((item) => ({
            label: item.NombreProyecto, // Concatenar user y apellidos
            value: item.id, // Usar _id como value
          }))
          .filter((option) => option.label.toLowerCase().includes(needle)))
      : (options2.value = isAssingMandatos.value
          .map((item) => ({
            label: item.idmandato, // Concatenar user y apellidos
            value: item._id, // Usar _id como value
          }))
          .filter((option) => option.label.toLowerCase().includes(needle)));
  });
};

const closeDialog = () => {
  visible.value = false;
  emits('cancel');
};

const acceptDialog = () => {
  emits('select', model.value, model2.value);
  closeDialog();
};
</script>
