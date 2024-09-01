<template>
  <div class="q-pt-lg q-pa-md">
    <div class="justify-center q-col-gutter-md row">
      <div class="col-xs-12 col-sm-6 col-md-11">
        <BreadCrumb :routes="breadcrumbRoutes" />
      </div>
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
          v-for="(field, index) in selectedItem"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-3 q-mb-xs"
        >
          <template v-if="isBoolean(field)">
            <q-checkbox
              v-model="field.value"
              :label="field.key"
              :disable="actionBoton === 'view'"
              class="adaptable-text"
            />
          </template>
          <template v-else>
            <q-input
              class="input-border"
              dense
              :disable="actionBoton === 'view'"
              size="large"
              v-model="field.value"
              :label="field.key"
              filled
              outlined
              :hint="!field.isValid ? field.coments : ''"
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
import BreadCrumb from '../../components/breadcrumb/integretView.vue';
import { mandatosAuth } from 'src/composables/mandatosAuth';
export default {
  name: 'AutocompleteForm',
  components: {
    LoadingOver,
    DialogComponent,
    BreadCrumb,
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
    const breadcrumbRoutes = ref([
      { label: 'Listar Mandatos', path: '/dashboard/listar-mandatos' },
      { label: 'Mandatos', path: '/dashboard/listar-mandatos/Mandatos' },
    ]);
    const handleSelection = () => {
      selectedData.value = transInfo.value.find(
        (category) => category.name === selectedCategory.value.name
      );

      if (selectedData.value) {
        selectedData.value.data = selectedData.value.data.map((item, index) => {
          return {
            ...item,
            order: index + 1,
          };
        });
      }

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

    const dynamicLabel = computed(() => {
      return (option) => {
        const key = firstKey.value;
        return `${option.order}. ${option[key]?.value || ''}`;
      };
    });

    const dynamicValue = computed(() => {
      return (option) => {
        return option.order;
      };
    });

    const isBoolean = (value) => {
      return value.value === true || value.value === false;
    };
    onMounted(async () => {
      actionBoton.value = localStorage.getItem('actionuser');
      nameMandato.value = await isViewMandatos.value.idmandato;
      transInfo.value = await isViewMandatos.value.datosmandato;
    });

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
      saveInfo,
      onCancel,
      loading,
      breadcrumbRoutes,
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
