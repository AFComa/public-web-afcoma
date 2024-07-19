<template>
  <q-page class="q-px-lg">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm q-pt-xl">
      <div class="justify-center q-col-gutter-md row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input rounded outlined label="Nombre" lazy-rules no-error-icon />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-5">
          <q-input
            rounded
            outlined
            label="Apellidos"
            lazy-rules
            no-error-icon
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input rounded outlined label="Correo" lazy-rules no-error-icon />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-5">
          <q-select
            rounded
            outlined
            v-model="model"
            :options="options"
            label="Perfil"
          />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-9">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Usuarios"
            >
              <GridComponent></GridComponent>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="receipt" label="Sys@doc">
              <GridComponent></GridComponent>
            </q-expansion-item>

            <q-expansion-item expand-separator icon="drafts" label="Mandatos">
              <GridComponent></GridComponent>
            </q-expansion-item>
          </q-list>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-9 text-right">
          <q-btn
            class="custom-button"
            no-caps
            unelevated
            rounded
            size="lg"
            label="Guardar"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import GridComponent from '../../components/grid/GridComponent.vue';
export default {
  components: {
    GridComponent,
  },
  data() {
    return {
      model: ref(null),
      user: {
        nombre: '',
        apellidos: '',
        perfiles: '',
        modulos: '',
        correo: '',
        modulo1: '',
        modulo2: '',
        modulo3: '',
        modulo4: '',
        modulo5: '',
      },
      options: ['Administrador', 'Supervisor', 'Operador', 'Analista'],
    };
  },
  methods: {
    onSubmit() {
      // Lógica de envío de formulario
      console.log('Datos del formulario:', this.user);
    },
    onReset() {
      this.user = {
        nombre: '',
        apellidos: '',
        perfiles: '',
        modulos: '',
        correo: '',
        modulo1: '',
        modulo2: '',
        modulo3: '',
        modulo4: '',
        modulo5: '',
      };
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
