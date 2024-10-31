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
          <q-select label="Seleccione el mandato" dense outlined rounded />
        </div>
      </div>
      <div class="justify-center q-col-gutter-sm row">
        <div class="col-xs-12 col-sm-6 col-md-5 col-lg-3 q-pt-lg">
          <q-uploader label="Favor de cargar el archivo" accept=".xlsx, .xls" />
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
      </div>
    </q-form>
    <LoadingOver
      v-if="loading"
      :messageOne="'Espere un momento estamos validando la información...'"
      :messageTwon="
        actionBoton === 'edit'
          ? 'La cuenta se esta actualizando, favor de esperar un momento..'
          : 'La cuenta esta en proceso de validación, para continuar se le enviará una liga de acceso a su correo'
      "
    />
  </div>
</template>
<script src="./ConfigRelationPage.ts"></script>
<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
