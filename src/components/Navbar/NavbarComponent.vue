<template>
  <div class="row Navbar-home content-center">
    <div class="col-xs-2 col-sm-4 col-md-8 content-center">
      <q-img :src="url" style="width: 140px" />
    </div>
    <div class="col-xs-10 col-sm-8 col-md-4 navbar-content">
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
      &nbsp;&nbsp;
      <q-btn-dropdown
        no-caps
        color="primary"
        :label="nombre"
        style="font-size: 10px"
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>
                <router-link to="/" @click="cerrar"
                  >Cerrar sesión</router-link
                ></q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
const { isAcces } = useAuth();
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
});
let url = imgLogoNavbar;
</script>

<style scoped src="./NavbarComponent.scss"></style>
