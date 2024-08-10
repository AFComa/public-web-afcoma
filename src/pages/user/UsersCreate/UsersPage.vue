<template>
  <div class="q-px-xl">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm q-pt-xl">
      <div class="justify-center q-col-gutter-md q-px-xl row">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            rounded
            outlined
            label="Nombre"
            @keypress="onlyAlphabetic"
            lazy-rules
            no-error-icon
            v-model="userForm.nombre"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            rounded
            outlined
            label="Apellidos"
            @keypress="onlyAlphabetic"
            lazy-rules
            no-error-icon
            v-model="userForm.apellido"
            :disable="actionBoton === 'view'"
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            rounded
            outlined
            label="Correo"
            lazy-rules
            v-model="userForm.email"
            :disable="actionBoton === 'view'"
            no-error-icon
            :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
            isValidEmail,
          ]"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-input
            rounded
            outlined
            label="Telefono"
            lazy-rules
            maxlength="10"
            v-model="userForm.phone"
            :disable="actionBoton === 'view'"
            @keypress="onlyNumeric"
            no-error-icon
            :rules="[
      (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
    ]"
          />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-12">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Usuarios"
            >
              <GridComponent :section="1"></GridComponent>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="receipt" label="Sys@doc">
              <GridComponent :section="2"></GridComponent>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="drafts" label="Mandatos">
              <GridComponent :section="3"></GridComponent>
            </q-expansion-item>
          </q-list>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-12 text-right">
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
<script src="./UsersPage.ts" lang="ts"></script>
<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
