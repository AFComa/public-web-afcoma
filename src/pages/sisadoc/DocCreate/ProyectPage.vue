<template>
  <div class="q-pt-lg q-pa-md">
    <q-form @submit="onSubmit" dense>
      <div class="justify-center q-col-gutter-md row">
        <div class="col-xs-11 col-sm-11 col-md-11">
          <BreadCrumb :routes="breadcrumbRoutes" />
        </div>
      </div>

      <div class="justify-center q-col-gutter-sm row">
        <!-- <div class="col-xs-12 col-sm-6 col-md-12"> -->
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            dense
            rounded
            outlined
            label="Identificador del Proyecto*"
            lazy-rules
            no-error-icon
            v-model="pryectForm.identificador"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            rounded
            dense
            outlined
            label="Originador*"
            lazy-rules
            no-error-icon
            v-model="pryectForm.originador"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            rounded
            dense
            outlined
            label="Fondeador*"
            lazy-rules
            v-model="pryectForm.fondeador"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
            isValidEmail,
          ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-2">
          <q-input
            dense
            rounded
            outlined
            label="Institución Bancaria*"
            lazy-rules
            maxlength="10"
            v-model="pryectForm.bancaria"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            dense
            rounded
            outlined
            label="Administrador Primario*"
            lazy-rules
            no-error-icon
            v-model="pryectForm.primario"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            rounded
            dense
            outlined
            label="Administrador Maestro*"
            lazy-rules
            no-error-icon
            v-model="pryectForm.maestro"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            rounded
            dense
            outlined
            label="Despacho Jurídico"
            lazy-rules
            v-model="pryectForm.juridico"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
            isValidEmail,
          ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-2">
          <q-input
            dense
            rounded
            outlined
            label="Representante Común"
            lazy-rules
            maxlength="10"
            v-model="pryectForm.comun"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            rounded
            dense
            outlined
            label="Calificadora*"
            lazy-rules
            v-model="pryectForm.calificadora"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
            isValidEmail,
          ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-3">
          <q-input
            dense
            rounded
            outlined
            label="Despachos Auditores*"
            lazy-rules
            maxlength="10"
            v-model="pryectForm.auditores"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-11 col-sm-6 col-md-5"></div>
        <!-- </div> -->
      </div>
      <div class="justify-center q-pt-lg row">
        <div class="col-xs-11 col-sm-12 col-md-12 col-lg-10">
          <q-btn
            class="custom-button-se"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Contacto"
            @click="showProyect"
          />
          &nbsp;
          <q-btn
            class="custom-button-se"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Contratos del proyectos"
          />
        </div>
        <div class="col-xs-11 col-sm-12 col-md-12 col-lg-1">
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
          ? 'El proyecto se esta actualizando, favor de esperar un momento..'
          : 'El proyecto se esta creando..'
      "
    />
    <DialogProyectComponent
      v-if="dialogVisible"
      :title="'Carga de contacto y URL de notificación'"
      @select="handleSelect"
      @cancel="onCancel"
    />
  </div>
</template>
<script src="./ProyectPage.ts" lang="ts"></script>
<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
