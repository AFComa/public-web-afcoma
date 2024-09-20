<template>
  <div class="row Navbar-home content-center">
    <div class="col-xs-2 col-sm-4 col-md-8 content-center">
      <q-img :src="url" style="width: 140px" />
    </div>
    <div class="col-xs-10 col-sm-8 col-md-4 navbar-content" @click="toggleMenu">
      <q-avatar
        style="
          background-color: #244b5a;
          cursor: pointer;
          width: 45px;
          height: 45px;
          color: white;
          font-size: 30px;
        "
        >{{ avatar }}</q-avatar
      >
      <div class="user-info">
        <div>
          <span class="username">{{ nombre }}</span>
          <br />
          <span class="email">{{ email }}</span>
        </div>
        <div class="vertical-separator"></div>
        <div class="last-access">
          Último acceso: <br />
          {{ ultimoAcceso }}
        </div>
      </div>
      <!-- Dropdown para cerrar sesión -->
      <div v-if="menuVisible" class="logout-menu">
        <a @click="cerrar">Cerrar sesión</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import imgLogoNavbar from '../../assets/img/logo/1.png';
import { useAuth } from 'src/composables/userAuth';
import { mandatosAuth } from 'src/composables/mandatosAuth';

defineOptions({
  name: 'HeroComponent',
});
const router = useRouter();
const avatar = ref('');
const nombre = ref('');
const email = ref('');
const ultimoAcceso = ref('');
const menuVisible = ref(false);
const { getUserId, isAcces, isPermission } = useAuth();
const { logout } = mandatosAuth();

const cerrar = async () => {
  await logout();
  localStorage.clear();
  router.push('/');
};
const handleClickOutside = (event: MouseEvent) => {
  const menu = document.querySelector('.navbar-content');
  if (menu && !menu.contains(event.target as Node)) {
    menuVisible.value = false;
  }
};
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  await getUserId({
    id: isAcces.value?.ID,
    opc: 1,
  });
  email.value = await isPermission.value.email;
  avatar.value = await isAcces.value.avatar;
  nombre.value = `${isAcces.value.username} ${isAcces.value.apellidos}`;
  ultimoAcceso.value = `${isAcces.value.last_access.split(' ')[0]} ${
    isAcces.value.last_access.split(' ')[1]
  }`;
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
let url = imgLogoNavbar;
</script>

<style scoped src="./NavbarComponent.scss"></style>
