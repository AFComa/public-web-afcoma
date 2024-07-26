<template>
  <q-page class="validation-code flex flex-center">
    <q-card class="card-content">
      <q-card-section>
        <div class="text-h5 text-center font-afcoma-medium">
          Validar tu Cuenta
        </div>
        <div class="q-mt-lg text-center">
          Ingresa el código de seguridad a 6 dígitos que hemos enviado al correo
          electrónico.
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-form @submit.prevent="onSubmit">
            <div
              class="q-px-lg q-gutter-sm col-xs-12 col-sm-12 col-md-12"
              style="display: flex"
            >
              <q-input
                v-for="(input, index) in securityCodeInputs"
                :key="index"
                v-model="securityCodeInputs[index]"
                type="text"
                maxlength="1"
                class="text-input-code"
                outlined
                lazy-rules
                no-error-icon
                :rules="[(val: any) => val && val.length > 0]"
                input-class="text-center"
                @keyup="focusNextInput(index)"
                @keyup.backspace="focusPreviousInput(index, $event)"
                :ref="(el: HTMLInputElement | null) => setInputRef(el, index)"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                class="q-mt-lg custom-button"
                type="submit"
                no-caps
                rounded
                size="lg"
                label="Continuar"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
    <LoadingOverBasic v-if="loading" />
  </q-page>
</template>
<script src="./ValidationPage.ts" lang="ts"></script>
<style scoped src="./ValidationPage.scss"></style>
