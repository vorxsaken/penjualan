<template>
  <div
    :style="{ height: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? this.$vuetify.breakpoint.height - 140 + 'px' : '' }"
    :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'overflow-y-auto' : ''"
  >
    <v-card elevation="0">
      <v-card elevation="0">
        <v-card-title class="pb-0 pt-2 d-flex justify-center">
          <v-avatar size="140" color="grey lighten-3">
            <v-img :src="this.$store.state.userAvatar"></v-img>
          </v-avatar>
        </v-card-title>
        <v-card-text class="pt-2">
          <v-card-title class="pt-0 black--text d-flex justify-center">{{
            this.$store.state.userName
          }}</v-card-title>
          <v-card-subtitle class="pt-0 d-flex justify-center">{{
            this.$store.state.userEmail
          }}</v-card-subtitle>
        </v-card-text>
      </v-card>
      <v-divider class="mx-10"></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item :to="{ name: 'profileUser' }" link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Profil </v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'riwayat_pesanan'}" link>
            <v-list-item-icon><v-icon>mdi-history</v-icon></v-list-item-icon>
            <v-list-item-title>Riwayat Pesanan</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'editAlamat' }">
            <v-list-item-icon
              ><v-icon>mdi-home-map-marker</v-icon></v-list-item-icon
            >
            <v-list-item-title>Alamat</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item link>
            <v-list-item-icon><v-icon>mdi-bank</v-icon></v-list-item-icon>
            <v-list-item-title>Bank</v-list-item-title>
          </v-list-item> -->
          <v-list-item link :to="{name: 'ubah_password'}">
            <v-list-item-icon><v-icon>mdi-lock-reset</v-icon></v-list-item-icon>
            <v-list-item-title>Ubah Password</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{name: 'about'}">
            <v-list-item-icon><v-icon>mdi-information</v-icon></v-list-item-icon>
            <v-list-item-title>Tentang</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "PenjualanPesanan",

  data() {
    return {
      showPilihanAdmin: false,
      showPilihanProduk: false,
    };
  },

  mounted() {},

  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$router.replace({ name: "Home" });
      document.location.reload();
      console.log("sign out");
    },
  },
};
</script>
