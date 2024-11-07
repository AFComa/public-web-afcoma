<template>
  <div class="q-pt-lg q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" dense>
      <div class="justify-center q-col-gutter-md row">
        <div class="col-xs-12 col-sm-12 col-md-11">
          <BreadCrumb :routes="breadcrumbRoutes" />
        </div>
      </div>

      <div class="justify-center q-col-gutter-sm row">
        <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
          <q-input
            dense
            rounded
            outlined
            v-model="nameCatalogo"
            label="Nombre del campo nuevo"
            @keypress="onlyAlphabetic"
            lazy-rules
            no-error-icon
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-11 text-center">
          <q-btn
            label="Agregar Campo"
            icon="add"
            color="primary"
            no-caps
            @click="addCatalogo"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 q-pt-md">
          <q-select
            v-if="!selectItem.label"
            label="Seleccione el elemento"
            dense
            outlined
            v-model="selectItem"
            rounded
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @blur="getInformation()"
          />

          <q-input
            v-if="selectItem.label"
            outlined
            rounded
            bottom-slots
            v-model="selectItem.label"
            :label="selectItem.label"
            dense
          >
            <template v-slot:append>
              <q-icon
                name="close"
                @click="selectItem = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 q-gutter-sm text-center">
          <q-btn
            label="Eliminar Campo"
            icon="delete"
            color="primary"
            no-caps
            @click="deleteOpt"
          />
          <q-btn
            label="Editar Campo"
            icon="edit"
            color="primary"
            no-caps
            @click="updateOpt"
          />
        </div>
        <div class="col-xs-12 col-md-12 col-lg-12 q-pt-lg text-center">
          <span>
            Descargar Ejemplo
            <a @click="dowloadPro" style="color: blue; cursor: pointer">
              <strong>Catálogo general</strong>
            </a>
          </span>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-11 q-pt-lg text-center">
          <q-btn
            class="custom-button"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Continuar"
            type="submit"
          />
        </div>

        <!-- </div> -->
      </div>
    </q-form>
    <DialogComponent
      v-if="warningDialog"
      :title="'¡Atención!'"
      :message="MessageDialog"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <LoadingComponentBasic v-if="loading" />
  </div>
</template>
<script src="./ConfigCarteraPage.ts"></script>
<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
