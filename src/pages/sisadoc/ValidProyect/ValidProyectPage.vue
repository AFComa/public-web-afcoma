<template>
  <div class="q-pt-lg q-pa-md">
    <div class="justify-center row">
      <div class="col-xs-11 col-sm-10 col-md-8">
        <BreadCrumb :routes="breadcrumbRoutes" />
      </div>
      <div class="col-xs-11 col-sm-10 col-md-3">
        <q-list>
          <q-item
            v-for="(item, index) in links"
            :key="index"
            clickable
            @click="openLink(item.link)"
          >
            <q-item-section avatar>
              <q-icon name="open_in_new" />
            </q-item-section>
            <q-item-section>
              {{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="row justify-center q-pa-md"
    >
      <div class="col-xs-11 col-sm-6 col-md-3">
        <p>Información por Campo</p>
        <q-input
          rounded
          v-model="item.value"
          :label="item.name"
          outlined
          dense
          :readonly="finalizar || item.value !== 'CAPTURAR'"
        />
      </div>
      <div class="col-xs-11 col-sm-1 col-md-1"></div>

      <div class="col-xs-11 col-sm-6 col-md-2">
        <p>¿La Información es Correcta?</p>
        <q-toggle
          v-model="item.is_valid"
          label="Si"
          dense
          :disable="finalizar"
        />
      </div>
      <div class="col-xs-11 col-sm-1 col-md-1"></div>
      <div class="col-xs-11 col-sm-6 col-md-4 q-gutter-sm">
        <p>Información a Registrar</p>
        <q-btn
          no-caps
          label="Incidencias"
          :color="item.incidencias === '' ? 'primary' : 'secondary'"
          @click="openIncidenciasDialog(item)"
          dense
        />
        <q-btn
          no-caps
          label="Información Adicional"
          :color="item.informacion_adicional === '' ? 'primary' : 'secondary'"
          @click="openInformacionDialog(item)"
          dense
        />
      </div>
    </div>
    <div class="row justify-center q-pa-md">
      <q-btn
        no-caps
        unelevated
        size="lg"
        rounded
        label="Guardar"
        @click="saveInformation"
        class="custom-button-se"
      />
    </div>
  </div>

  <q-dialog v-model="incidenciasDialog" persistent class="modal-general">
    <q-card class="q-pa-md tam-moda">
      <q-card-section class="modal-content-sesion">
        <p>Incidencias</p>
        <div class="row q-col-gutter-lg justify-center">
          <div class="col-12">
            <q-input
              v-model="selectedItem.incidencias"
              type="textarea"
              label="Incidencia existente"
              filled
              readonly
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="newIncidencia"
              type="textarea"
              label="Nueva incidencia"
              filled
              :readonly="finalizar"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Cancelar"
          v-close-popup
        />
        &nbsp;&nbsp;&nbsp;
        <q-btn
          v-if="!finalizar"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Guardar"
          @click="saveIncidencia"
          color="secondary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="informacionDialog" persistent class="modal-general">
    <q-card class="q-pa-md tam-moda">
      <q-card-section class="modal-content-sesion">
        <p>Información Adicional</p>
        <div class="row q-col-gutter-lg justify-center">
          <div class="col-12">
            <q-input
              v-model="selectedItem.informacion_adicional"
              type="textarea"
              label="Información adicional existente"
              filled
              readonly
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="newInformacion"
              type="textarea"
              label="Nueva información adicional"
              filled
              :readonly="finalizar"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Cancelar"
          v-close-popup
        />
        &nbsp;&nbsp;&nbsp;
        <q-btn
          v-if="!finalizar"
          no-caps
          unelevated
          size="lg"
          rounded
          label="Guardar"
          color="secondary"
          @click="saveInformacionAdicional"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <DialogComponent
    v-if="warningDialog"
    :title="'¡Atención!'"
    :message="MessageDialog"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>
<style scoped src="./valid.scss"></style>
<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import { sysadocAuth } from 'src/composables/sysadocAuth';
import DialogComponent from '../../../components/Dialog/DialogFinalizarComponent.vue';
components: BreadCrumb, DialogComponent;

const $q = useQuasar();
const breadcrumbRoutes = ref([
  { label: 'Sys@Doc', path: '/dashboard/view-doc' },
  { label: 'Listar Proyectos', path: '/dashboard/listar-proyectos' },
  {
    label: 'Validar Proyectos',
  },
]);
const links = ref([]);
const warningDialog = ref(false);
const MessageDialog = ref('');

const { ReportProyectID, CheckFiles, UpdateInformation } = sysadocAuth();
const route = useRoute();
const router = useRouter();
const items = ref([]);

const incidenciasDialog = ref(false);
const informacionDialog = ref(false);
const finalizar = ref(false);
const selectedItem = ref(null);
const newIncidencia = ref('');
const newInformacion = ref('');

const openIncidenciasDialog = (item) => {
  selectedItem.value = item;
  newIncidencia.value = '';
  incidenciasDialog.value = true;
};

const openInformacionDialog = (item) => {
  selectedItem.value = item;
  newInformacion.value = '';
  informacionDialog.value = true;
};

const saveIncidencia = () => {
  if (newIncidencia.value.trim()) {
    const timestamp = new Date().toUTCString();
    selectedItem.value.incidencias += ` [${timestamp}] Incidencia registrada: ${newIncidencia.value}`;
    incidenciasDialog.value = false;
  }
};

const saveInformacionAdicional = () => {
  if (newInformacion.value.trim()) {
    const timestamp = new Date().toUTCString();
    selectedItem.value.informacion_adicional += ` [${timestamp}] Comentario registrado: ${newInformacion.value}`;
    informacionDialog.value = false;
  }
};

const saveInformation = () => {
  if (!finalizar.value) {
    warningDialog.value = true;
    MessageDialog.value =
      'Al guardar los cambios solo se actualizará la información y podrás seguir con la revisión, si deseas finalizar registro no podrás actualizar los datos de la revisión nuevamente';
  } else {
    router.push({
      name: 'RegisterProyect',
      params: {
        id: route.params.cartera,
        cesion: route.params.cesion,
        name: route.params.cartera,
      },
    });
  }
};

function onCancel() {
  warningDialog.value = false;
}

const onConfirm = async (value) => {
  warningDialog.value = false;
  const data = {
    datos: items.value,
    finalizado: value,
    proyect: route.params.cartera,
    _id: route.params.uid,
  };
  const result = await UpdateInformation(data);
  if (!result.ok) {
    $q.notify({
      type: 'positive',
      message: result.resultado,
    });
    router.push({
      name: 'RegisterProyect',
      params: {
        id: route.params.cartera,
        cesion: route.params.cesion,
        name: route.params.cartera,
      },
    });
  } else {
    $q.notify({
      type: 'negative',
      message: result.resultado,
    });
  }
};

onMounted(async () => {
  const result = await ReportProyectID({
    db: route.params.cartera,
    id: route.params.id,
    _id: route.params.uid,
  });

  if (!result.ok) {
    finalizar.value = result.resultado.finalizado;
    items.value = result.resultado.result;
  }

  const response = await CheckFiles({
    proyecto: route.params.cartera,
    id: route.params.id,
  });

  if (!result.ok) {
    links.value = response.resultado;
  }
});

const openLink = (url) => {
  window.open(url, '_blank');
};
</script>
