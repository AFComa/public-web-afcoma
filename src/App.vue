<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { mandatosAuth } from 'src/composables/mandatosAuth';

const router = useRouter();
const { logout } = mandatosAuth();

const idleTime = 300000;

let timeoutId: ReturnType<typeof setTimeout>;

const resetTimer = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    await logout();
    localStorage.clear();
    router.push('/');
  }, idleTime);
};

onMounted(() => {
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keydown', resetTimer);
  window.addEventListener('mousedown', resetTimer);
  window.addEventListener('touchstart', resetTimer);
  resetTimer();
});

onUnmounted(() => {
  clearTimeout(timeoutId);
  window.removeEventListener('mousemove', resetTimer);
  window.removeEventListener('keydown', resetTimer);
  window.removeEventListener('mousedown', resetTimer);
  window.removeEventListener('touchstart', resetTimer);
});
</script>
