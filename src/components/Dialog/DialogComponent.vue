<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-pa-md modal-general">
      <q-card-section class="modal-content-sesion">
        <img src="../../assets/img/alert.svg" width="100px" height="100px" />
        <p>{{ props.title }}</p>

        <span>{{ props.message }}</span>
      </q-card-section>

      <q-card-actions align="center" class="q-pt-lg">
        <q-btn
          color="primary"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Cancelar"
          @click="cancel"
        />
        &nbsp;&nbsp;&nbsp;
        <q-btn
          color="secondary"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Aceptar"
          @click="accept"
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
// const $q = useQuasar();

// function open() {
//   show.value = true;
// }

function close() {
  show.value = false;
}

function accept() {
  emits('confirm');
  close();
}

function cancel() {
  emits('cancel');
  close();
}
</script>
