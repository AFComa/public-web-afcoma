<template>
  <q-page class="home q-px-lg content-center">
    <div class="row justify-center">
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-sm col-xs-12 col-sm-7 col-md-7 q-pt-xl"
      >
        <div class="row">
          <p>Iniciar sesión</p>
        </div>
        <q-input
          rounded
          outlined
          v-model="userForm.email"
          label="Correo electrónico"
          type="email"
          lazy-rules
          no-error-icon
          :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
            isValidEmail,
          ]"
        />

        <q-input
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="userForm.password"
          label="Contraseña"
          lazy-rules
          no-error-icon
          :rules="[
            (val: any) => (val && val.length > 0) || 'Este campo es obligatorio',
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

        <div class="row">
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
