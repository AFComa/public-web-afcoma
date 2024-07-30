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
    <div
      v-for="(sheet, sheetIndex) in transInfo"
      :key="sheetIndex"
      class="q-mb-md"
    >
      <q-select
        v-model="selectedFields[sheetIndex]"
        :options="sheet.fieldNames"
        label="Seleccione un campo"
        filled
        outlined
        @update:model-value="(field) => handleFieldSelection(sheetIndex, field)"
      />
    </div>
    <q-tabs v-model="currentTab" class="text-teal">
      <q-tab
        v-for="(sheet, index) in transInfo"
        :key="index"
        :name="index"
        :label="sheet.name"
        class="q-px-md"
      />
    </q-tabs>

    <q-tab-panels v-model="currentTab" animated>
      <q-tab-panel
        v-for="(sheet, sheetIndex) in transInfo"
        :key="sheetIndex"
        :name="sheetIndex"
      >
        <div
          v-for="(item, index) in sheet.data"
          :key="index"
          class="row q-mb-md"
        >
          <div
            v-for="(value, field) in item"
            :key="field"
            class="col-md-4 q-px-md q-mt-md q-gutter-md"
          >
            <q-input
              v-model="transInfo[sheetIndex].data[index][field]"
              :label="field"
              filled
              outlined
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelReader',
  setup() {
    const files = ref([]);
    const sheets = ref([]);
    const transInfo = ref([]);
    const ExtraInfoData = ref([]);
    const currentSheetData = ref([]);
    const currentTab = ref(0);

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

        // sheets.value.slice(1).map((row) => {
        //   return dataArray.value[0].reduce((acc, field, index) => {
        //     acc[field] = row[index];
        //     return acc;
        //   }, {});
        // });
        ExtraInfoData.value = sheets.value.map((sheet) =>
          sheet.data.slice(1).map((row) => {
            return sheet.data[0].reduce((acc, field, index) => {
              acc[field] = row[index];
              return acc;
            }, {});
          })
        );

        transInfo.value = sheets.value.map((sheet) => ({
          name: sheet.name,
          data: sheet.data.slice(1).map((row) => {
            return sheet.data[0].reduce((acc, field, index) => {
              acc[field] = row[index];
              return acc;
            }, {});
          }),
        }));

        console.log('transInfo: ', transInfo);
      };

      reader.readAsArrayBuffer(file);
    };

    const selectedFields = ref(new Array(transInfo.value.length).fill(null));
    const handleFieldSelection = (sheetIndex, field) => {
      selectedFields.value[sheetIndex] = field;
    };

    const showSheet = (index) => {
      console.log('formData: ', transInfo.value);
      currentSheetData.value = sheets.value[index].data;
    };

    return {
      files,
      sheets,
      ExtraInfoData,
      selectedFields,
      handleFieldSelection,
      transInfo,
      currentTab,
      currentSheetData,
      handleFile,
      showSheet,
    };
  },
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
