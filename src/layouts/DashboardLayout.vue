<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row" style="background-color: #244b5a; padding: 12px">
      <div
        class="content-center col-xs-12 col-sm-12 col-md-6"
        style="display: flex; align-items: center"
      >
        <q-img :src="url" style="width: 140px" />

        <q-avatar class="q-ma-md" color="white" text-color="#244b5a"
          >L</q-avatar
        >
        <p>Luis Hernandez</p>
      </div>
      <div class="content-center col-xs-12 col-sm-12 col-md-5">
        <div class="text-right">SALIR</div>
      </div>
      <!-- <div class="col-xs-12 col-sm-12 col-md-7">
          <q-page-container>
            <router-view />
          </q-page-container>
        </div> -->
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import imgLogo from '../assets/img/afcoma_blanco.webp';

defineOptions({
  name: 'DashboardLayout',
});

let url = imgLogo;
</script>
