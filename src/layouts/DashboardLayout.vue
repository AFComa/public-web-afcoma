<template>
  <q-layout view="lHh Lpr lFf">
    <navbar></navbar>
    <hero-section></hero-section>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import imgLogo from '../assets/img/afcoma_color.png';
import HeroSection from '../components/Hero/HeroSectionComponent.vue';
import Navbar from '../components/Navbar/NavbarComponent.vue';

defineOptions({
  name: 'DashboardLayout',
  components: {
    HeroSection,
    Navbar,
  },
});

// let url = imgLogo;
</script>

<style scoped src="./DashboardLayout.scss"></style>
