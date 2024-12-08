<template>
  <div v-if="viewFiles" class="fixed-bottom-right">
    <!-- Botón flotante para abrir el modal de archivos -->
    <q-fab
      v-if="!loadingFiles"
      color="primary"
      icon="insert_drive_file"
      @click="openDialog"
      class="fixed-bottom-right"
    />

    <!-- Spinner mientras se está cargando -->
    <q-spinner v-if="loadingFiles" size="50px" color="primary" />

    <!-- Modal para mostrar enlaces de archivos -->
    <q-dialog v-model="dialog" persistent class="modal-general">
      <q-card class="q-pa-md tam-moda" style="width: 800px; max-width: 90vw">
        <q-card-section class="modal-content-sesion">
          <p>Archivos Disponibles</p>
          <q-list>
            <q-item
              v-for="(file, index) in links"
              :key="index"
              clickable
              @click="openLink(file.link)"
            >
              <q-item-section avatar>
                <q-icon name="insert_drive_file" />
              </q-item-section>
              <q-item-section>
                {{ file.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Cerrar"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped src="./DialogComponent.scss"></style>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';
import { carteraAuth } from 'src/composables/carteraAuth';

const route = useRoute();

const { CheckFiles } = sysadocAuth();
const { getReportMandatos } = mandatosAuth();
const { getReport } = carteraAuth();
const viewFiles = ref(true);
const dialog = ref(false);
const links = ref([]);
const loadingFiles = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const openLink = (url) => {
  window.open(url, '_blank');
};

onMounted(async () => {
  loadingFiles.value = true;
  if (route.params.name) {
    const response = await CheckFiles({
      proyecto: route.params.name,
      id: route.params.id,
    });
    if (!response.ok) {
      links.value = response.resultado;
    }
  } else if (route.name === 'power') {
    loadingFiles.value = false;
    const result = await getReport(localStorage.getItem('idmandato'));
    if (result.ok) {
      links.value = result.resultado.result;
    }
  } else {
    const result = await getReportMandatos(localStorage.getItem('mandatoName'));
    if (!result.ok) {
      links.value = result.resultado;
    }
  }
  loadingFiles.value = false;
});
</script>

<style scoped>
.fixed-bottom-right {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
