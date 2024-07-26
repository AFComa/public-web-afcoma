<template>
  <div class="q-pt-xs">
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-checkbox
            v-if="props.col.field !== 'module'"
            v-model="props.row[props.col.field]"
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
import type { ColumI } from '../../../interfaces/components/Grid.interfaces';

export default defineComponent({
  components: {
    QTable,
    QTd,
    QCheckbox,
  },
  setup() {
    const rows = ref([
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
      // Añade más filas según sea necesario
    ]);

    const columns = ref<ColumI[]>();

    const loadColums = () => {
      columns.value = ListActionUser();
    };

    onMounted(() => {
      loadColums();
    });

    return {
      rows,
      columns,
      loadColums,
      onMounted,
    };
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
