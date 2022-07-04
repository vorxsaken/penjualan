<template>
  <span>
    <v-system-bar class="d-flex justify-center" app color="white">
      <v-icon>mdi-chart-donut-variant</v-icon>
      <span class="text-overline black--text">Raja Vape Mejobo</span>
    </v-system-bar>
    <v-app-bar
      id="nab"
      :class="warnaNavbar"
      app
      :elevation="elevation"
      class="mt-5"
    >
      <v-text-field
        placeholder="Cari..."
        filled
        rounded
        dense
        background-color="grey lighten-4"
        single-line
        hide-details
        :prepend-inner-icon="hideOnScroll ? 'mdi-magnify' : 'mdi-arrow-left'"
        @focus="showKategori"
        @click:prepend-inner="changeState"
        ref="search"
      >
      </v-text-field>
      <v-spacer v-if="cart"></v-spacer>
      <v-btn icon v-if="cart" :to="{ name: 'Keranjang' }">
        <v-badge
          :content="this.$store.state.keranjang.length"
          :value="this.$store.state.keranjang.length"
          color="red darken-2"
          overlap
          
        >
          <v-icon color="black">$vuetify.icons.cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <div></div>
  </span>
</template>

<script>
export default {
  name: "PenjualanNavbar",
  data() {
    return {
      warnaNavbar: "white",
      elevation: "0",
      hideOnScroll: true,
      cart: true,
    };
  },

  mounted() {},

  methods: {
    showKategori() {
      this.warnaNavbar = "white";
      this.elevation = "0";
      this.hideOnScroll = false;
      this.$router.push({ name: "Kategori" });
      this.$store.state.hideKategori = false;
      this.cart = false;
    },
    keepFocus() {
      this.$refs.search.focus();
    },
    changeState() {
      this.$store.state.hideKategori = true;
      this.hideKategori();
    },
    hideKategori() {
      if (this.$store.state.hideKategori) {
        this.warnaNavbar = "white";
        this.elevation = "0";
        this.hideOnScroll = true;
        this.$router.go(-1);
        this.$refs.search.blur();
        this.cart = true;
        return;
      }
    },
    buttonHideKategori() {
      if (this.$store.state.hideKategori) {
        this.warnaNavbar = "white";
        this.elevation = "0";
        this.hideOnScroll = true;
        this.$refs.search.blur();
        this.cart = true;
        return;
      }
    },
  },
  watch: {
    "$store.state.hideKategori": function () {
      this.buttonHideKategori();
    },
  },
};
</script>

<style lang="scss" scoped></style>
