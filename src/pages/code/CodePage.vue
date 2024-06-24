<template>
  <q-page class="code q-pa-xl content-center">
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-7 col-md-10">
        <p>
          Estimado cliente:
          <br /><br />
          Recibirás una notificación al correo electrónico registrado la cual
          contiene un código de 6 dígitos, el cuál debes ingresar en el
          siguiente campo para completar tu proceso de autenticación, este
          código es de uso personal y vence 10 minutos después de haber sido
          enviado.
        </p>
      </div>
    </div>
    <div class="row justify-center">
      <q-form @submit="onSubmit" class="col-xs-12 col-sm-7 col-md-10">
        <div class="container-code_access">
          <q-input
            v-model="userForm.text1"
            input-class="text-center"
            maxlength="1"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
          <q-input
            v-model="userForm.text2"
            input-class="text-center"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
          <q-input
            v-model="userForm.text3"
            input-class="text-center"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
          <q-input
            v-model="userForm.text4"
            input-class="text-center"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
          <q-input
            v-model="userForm.text5"
            input-class="text-center"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
          <q-input
            v-model="userForm.text6"
            input-class="text-center"
            :rules="[(val) => val && val.length > 0]"
          />&nbsp;&nbsp;
        </div>
        <p>
          Si el código no llegó al correo solicitado:
          <b>prueba@afcoma.com</b> o desea generar un nuevo código presione
          <a href="/?return=true">aquí</a>. <br /><br />
        </p>
        <br /><br />
        <div class="row justify-center">
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
      </q-form>
    </div>
  </q-page>
</template>
<script src="./CodePage.ts" lang="ts"></script>
<style scoped src="./CodePage.scss"></style>
