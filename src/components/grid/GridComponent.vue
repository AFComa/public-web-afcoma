<template>
  <div class="q-px-lg">
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
      <div class="col-xs-6 col-sm-6 col-md-7 q-mb-md text-right">
        <q-btn
          class="custom-button"
          no-caps
          unelevated
          rounded
          size="lg"
          label="Crear usuario"
          @click="rouView"
        />
      </div>
    </div>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            color="blue"
            round
            dense
            icon="visibility"
            @click="viewRow(props.row)"
          />
          <q-btn
            flat
            round
            dense
            icon="edit"
            color="green"
            @click="editRow(props.row)"
          />
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            @click="deleteRow(props.row)"
          />
          <q-btn
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
    <q-dialog v-model="showConfirmDialog">
      <q-card class="q-pa-md">
        <q-card-section class="row items-center no-wrap">
          <q-avatar icon="warning" color="red" text-color="white" size="76px" />
          <div class="q-ml-md">
            <div class="text-h6">Atención</div>
            <div class="text-subtitle2">
              ¿Esta seguro que desea eliminar este registro?
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn no-caps flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            no-caps
            flat
            label="Confirmar"
            color="negative"
            @click="deleteRecord"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <LoadingComponentBasic v-if="loading" />
  </div>
</template>

<script src="./GridComponent.ts" lang="ts"></script>
