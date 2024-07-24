import { defineComponent, computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { ListUsuario } from '../../utils/users/usersColums';
import type {
  ListUserI,
  ColumI,
} from '../../interfaces/components/Grid.interfaces';

export default defineComponent({
  name: 'GridComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const showConfirmDialog = ref(false);
    const $q = useQuasar();

    const search = ref('');
    const columns = ref<ColumI[]>([]);
    const rows = ref<ListUserI[]>([
      {
        id: 1,
        name: 'Pedro Fernandez',
        email: 'pedro@example.com',
        profile: 'Administrador',
      },
      {
        id: 2,
        name: 'Antonoio Lopez',
        email: 'antonio@example.com',
        profile: 'Operador',
      },
      {
        id: 3,
        name: 'José José',
        email: 'jose@example.com',
        profile: 'Analista',
      },
      {
        id: 4,
        name: 'Gabriel Delgado',
        email: 'gabriel@example.com',
        profile: 'Analista',
      },
    ]);

    const filteredRows = computed(() => {
      const searchLower = search.value.toLowerCase();
      return rows.value.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        );
      });
    });

    const rouView = () => {
      router.push('/dashboard/usuarios');
    };

    const loadColums = () => {
      console.log('route: ', route.query);

      columns.value = ListUsuario();
    };

    const viewRow = (row: ListUserI) => {
      router.push({ name: 'UsuariosId', params: { id: row.id } });
    };
    const editRow = (row: ListUserI) => {
      router.push({ name: 'UsuariosId', params: { id: row.id } });
    };
    const deleteRow = (row: ListUserI) => {
      console.log('Delete', row);
      showConfirmDialog.value = true;
    };

    const deleteRecord = () => {
      showConfirmDialog.value = false;
      $q.notify({
        type: 'positive',
        message: 'El registro se elimino correctamente',
      });
    };

    onMounted(() => {
      loadColums();
    });

    return {
      columns,
      rows,
      filteredRows,
      search,
      showConfirmDialog,
      loadColums,
      rouView,
      viewRow,
      editRow,
      deleteRow,
      deleteRecord,
    };
  },
});
