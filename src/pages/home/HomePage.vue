<template>
  <q-page class="home q-px-lg content-center">
    <div class="row justify-center">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-sm col-xs-12 col-sm-7 col-md-7 q-pt-md"
      >
        <div class="row">
          <p>Iniciar sesión</p>
        </div>
        <q-input
          rounded
          outlined
          v-model="userForm.usuario"
          label="Correo electrónico"
          lazy-rules
          no-error-icon
          :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio'
          ]"
        />

        <q-input
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="userForm.password"
          maxlength="8"
          label="Contraseña"
          lazy-rules
          no-error-icon
          :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',isPassword
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="row q-pt-sm">
          <q-btn
            class="custom-button"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Ingresar"
            type="submit"
          />
        </div>
      </q-form>
    </div>
    <LoadingOverBasic v-if="loading" />
  </q-page>
</template>
<script src="./HomePage.ts" lang="ts"></script>
<style scoped src="./HomePage.scss"></style>
