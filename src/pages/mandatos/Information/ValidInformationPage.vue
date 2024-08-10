<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      done-color="green"
      active-color="purple"
      inactive-color="secondary"
    >
      <q-step
        :name="1"
        title="Validar Información Mandatos"
        icon="settings"
        :done="step > 1"
      >
        <FileComponentVue />
      </q-step>

      <q-step
        :name="2"
        title="Carga de contratos Mandatos"
        icon="create_new_folder"
        :done="step > 2"
      >
        <FileDocument />
      </q-step>

      <q-step :name="3" title="Creación del Mandato" icon="add_comment">
        Nose que poner
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation
          style="text-align: center !important"
          class="q-pt-md"
        >
          <q-btn
            no-caps
            size="lg"
            rounded
            @click="
              step === 3 ? saveInfo() : loadingResult();
              $refs.stepper.next();
            "
            color="secondary"
            :label="step === 3 ? 'Finalizar' : 'Continuar'"
          />
          <q-btn
            v-if="step > 1"
            size="lg"
            no-caps
            rounded
            color="primary"
            @click="$refs.stepper.previous()"
            label="Regresar"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <LoadingComponentBasic v-if="loading" />
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="'El proceso de creación mandatos se guardará, para realizar un cambio deberá de consultar con su administrador.'"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import FileComponentVue from '../../../components/File/FileComponent.vue';
import FileDocument from '../../../components/File/FileDocumentComponent.vue';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';

export default {
  components: {
    FileComponentVue,
    LoadingComponentBasic,
    FileDocument,
    DialogComponent,
  },
  setup() {
    const loading = ref(false);
    const warningDialog = ref(false);
    const loadingResult = () => {
      loading.value = true;
      setTimeout(async () => {
        loading.value = false;
      }, 2000);
    };
    const saveInfo = () => {
      warningDialog.value = true;
    };

    function onConfirm() {
      warningDialog.value = false;
      loading.value = true;
      setTimeout(async () => {
        loading.value = false;
      }, 2000);
    }

    function onCancel() {
      warningDialog.value = false;
    }

    return {
      step: ref(1),
      loading,
      saveInfo,
      warningDialog,
      loadingResult,
      onConfirm,
      onCancel,
    };
  },
};
</script>
