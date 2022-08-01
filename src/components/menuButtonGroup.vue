<template>
  <v-btn-toggle color="white" dense borderless :ripple="false" mandatory v-model="btnToggle">
    <v-btn color="white" :ripple="false" :value="0" @click="home">
      <v-icon size="25">{{ btnToggle == 0 ? 'mdi-home' : 'mdi-home-outline' }}</v-icon>
    </v-btn>
    <v-btn color="white" :ripple="false" :value="1" @click="pesanan">
      <v-icon size="25">{{ btnToggle == 1 ? 'mdi-shopping' : 'mdi-shopping-outline' }}</v-icon>
    </v-btn>
    <v-btn color="white" :ripple="false" :value="2" @click="favorit">
      <v-icon size="25">{{ btnToggle == 2 ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
    </v-btn>
    <v-btn color="white" :ripple="false" :value="3" @click="profile">
      <v-icon size="25">{{ btnToggle == 3 ? 'mdi-account-circle' : 'mdi-account-circle-outline' }}</v-icon>
    </v-btn>
    <v-btn color="white" :ripple="false" :value="4" :to="{ name: 'Keranjang' }">
      <v-badge
        :content="this.$store.state.keranjang.length"
        :value="this.$store.state.keranjang.length"
        color="red darken-2"
        overlap
      >
        <v-icon size="25" color="black">{{ btnToggle == 4 ? 'mdi-cart' : 'mdi-cart-outline' }}</v-icon>
      </v-badge>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "PenjualanMenuButtonGroup",

  data() {
    return {
      btnToggle: null,
    };
  },
  created() {
    this.checkButton();
  },
  mounted() {},

  methods: {
    checkButton() {
      if (this.$route.name == "Home") {
        this.btnToggle = 0;
      } else if (this.$route.name == "Pesanan") {
        this.btnToggle = 1;
      } else if (this.$route.name == "Favorit") {
        this.btnToggle = 2;
      } else if (this.$route.name == "Profile" || this.$route.name == "User") {
        this.btnToggle = 3;
      } else if(this.$route.name == "Keranjang") {
        this.btnToggle = 4;
      }
    },
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

  watch: {
    $route() {
      this.checkButton();
    },
  },
};
</script>