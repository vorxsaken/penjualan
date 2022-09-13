<template>
  <v-bottom-navigation :value="this.$store.state.footbarValue" grow shift app>
    <v-btn @click="home" height="55px">
      <span>Home</span>
      <v-icon>$vuetify.icons.home</v-icon>
    </v-btn>
    <v-btn @click="pesanan" height="55px">
      <span>Pesanan</span>
      <v-icon>$vuetify.icons.pesanan</v-icon>
    </v-btn>
    <v-btn @click="favorit" height="55px">
      <span>Favorit</span>
      <v-icon>$vuetify.icons.favorit</v-icon>
    </v-btn>
    <v-btn @click="profile" height="55px">
      <span>Profile</span>
        <v-icon >$vuetify.icons.profil</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "PenjualanFooter",
  mounted() {},
  data() {
    return {
      firstload: true,
      loading: true,
    };
  },
  computed: {
    isAvatar() {
      if (this.$store.state.userAvatar) {
        return true;
      }
      return false;
    },
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
      this.$store.commit("changeFootbarValue", 0);
    },
    pesanan() {
      this.$router.push({ name: "Pesanan" });
      this.$store.commit("changeFootbarValue", 1);
    },
    favorit() {
      this.$router.push({ name: "Favorit" });
      this.$store.commit("changeFootbarValue", 2);
    },
    profile() {
      this.$router.push({ name: "Profile" }).catch(() => {});
      this.$store.commit("changeFootbarValue", 3);
    },
  },
};
</script>
