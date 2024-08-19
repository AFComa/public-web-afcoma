<template>
  <q-page class="sections q-pa-xl">
    <div class="q-col-gutter-md row text-center">
      <div class="col-xs-6 col-sm-6 col-md-6">
        <router-link to="dashboard/listar-usuarios">
          <q-img src="../../assets/img/Users.png" width="20%" />
        </router-link>
        <p>Usuarios</p>
      </div>

      <!-- <div class="col-xs-6 col-sm-6 col-md-4">
        <q-img src="../../assets/img/sysadoc.svg" width="30%" />
        <p>Sys@Doc</p>
      </div> -->
      <div class="col-xs-6 col-sm-6 col-md-6">
        <router-link to="dashboard/listar-mandatos">
          <q-img src="../../assets/img/mandatos.svg" width="20%" />
        </router-link>
        <p>Mandatos</p>
      </div>
    </div>
    <LoadingOverBasic v-if="loading" />
  </q-page>
</template>
<style scoped src="./Sections.scss"></style>
<script src="./SectionPage.ts" lang="ts"></script>
