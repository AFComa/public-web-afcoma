<template>
  <div class="q-mb-xl">
    <div class="row">
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
      <div class="col-xs-6 col-sm-6 col-md-7" style="text-align: end">
        <p style="font-size: 25px; font-weight: 900px; color: #f5b335">
          <strong style="color: #244b5a">Proyecto:</strong> {{ nameProyect }}
        </p>
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
            icon="assignment_turned_in"
            color="green"
            @click="editRow(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <div class="q-pt-md q-gutter-sm">
      <q-btn
        color="primary"
        no-caps
        unelevated
        @click="ReportIncTotalDowload"
        rounded
        label="Descargar reporte del proyecto"
      />

      <q-btn
        color="secondary"
        no-caps
        unelevated
        rounded
        label="Descargar reporte de incidencias"
        @click="ReportIncDowload"
      />
    </div>

    <LoadingComponentBasic v-if="loading" />
  </div>
</template>

<script src="./GridComponent.ts" lang="ts"></script>
