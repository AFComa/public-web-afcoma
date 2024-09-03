<template>
  <q-dialog v-model="show" persistent class="modal-general">
    <q-card class="q-pa-md tam-moda">
      <q-card-section class="modal-content-sesion">
        <img src="../../assets/img/alert.svg" width="100px" height="100px" />
        <p>{{ props.title }}</p>
        <span v-html="props.message"></span>
      </q-card-section>
      <q-card-actions align="center" class="q-pt-lg">
        <q-btn
          color="primary"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Guardar"
          @click="accept(0)"
        />
        <q-btn
          color="secondary"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Finalizar"
          @click="viewFinalizar"
        />
        <q-btn
          color="accent"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Cancelar"
          @click="cancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="show1" persistent class="modal-general">
    <q-card class="q-pa-md tam-moda">
      <q-card-section class="modal-content-sesion">
        <img src="../../assets/img/alert.svg" width="100px" height="100px" />
        <p>{{ props.title }}</p>
        <span
          >Al finalizar el registro ya no se podrá actualizar la información y
          se tomará como progreso en la revisión de todo el proyecto</span
        >
      </q-card-section>
      <q-card-actions align="center" class="q-pt-lg">
        <q-btn
          color="primary"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Finalizar"
          @click="accept(1)"
        />
        <q-btn
          color="secondary"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Cancelar"
          @click="cancel1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped src="./DialogComponent.scss"></style>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
// import { useQuasar } from 'quasar';

const props = defineProps({
  title: {
    type: String,
    default: 'Advertencia',
  },
  message: {
    type: String,
    default: '¿Estás seguro de que quieres continuar?',
  },
});

const emits = defineEmits(['confirm', 'cancel']);

const show = ref(true);
const show1 = ref(false);

function close() {
  show.value = false;
}

function viewFinalizar() {
  close();
  show1.value = true;
}

function accept(i) {
  emits('confirm', i);
  close();
}

function cancel1() {
  show1.value = false;
  emits('cancel');
}

function cancel() {
  emits('cancel');
  close();
}
</script>
