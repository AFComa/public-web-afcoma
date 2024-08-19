<template>
  <div class="row q-pt-md justify-center">
    <div class="col-lg-8">
      <q-uploader
        v-model="files"
        label="Favor de cargar el contrato"
        multiple
        accept=".pdf"
        @added="handleFileUpload"
        :disable="files.length > 0"
      />
    </div>

    <div class="col-lg-4 file-list">
      <div
        v-for="(file, index) in displayedFiles"
        :key="index"
        class="file-item"
        @click="openFile(file)"
      >
        <q-icon :name="file.icon" size="lg" />
        <div class="adaptable-text">{{ file.name }}</div>
      </div>
    </div>

    <q-dialog v-model="dialog" full-width persistent>
      <q-card>
        <q-card-section>
          <div v-if="currentFile.type === 'pdf'">
            <iframe
              :src="currentFile.content"
              width="100%"
              height="600px"
            ></iframe>
          </div>
          <div
            v-else-if="currentFile.type === 'word'"
            v-html="currentFile.content"
          ></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            no-caps
            size="lg"
            class="custom-button"
            rounded
            label="Cerrar"
            @click="dialog = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {
  QBtn,
  QUploader,
  QIcon,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
} from 'quasar';

const files = ref([]);
const filesAdd = ref([]);
const displayedFiles = ref([]);
const dialog = ref(false);
const currentFile = ref({});

const handleFileUpload = async (uploadedFiles) => {
  filesAdd.value = uploadedFiles;
  for (const file of uploadedFiles) {
    const fileType = file.type;
    const fileName = file.name;

    if (fileType === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = function (event) {
        displayedFiles.value.push({
          type: 'pdf',
          content: event.target.result,
          name: fileName,
          icon: 'picture_as_pdf',
        });
      };
      reader.readAsDataURL(file);
    }
  }
  uploadFiles();
};

const uploadFiles = async () => {
  const formData = new FormData();
  filesAdd.value.forEach((file) => {
    formData.append('files', file);
  });
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      'https://apolo.afcoma.com.mx/v1/mandato/newFiles',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Archivos subidos con éxito:', response.data);
  } catch (error) {
    console.error('Error al subir archivos:', error);
  }
};

const openFile = (file) => {
  currentFile.value = file;
  dialog.value = true;
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
