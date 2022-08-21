<template>
  <span>
    <v-system-bar v-if="cart" class="d-flex justify-center" app color="white">
      <v-icon>mdi-chart-donut-variant</v-icon>
      <span class="text-overline black--text">Eza Elektronik</span>
    </v-system-bar>
    <v-app-bar id="nab" :class="warnaNavbar" app :elevation="elevation">
      <v-container>
        <v-row>
          <v-col v-if="!cart" class="d-flex justify-center">
            <div style="width: 150px; height: 40px" class="overflow-y-hidden">
              <v-img width="150" height="40" :src="require('../assets/eza.png')"></v-img>
            </div>
          </v-col>
          <v-col class="px-0" :cols="this.$vuetify.breakpoint.xs ? 10 : 4">
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
          </v-col>
          <v-col :cols="this.$vuetify.breakpoint.xs ? 2 : 4">
            <menuButton v-if="!cart" />
            <v-btn v-else icon :to="{ name: 'Keranjang' }">
              <v-badge
                :content="this.$store.state.keranjang.length"
                :value="this.$store.state.keranjang.length"
                color="red darken-2"
                overlap
              >
                <v-icon color="black">$vuetify.icons.cart</v-icon>
              </v-badge>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </span>
</template>

<script>
import menuButton from "./menuButtonGroup.vue";
export default {
  name: "PenjualanNavbar",
  components: {
    menuButton,
  },
  data() {
    return {
      warnaNavbar: "white",
      elevation: "0",
      hideOnScroll: true,
      cart: true,
    };
  },

  mounted() {},
  created() {
    this.watchNav();
  },
  methods: {
    getSource(filename, format) {
      var images = require.context("../assets", false, /\.png$/);
      return images("./" + filename + format);
    },
    showKategori() {
      this.warnaNavbar = "white";
      this.elevation = "0";
      this.hideOnScroll = false;
      this.$router.push({ name: "Kategori" });
      this.$store.state.hideKategori = false;
      // this.cart = false;
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
        // this.cart = true;
        return;
      }
    },
    buttonHideKategori() {
      if (this.$store.state.hideKategori) {
        this.warnaNavbar = "white";
        this.elevation = "0";
        this.hideOnScroll = true;
        this.$refs.search.blur();
        // this.cart = true;
        return;
      }
    },
    watchNav() {
      if (this.$vuetify.breakpoint.width > 960) {
        this.cart = false;
      } else {
        this.cart = true;
      }
    },
  },
  watch: {
    "$store.state.hideKategori": function () {
      this.buttonHideKategori();
    },
    "$vuetify.breakpoint.width": function () {
      this.watchNav();
    },
  },
};
</script>

<style lang="scss" scoped></style>
