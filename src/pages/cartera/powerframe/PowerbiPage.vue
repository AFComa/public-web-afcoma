<template>
  <div class="q-pt-lg q-pa-md">
    <div class="justify-center row">
      <div class="col-xs-12 col-sm-11 col-md-11">
        <BreadCrumb :routes="breadcrumbRoutes" />
        <div class="col-xs-12 col-sm-11 col-md-11">
          <div class="iframe-viewer q-pa-md">
            <div class="iframe-container" v-if="iframeUrl">
              <iframe
                :src="iframeUrl"
                frameborder="0"
                allowfullscreen
                class="responsive-iframe"
              ></iframe>
            </div>
            <div v-else class="loading-message">
              <q-spinner color="primary" size="50px" />
              <p>Cargando reporte...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-pa-md">
      <q-btn
        no-caps
        unelevated
        size="lg"
        rounded
        label="Continuar"
        @click="savePower"
        class="custom-button-se"
      />
      <DialogLinkComponent></DialogLinkComponent>
    </div>
  </div>
  <!-- <div class="q-mb-xl">
    <div class="justify-center row">
      <div class="col-xs-6 col-sm-6 col-md-5">
        <q-input
          v-model="search"
          placeholder="Búsqueda"
          outlined
          dense
          debounce="300"
          class="q-mb-md"
        >
        </q-input>
      </div>
    </div>
  </div> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import BreadCrumb from '../../../components/breadcrumb/integretView.vue';

import { carteraAuth } from 'src/composables/carteraAuth';
import DialogLinkComponent from '../../../components/Dialog/DialogDowloadFilesComponent.vue';

export default {
  name: 'IframeViewer',
  components: {
    BreadCrumb,
    DialogLinkComponent,
  },
  setup() {
    const { getLinkPowerBi } = carteraAuth();
    const iframeUrl = ref(null);
    const $q = useQuasar();
    const router = useRouter();
    const breadcrumbRoutes = ref([
      { label: 'Listar Cartera', path: '/dashboard/listar-cartera' },
      {
        label: 'Carga Cartera',
        path: '/dashboard/configuration-carga',
      },
      {
        label: 'Power By',
        path: '/dashboard/reporte-powerby',
      },
    ]);

    const fetchIframeUrl = async () => {
      // Lógica para consumir el servicio y obtener la URL del iframe
      const response = await getLinkPowerBi(localStorage.getItem('idmandato'));

      if (response.ok && response.resultado.linkpbi !== '') {
        iframeUrl.value = response.resultado.linkpbi;
        $q.notify({
          type: 'positive',
          message: 'El link se cargo correctamente.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: 'El mandato no cuenta con una liga de power by asignada',
        });
        router.push('/dashboard/configuration-carga');
      }
    };

    const savePower = () => {
      router.push('/dashboard/listar-cartera');
    };

    onMounted(fetchIframeUrl);

    return {
      iframeUrl,
      fetchIframeUrl,
      breadcrumbRoutes,
      savePower,
    };
  },
};
</script>

<style lang="scss" scoped>
.iframe-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;

  .iframe-container {
    width: 95%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    .responsive-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .loading-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    p {
      margin-top: 1rem;
      font-size: 1.2rem;
      color: #666;
    }
  }
}
</style>
