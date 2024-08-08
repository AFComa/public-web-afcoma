<template>
  <div class="q-pt-xs">
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-checkbox
            v-if="props.col.field !== 'module'"
            v-model="props.row[props.col.field]"
            @click="getDataGrid()"
            :disable="actionBotonGrid === 'view'"
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
import { useRoute } from 'vue-router';
import {
  ListActionUser,
  ListPermision,
} from '../../../utils/users/usersColums';
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
    const rows = ref<ColumCreateUserI[]>(ListPermision());
    const route = useRoute();
    const columns = ref<ColumI[]>();
    const actionBotonGrid = ref();
    const {
      setPermissionUser,
      setPermissionSysad,
      setPermissionMandat,
      isTablePermission,
    } = useAuth();

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

    onMounted(async () => {
      await loadColums();
      actionBotonGrid.value = localStorage.getItem('actionuser');
      if (route.params.id) {
        if (props.section == 1) {
          rows.value = await isTablePermission.value.configUser
            .usersPermissions;
          setPermissionUser(rows.value);
        } else if (props.section == 2) {
          rows.value = await isTablePermission.value.configUser
            .sysadocPermission;
          setPermissionSysad(rows.value);
        } else {
          rows.value = await isTablePermission.value.configUser
            .mandatosPermissions;
          setPermissionMandat(rows.value);
        }
      } else {
        rows.value = await ref(await ListPermision()).value;
      }
    });

    return {
      rows,
      columns,
      loadColums,
      onMounted,
      actionBotonGrid,
      getDataGrid,
    };
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
