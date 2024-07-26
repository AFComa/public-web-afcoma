<script>
import { useQuasar } from 'quasar';
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
      // hiding in 2s
      $q.loading.show();
      timer = setTimeout(() => {
        $q.loading.show({
          spinnerColor: 'green',
        });
      }, 2000);
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
