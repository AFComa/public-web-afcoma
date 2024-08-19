<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row home-das">
      <div
        class="content-center text-center col-xs-12 col-sm-12 col-md-5"
        style="background-color: #244b5a"
      >
        <q-img class="img-logo" :src="url" />
      </div>
      <div
        class="col-xs-12 col-sm-12 col-md-7"
        style="background-color: #f9f9f9"
      >
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>
<style scoped src="./DashboardLayout.scss"></style>
<script setup lang="ts">
import imgLogo from '../assets/img/logo/6.png';

defineOptions({
  name: 'MainLayout',
});

let url = imgLogo;
</script>
