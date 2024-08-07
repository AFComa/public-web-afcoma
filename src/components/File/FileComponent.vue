<template>
  <div class="q-pt-xl q-pb-xl">
    <div class="row justify-center" v-if="!viewFile">
      <q-uploader
        v-model="files"
        label="Favor de cargar el archivo"
        accept=".xlsx, .xls"
        @added="handleFile"
        :disable="files.length > 0"
      />
    </div>
    <div class="row justify-center q-col-gutter-lg">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-select
          v-if="viewFile"
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
      <div class="col-xs-12 col-sm-6 col-md-4" v-if="selectedData">
        <q-select
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
          class="col-xs-12 col-sm-6 col-md-3 q-mb-xs"
        >
          <template v-if="isBoolean(value)">
            <q-checkbox
              v-model="selectedItem[key]"
              :label="key"
              class="adaptable-text"
            />
          </template>
          <template v-else>
            <q-input
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
    <!-- <div class="row q-pt-lg justify-center" v-if="selectedData">
      <q-btn
        class="custom-button"
        no-caps
        unelevated
        rounded
        size="lg"
        label="Guardar"
        @click="saveInfo"
      />
    </div> -->
    <LoadingOver
      v-if="loading"
      :messageOne="'Espere un momento estamos cargando la información...'"
      :messageTwon="'La Información esta en proceso de validación..'"
    />
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="'¿Estás seguro de que quieres continuar?'"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import LoadingOver from '../../components/Loading/LoadingComponent.vue';
import DialogComponent from '../../components/Dialog/DialogComponent.vue';
import * as XLSX from 'xlsx';
export default {
  name: 'FileComponent',
  components: {
    LoadingOver,
    DialogComponent,
  },
  setup() {
    const files = ref([]);
    const viewFile = ref(false);
    const sheets = ref([]);
    const transInfo = ref([]);
    const currentTab = ref(0);
    const loading = ref(false);
    const selectedCategory = ref(null);
    const warningDialog = ref(false);
    const selectedData = ref(null);
    const selectedItem = ref(null);

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

    const convertSiNoToBoolean = (value) => {
      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase();
        if (lowerValue === 'si') return true;
        if (lowerValue === 'no') return false;
      }
      return value;
    };

    const handleFile = async (fileList) => {
      loading.value = true;

      setTimeout(async () => {
        if (fileList.length === 0) return;

        const file = fileList[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          sheets.value = workbook.SheetNames.map((sheetName) => ({
            name: sheetName,
            data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
              header: 1,
              defval: '',
            }),
          }));

          transInfo.value = sheets.value
            .filter((item) => item.name !== 'Glosario_Opciones')
            .map((sheet) => ({
              name: sheet.name,
              data: sheet.data.slice(1).map((row) => {
                return sheet.data[0].reduce((acc, field, index) => {
                  acc[field] = convertSiNoToBoolean(row[index]);
                  return acc;
                }, {});
              }),
            }));
        };
        viewFile.value = true;
        console.log('transInfo: ', transInfo);
        reader.readAsArrayBuffer(file);
        loading.value = false;
      }, 5000);
    };

    const handleSelection = () => {
      selectedData.value = transInfo.value.find(
        (category) => category.name === selectedCategory.value.name
      );
      console.log('selectedData: ', selectedData);
      selectedItem.value = null;
    };

    const firstKey = computed(() => {
      if (selectedData.value && selectedData.value.data.length > 0) {
        return Object.keys(selectedData.value.data[0])[0];
      }
      return '';
    });

    const saveInfo = () => {
      warningDialog.value = true;
      console.log('transInfo.value: ', transInfo.value);
      console.log('selectedDatasss: ', selectedData);
    };

    function onConfirm() {
      // Lógica cuando se confirma
      warningDialog.value = false;
      console.log('Confirmado');
    }

    function onCancel() {
      // Lógica cuando se cancela
      warningDialog.value = false;
      console.log('Cancelado');
    }

    const dynamicLabel = computed(() => firstKey.value);
    const dynamicValue = computed(() => firstKey.value);

    const isBoolean = (value) => {
      return value === true || value === false;
    };

    const updateInput = () => {
      console.log('selectedData: ', selectedData);
    };

    return {
      selectedData,
      selectedItem,
      dynamicLabel,
      dynamicValue,
      selectedCategory,
      firstKey,
      files,
      sheets,
      transInfo,
      currentTab,
      viewFile,
      onConfirm,
      handleFile,
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
