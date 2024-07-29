<script>
import { useQuasar, QSpinnerGears } from 'quasar';
import { onBeforeUnmount, onMounted } from 'vue';

export default {
  props: {
    messageOne: {
      type: String,
      default: '',
    },
    messageTwon: {
      type: String,
      default: '',
    },
  },

  setup(props) {
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
        message: props.messageOne,
      });

      timer = setTimeout(() => {
        $q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'red',
          messageColor: '#f9f9f9',
          backgroundColor: '#244b5a;',
          message: props.messageTwon,
        });
      }, 4000);
    };

    onMounted(() => {
      console.log('props: ', props);
      showLoading();
    });

    return {
      showLoading,
      props,
    };
  },
};
</script>
