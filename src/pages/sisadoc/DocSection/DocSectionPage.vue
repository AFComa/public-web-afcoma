<template>
  <div class="sections q-pt-lg q-pa-md">
    <div class="justify-center row text-center">
      <div class="col-xs-12 col-sm-11 col-md-11">
        <BreadCrumb :routes="breadcrumbRoutes" />
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <router-link to="/dashboard/listar-proyectos">
          <q-img src="../../../assets/img/Files.png" width="20%" />
        </router-link>
        <p>Proyectos</p>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-6">
        <router-link to="/dashboard/config">
          <q-img src="../../../assets/img/Report.png" width="20%" />
        </router-link>
        <p>Configuración</p>
      </div>
    </div>
    <LoadingOverBasic v-if="loading" />
  </div>
</template>
<style scoped src="./DocSections.scss"></style>
<script src="./DocSectionPage.ts" lang="ts"></script>
