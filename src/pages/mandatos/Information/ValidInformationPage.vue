<template>
  <div class="q-pt-lg q-pa-md">
    <div class="justify-center q-col-gutter-md row">
      <div class="col-xs-12 col-sm-10 col-md-11">
        <BreadCrumb :routes="breadcrumbRoutes" />
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
            <FileDocument @upload="handleValueExcel" />
          </q-step>

          <q-step :name="3" title="Creación del Mandato" icon="add_comment">
            Para finalizar con el registro favor de colocar el nombre del
            mandato.
            <div class="q-pt-md row">
              <div class="col-xs-12 col-sm-10 col-md-4">
                <q-input
                  dense
                  rounded
                  outlined
                  label="Nombre del mandato"
                  lazy-rules
                  v-model="name"
                  no-error-icon
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Este campo es obligatorio',
                  ]"
                />
              </div>
            </div>
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
                  step === 3
                    ? saveInfo()
                    : loadingResult(step)
                    ? $refs.stepper.next()
                    : loadingResult(step)
                    ? $refs.stepper.next()
                    : notifyM()
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import FileComponentVue from '../../../components/File/FileComponent.vue';
import FileDocument from '../../../components/File/FileDocumentComponent.vue';
import LoadingComponentBasic from '../../../components/Loading/LoadingBasicComponent.vue';
import DialogComponent from '../../../components/Dialog/DialogComponent.vue';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';
import { mandatosAuth } from 'src/composables/mandatosAuth';

export default {
  components: {
    FileComponentVue,
    LoadingComponentBasic,
    FileDocument,
    DialogComponent,
    BreadCrumb,
  },
  setup() {
    const { saveMandatos, setMandatosValid, isValidMandatos } = mandatosAuth();
    const $q = useQuasar();
    const loading = ref(false);
    const warningDialog = ref(false);
    const routers = useRouter();
    const FilesContent = ref([]);
    const file1 = ref(null);
    const file2 = ref(null);
    const file3 = ref(null);
    const file4 = ref(null);
    const file5 = ref(null);
    const file6 = ref(null);
    const name = ref('');
    const breadcrumbRoutes = ref([
      { label: 'Listar Mandatos', path: '/dashboard/listar-mandatos' },
      { label: 'Creación Mandatos', path: '/dashboard/validar-information' },
    ]);

    setMandatosValid([]);

    const loadingResult = async (st) => {
      console.log('st: ', st);
      console.log('local: ', localStorage.getItem('fileView'));
      if (st === 1 && isValidMandatos.value.length > 0) {
        return true;
      } else if (st === 2 && localStorage.getItem('fileView') === 'true') {
        loading.value = true;
        const formData = new FormData();

        file1.value ? formData.append('contratomaestro', file1.value) : '';
        file2.value ? formData.append('factoraje', file2.value) : '';
        file3.value
          ? formData.append('administracionmaestra', file3.value)
          : '';
        file4.value ? formData.append('DocumentoAnexo1', file4.value) : '';
        file5.value ? formData.append('DocumentoAnexo2', file5.value) : '';
        file6.value ? formData.append('DocumentoAnexo3', file6.value) : '';

        const token = localStorage.getItem('token');
        try {
          const result = await axios.post(
            'https://apolo.afcoma.com.mx/v1/SA/onedrive/chargeFilesMandato',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                'x-api-key': 'cls[ty-5JDrkzE1HFN9v',
                identificador: 'ISSTEY',
              },
            }
          );
          if (result.data.error) {
            $q.notify({
              type: 'negative',
              message: result.data.mensaje,
            });
          }
        } catch (error) {
          console.error(error);
        }
        loading.value = false;
        return true;
      } else {
        return false;
      }
    };
    const saveInfo = () => {
      if (name.value) {
        warningDialog.value = true;
      } else {
        $q.notify({
          type: 'negative',
          message: 'Favor de colocar un nombre al mandato',
        });
      }
    };

    const handleValueExcel = (item) => {
      if (item.field === 'contratomaestro') {
        file1.value = item.file;
      } else if (item.field === 'factoraje') {
        file2.value = item.file;
      } else if (item.field === 'administracionmaestra') {
        file3.value = item.file;
      } else if (item.field === 'DocumentoAnexo1') {
        file4.value = item.file;
      } else if (item.field === 'DocumentoAnexo2') {
        file5.value = item.file;
      } else if (item.field === 'DocumentoAnexo3') {
        file6.value = item.file;
      }
      FilesContent.value.push(item);
    };

    const onConfirm = async () => {
      warningDialog.value = false;
      loading.value = true;
      const data = {
        idmandato: name.value,
        datosmandato: isValidMandatos.value,
      };
      const resolve = await saveMandatos(data);
      if (resolve.ok) {
        $q.notify({
          type: 'positive',
          message: 'El Mandato se ha creado correctamente.',
        });
        routers.push('/dashboard/listar-mandatos');
      } else {
        $q.notify({
          type: 'negative',
          message: resolve.message,
        });
      }
      loading.value = false;
    };

    function onCancel() {
      warningDialog.value = false;
    }

    const notifyM = () => {
      $q.notify({
        type: 'negative',
        message: 'Favor de cargar un archivo para continuar',
      });
    };

    return {
      step: ref(1),
      loading,
      name,
      notifyM,
      handleValueExcel,
      saveInfo,
      warningDialog,
      loadingResult,
      onConfirm,
      breadcrumbRoutes,
      onCancel,
    };
  },
};
</script>
