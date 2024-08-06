<template>
  <div class="q-pt-xs">
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-checkbox
            v-if="props.col.field !== 'module'"
            v-model="props.row[props.col.field]"
            @click="getDataGrid()"
          />
          <span v-else>{{ props.row.module }}</span>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { QTable, QTd, QCheckbox } from 'quasar';

import { ListActionUser } from '../../../utils/users/usersColums';
import type {
  ColumCreateUserI,
  ColumI,
} from '../../../interfaces/components/Grid.interfaces';
import { useAuth } from 'src/composables/userAuth';

export default defineComponent({
  components: {
    QTable,
    QTd,
    QCheckbox,
  },
  props: {
    section: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const rows = ref<ColumCreateUserI[]>([
      {
        id: 1,
        module: 'Administración',
        create: false,
        edit: false,
        delete: false,
        view: false,
        download: false,
        opera: false,
      },
    ]);

    const columns = ref<ColumI[]>();
    const { setPermissionUser, setPermissionSysad, setPermissionMandat } =
      useAuth();

    const loadColums = () => {
      columns.value = ListActionUser();
    };

    const getDataGrid = () => {
      if (props.section == 1) {
        setPermissionUser(rows.value);
      } else if (props.section == 2) {
        setPermissionSysad(rows.value);
      } else {
        setPermissionMandat(rows.value);
      }
    };

    onMounted(() => {
      loadColums();
    });

    return {
      rows,
      columns,
      loadColums,
      onMounted,
      getDataGrid,
    };
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
