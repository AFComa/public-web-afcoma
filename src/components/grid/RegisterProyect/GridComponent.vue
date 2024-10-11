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
      class="my-sticky-header-table"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[50, 100, 150, 200]"
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
            v-if="validuser.opera"
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
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="MessageDialog"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script src="./GridComponent.ts" lang="ts"></script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color:white

  thead tr th
    position: sticky
    z-index: 1

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
