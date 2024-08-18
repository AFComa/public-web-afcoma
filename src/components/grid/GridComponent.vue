<template>
  <div class="q-mb-xl">
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
      <div
        class="col-xs-6 col-sm-6 col-md-7 q-mb-md text-right"
        v-if="!viewGrid"
      >
        <q-btn
          v-if="validuser.create"
          class="custom-button"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Crear usuario"
          @click="rouView"
        />
      </div>
      <div
        class="col-xs-6 col-sm-6 col-md-7 q-mb-md text-right"
        v-if="viewGrid"
      >
        <q-btn
          class="custom-button"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Acciones"
        >
          <q-menu transition-show="rotate" transition-hide="rotate">
            <q-list style="min-width: 100px">
              <q-item clickable @click="rouViewPage('1')">
                <q-item-section>Creación Mandatos</q-item-section>
              </q-item>
              <q-item clickable @click="rouViewPage('2')">
                <q-item-section>Asignación de Mandatos</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props" align="center">
          <q-btn
            flat
            :color="props.row.estatus === 'Activo' ? 'green' : 'red'"
            round
            dense
            :icon="props.row.estatus === 'Activo' ? 'check' : 'close'"
            @click="active(props.row)"
          >
            <q-tooltip
              :class="props.row.estatus === 'Activo' ? 'bg-green' : 'bg-red'"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              {{ props.row.estatus === 'Activo' ? 'Activo' : 'Inactivo' }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            v-if="validuser.view"
            color="blue"
            round
            dense
            icon="visibility"
            @click="viewRow(props.row)"
          />
          <q-btn
            v-if="validuser.edit"
            flat
            round
            dense
            icon="edit"
            color="green"
            @click="editRow(props.row)"
          />
          <q-btn
            v-if="!viewGrid"
            flat
            round
            dense
            icon="lock"
            color="purple"
            @click="blockUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <LoadingComponentBasic v-if="loading" />
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="MessageDialog"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <DialogAssingComponent
      v-if="dialogVisible"
      :title="'Asignación de Mandatos'"
      :options1="rows"
      :options2="rows"
      @select="handleSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script src="./GridComponent.ts" lang="ts"></script>
