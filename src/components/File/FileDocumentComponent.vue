<template>
  <q-form @submit="onSubmit" dense>
    <div class="row q-pt-md q-col-gutter-md justify-center">
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          label="Contrato Maestro"
          no-error-icon
          v-model="fileName1"
          @input="onFileChange('contratomaestro', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          v-model="fileName2"
          label="Factoraje"
          no-error-icon
          @input="onFileChange('factoraje', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          v-model="fileName3"
          label="Administración Maestra"
          no-error-icon
          @input="onFileChange('administracionmaestra', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          v-model="fileName4"
          label="DocumentoAnexo1"
          no-error-icon
          @input="onFileChange('DocumentoAnexo1', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          v-model="fileName5"
          label="DocumentoAnexo2"
          no-error-icon
          @input="onFileChange('DocumentoAnexo2', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-4">
        <q-file
          dense
          rounded
          outlined
          v-model="fileName6"
          label="DocumentoAnexo3"
          no-error-icon
          @input="onFileChange('DocumentoAnexo3', $event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emits = defineEmits(['upload']);

const fileName1 = ref(null);
const fileName2 = ref(null);
const fileName3 = ref(null);
const fileName4 = ref(null);
const fileName5 = ref(null);
const fileName6 = ref(null);

const onFileChange = (fieldName, event) => {
  localStorage.setItem('fileView', true);
  const data = {
    field: fieldName,
    file: event.target.files[0],
  };
  emits('upload', data);
};
</script>

<style scoped>
.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  width: 100px;
}
.file-item:hover {
  background-color: #f5f5f5;
}
</style>
