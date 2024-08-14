<template>
  <div class="q-pt-xl q-pb-xl">
    <div class="row q-col-gutter-lg q-px-xl q-mb-xs">
      <div class="col-xs-12 col-sm-4 col-md-3">
        <q-input
          :disable="actionBoton === 'view'"
          dense
          v-model="nameMandato"
          label="Nombre mandato"
          filled
          outlined
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3">
        <q-select
          dense
          v-model="selectedCategory"
          :options="transInfo"
          label="Seleccione una opción"
          option-label="name"
          option-value="name"
          filled
          outlined
          @update:model-value="handleSelection"
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3" v-if="selectedData">
        <q-select
          dense
          v-model="selectedItem"
          :options="selectedData.data"
          label="Seleccione un elemento"
          :option-label="dynamicLabel"
          :option-value="dynamicValue"
          filled
          outlined
        />
      </div>
    </div>

    <div v-if="selectedData">
      <div v-if="selectedItem" class="row q-mt-md q-col-gutter-lg q-px-xl">
        <div
          v-for="(value, key) in selectedItem"
          :key="key"
          class="col-xs-12 col-sm-6 col-md-3"
        >
          <template v-if="isBoolean(value)">
            <q-checkbox
              dense
              :disable="actionBoton === 'view'"
              v-model="selectedItem[key]"
              :label="key"
              class="adaptable-text"
            />
          </template>
          <template v-else>
            <q-input
              :disable="actionBoton === 'view'"
              dense
              v-model="selectedItem[key]"
              @change="updateInput()"
              :label="key"
              filled
              outlined
            />
          </template>
        </div>
      </div>
    </div>
    <div class="row q-pt-lg justify-center" v-if="selectedData">
      <q-btn
        class="custom-button"
        no-caps
        unelevated
        rounded
        size="lg"
        label="Continuar"
        @click="saveInfo"
      />
    </div>
    <LoadingOver
      v-if="loading"
      :messageOne="'Espere un momento estamos cargando la información...'"
      :messageTwon="'La Información esta en proceso de actualización..'"
    />
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="'¿Estás seguro que desea actualizar la información?'"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import LoadingOver from '../../components/Loading/LoadingComponent.vue';
import DialogComponent from '../../components/Dialog/DialogComponent.vue';
import { mandatosAuth } from 'src/composables/mandatosAuth';
export default {
  name: 'AutocompleteForm',
  components: {
    LoadingOver,
    DialogComponent,
  },
  setup() {
    const { isViewMandatos, updateMandato } = mandatosAuth();
    const routers = useRouter();
    const $q = useQuasar();
    const files = ref([]);
    const viewFile = ref(false);
    const actionBoton = ref();
    const sheets = ref([]);
    const transInfo = ref([]);
    const currentTab = ref(0);
    const loading = ref(false);
    const selectedCategory = ref(null);
    const warningDialog = ref(false);
    const selectedData = ref(null);
    const selectedItem = ref(null);
    const nameMandato = ref();

    // const containsStringOrDate = (value) => {
    //   if (typeof value === 'string') {
    //     const lowerValue = value.toLowerCase();
    //     return lowerValue === 'string' || lowerValue === 'date';
    //   }
    //   return false;
    // };

    // const filterOutStringOrDateRecords = (data) => {
    //   return data.filter((row) => {
    //     return !Object.values(row).some((value) => containsStringOrDate(value));
    //   });
    // };

    // const convertSiNoToBoolean = (value) => {
    //   if (typeof value === 'string') {
    //     const lowerValue = value.toLowerCase();
    //     if (lowerValue === 'si') return true;
    //     if (lowerValue === 'no') return false;
    //   }
    //   return value;
    // };

    const handleSelection = () => {
      selectedData.value = transInfo.value.find(
        (category) => category.name === selectedCategory.value.name
      );

      selectedItem.value = null;
    };

    const firstKey = computed(() => {
      if (selectedData.value && selectedData.value.data.length > 0) {
        return Object.keys(selectedData.value.data[0])[0];
      }
      return '';
    });

    const saveInfo = () => {
      actionBoton.value === 'view'
        ? routers.push('/dashboard/listar-mandatos')
        : (warningDialog.value = true);
    };

    const onConfirm = async () => {
      // Lógica cuando se confirma
      loading.value = true;
      warningDialog.value = false;
      const data = {
        _id: isViewMandatos.value._id,
        idmandato: nameMandato.value,
        asignado_a: isViewMandatos.value.asignado_a,
        datosmandato: transInfo.value,
      };

      setTimeout(async () => {
        const response = await updateMandato(data);
        if (response.ok) {
          routers.push('/dashboard/listar-mandatos');
          $q.notify({
            type: 'positive',
            message: response.resultado,
          });
        } else {
          $q.notify({
            type: 'negative',
            message: response.message,
          });
        }
        loading.value = false;
      }, 5000);
    };

    function onCancel() {
      // Lógica cuando se cancela
      warningDialog.value = false;
    }

    const dynamicLabel = computed(() => firstKey.value);
    const dynamicValue = computed(() => firstKey.value);

    const isBoolean = (value) => {
      return value === true || value === false;
    };
    onMounted(async () => {
      actionBoton.value = localStorage.getItem('actionuser');

      nameMandato.value = await isViewMandatos.value.idmandato;
      transInfo.value = await isViewMandatos.value.datosmandato;
    });
    const updateInput = () => {
      console.log('selectedData: ', transInfo.value);
    };

    return {
      selectedData,
      selectedItem,
      actionBoton,
      dynamicLabel,
      dynamicValue,
      selectedCategory,
      firstKey,
      files,
      sheets,
      transInfo,
      currentTab,
      viewFile,
      nameMandato,
      onConfirm,
      warningDialog,
      handleSelection,
      isBoolean,
      updateInput,
      saveInfo,
      onCancel,
      loading,
    };
  },
};
</script>

<style scoped>
.q-card {
  max-width: 500px;
  margin: auto;
}
</style>
