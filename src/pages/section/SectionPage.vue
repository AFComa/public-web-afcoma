<template>
  <div class="sections q-pa-xl">
    <div class="q-col-gutter-md row text-center">
      <div class="col-xs-6 col-sm-6 col-md-4">
        <router-link to="dashboard/listar-usuarios">
          <q-img src="../../assets/img/Users.png" width="20%" />
        </router-link>
        <p>Usuarios</p>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-4">
        <router-link to="dashboard/view-doc">
          <q-img src="../../assets/img/logo/logo-siadoc.png" width="13%" />
        </router-link>
        <p>Sys@Doc</p>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-4">
        <router-link to="dashboard/listar-mandatos">
          <q-img src="../../assets/img/manda.png" width="20%" />
        </router-link>
        <p>Mandatos</p>
      </div>
    </div>
    <LoadingOverBasic v-if="loading" />
  </div>
</template>
<style scoped src="./Sections.scss"></style>
<script src="./SectionPage.ts" lang="ts"></script>
