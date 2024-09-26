<template>
  <div class="sections q-pa-xl">
    <div class="q-col-gutter-md row text-center">
      <div
        class="col-xs-6 col-sm-6 col-md-4"
        v-if="
          user.create ||
          user.edit ||
          user.delete ||
          user.view ||
          user.download ||
          user.opera ||
          user.block
        "
      >
        <router-link to="dashboard/listar-usuarios">
          <q-img src="../../assets/img/Users.png" width="20%" />
          <p>Usuarios</p>
        </router-link>
      </div>
      <div
        class="col-xs-6 col-sm-6 col-md-4"
        v-if="
          sisadoc.create ||
          sisadoc.edit ||
          sisadoc.delete ||
          sisadoc.view ||
          sisadoc.download ||
          sisadoc.opera ||
          sisadoc.block
        "
      >
        <router-link to="dashboard/view-doc">
          <q-img src="../../assets/img/logo/logo-siadoc.png" width="13%" />
          <p>Sys@Doc</p>
        </router-link>
      </div>
      <div
        class="col-xs-6 col-sm-6 col-md-4"
        v-if="
          mandatos.create ||
          mandatos.edit ||
          mandatos.delete ||
          mandatos.view ||
          mandatos.download ||
          mandatos.opera ||
          mandatos.block
        "
      >
        <router-link to="dashboard/listar-mandatos">
          <q-img src="../../assets/img/manda.png" width="20%" />
          <p>Mandatos</p>
        </router-link>
      </div>
      <!-- <div class="col-xs-6 col-sm-6 col-md-4">
        <router-link to="dashboard/listar-mandatos">
          <q-img src="../../assets/img/cartera.svg" width="20%" />
          <p>Cartera</p>
        </router-link>
      </div> -->
    </div>
    <LoadingOverBasic v-if="loading" />
  </div>
</template>
<style scoped src="./Sections.scss"></style>
<script src="./SectionPage.ts" lang="ts"></script>
