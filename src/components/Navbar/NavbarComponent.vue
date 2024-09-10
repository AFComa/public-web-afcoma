<template>
  <div class="row Navbar-home content-center">
    <div class="col-xs-2 col-sm-4 col-md-8 content-center">
      <q-img :src="url" style="width: 140px" />
    </div>
    <div class="col-xs-10 col-sm-8 col-md-4 navbar-content" @click="cerrar">
      <q-avatar
        style="
          background-color: #244b5a;
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
const { isAcces, isPermission } = useAuth();
const { logout } = mandatosAuth();

const cerrar = async () => {
  await logout({
    token: localStorage.getItem('token'),
    _id: isAcces.value.ID,
  });

  localStorage.clear();
  router.push('/');
};

onMounted(async () => {
  avatar.value = isAcces.value.avatar;
  nombre.value = `${isAcces.value.username} ${isAcces.value.apellidos}`;
  email.value = isPermission.value.email;
  ultimoAcceso.value = `${isAcces.value.last_access.split(' ')[0]} ${
    isAcces.value.last_access.split(' ')[1]
  }`;
});
let url = imgLogoNavbar;
</script>

<style scoped src="./NavbarComponent.scss"></style>
