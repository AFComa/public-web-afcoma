<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-3">
        <q-uploader
          v-model="files"
          label="Favor de cargar el archivo"
          accept=".xlsx, .xls"
          @added="handleFile"
          :disable="files.length > 0"
        />
      </div>
    </div>
    <q-select
      v-model="selectedCategory"
      :options="transInfo"
      label="Seleccione una categoría"
      option-label="name"
      option-value="name"
      filled
      outlined
      @update:model-value="handleSelection"
    />

    <div v-if="selectedData">
      <q-select
        v-model="selectedItem"
        :options="selectedData.data"
        label="Seleccione un elemento"
        :option-label="dynamicLabel"
        :option-value="dynamicValue"
        filled
        outlined
      />

      <div v-if="selectedItem" class="q-mt-md">
        <q-card v-for="(value, key) in selectedItem" :key="key" class="q-mb-md">
          <q-card-section>
            <template v-if="isBoolean(value)">
              <q-checkbox v-model="selectedItem[key]" :label="key" />
            </template>
            <template v-else>
              <q-input
                v-model="selectedItem[key]"
                :label="key"
                filled
                outlined
              />
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';
export default {
  name: 'AutocompleteForm',
  setup() {
    const files = ref([]);
    const sheets = ref([]);
    const transInfo = ref([]);
    const ExtraInfoData = ref([]);
    const currentTab = ref(0);

    const selectedCategory = ref(null);

    const selectedData = ref(null);
    const selectedItem = ref(null);

    const handleFile = async (fileList) => {
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

        ExtraInfoData.value = sheets.value.map((sheet) =>
          sheet.data.slice(1).map((row) => {
            return sheet.data[0].reduce((acc, field, index) => {
              acc[field] = row[index];
              return acc;
            }, {});
          })
        );

        transInfo.value = sheets.value.map((sheet) => ({
          name: sheet.name.trim() !== 'Glosario_Opciones' ? sheet.name : null,
          data: sheet.data.slice(1).map((row) => {
            return sheet.data[0].reduce((acc, field, index) => {
              acc[field] =
                row[index] === 'SI'
                  ? true
                  : row[index] === 'NO'
                  ? false
                  : row[index];
              return acc;
            }, {});
          }),
        }));
      };

      reader.readAsArrayBuffer(file);
    };

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

    const dynamicLabel = computed(() => firstKey.value);
    const dynamicValue = computed(() => firstKey.value);

    const isBoolean = (value) => {
      return value === true || value === false;
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
      ExtraInfoData,
      transInfo,
      currentTab,
      handleFile,
      handleSelection,
      isBoolean,
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
