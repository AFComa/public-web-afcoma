<template>
  <q-page class="sections q-pa-xl">
    <div class="q-col-gutter-md row text-center">
      <div class="col-xs-6 col-sm-6 col-md-4">
        <router-link to="dashboard/usuarios">
          <q-img src="../../assets/img/usuarios.svg" width="40%" />
        </router-link>
        <p>Usuarios</p>
      </div>

      <div class="col-xs-6 col-sm-6 col-md-4">
        <q-img src="../../assets/img/sysadoc.svg" width="40%" />
        <p>Sys@Doc</p>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-4">
        <q-img src="../../assets/img/mandatos.svg" width="40%" />
        <p>Mandatos</p>
      </div>
    </div>
  </q-page>
</template>
<style scoped src="./Sections.scss"></style>
