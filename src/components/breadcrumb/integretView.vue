<template>
  <q-breadcrumbs class="q-mb-md">
    <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
    <q-breadcrumbs-el
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :label="crumb.label"
      :to="crumb.to"
      :exact="crumb.exact"
      tag="router-link"
    />
  </q-breadcrumbs>
  <!-- <q-breadcrumbs separator="arrow_forward" class="q-mb-md">
    <q-breadcrumbs-el
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :label="crumb.label"
      :to="crumb.to"
      :exact="crumb.exact"
      tag="router-link"
    />
  </q-breadcrumbs> -->
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
});

const breadcrumbs = computed(() => {
  return props.routes.map((route) => ({
    label: route.label,
    to: route.path,
    exact: route.exact || false,
  }));
});
</script>

<style scoped>
.q-breadcrumbs-el {
  text-transform: capitalize;
}
</style>
