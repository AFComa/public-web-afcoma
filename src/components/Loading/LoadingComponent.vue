<script>
import { useQuasar, QSpinnerGears } from 'quasar';
import { onBeforeUnmount, onMounted } from 'vue';

export default {
  setup() {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const showLoading = () => {
      $q.loading.show({
        message: 'Espere un momento estamos validando los datos...',
      });

      timer = setTimeout(() => {
        $q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'red',
          messageColor: '#f9f9f9',
          backgroundColor: '#244b5a;',
          message:
            'El usuario se esta creando, el sistema lo direccionará al login..',
        });
      }, 4000);
    };

    onMounted(() => {
      showLoading();
    });

    return {
      showLoading,
    };
  },
};
</script>
