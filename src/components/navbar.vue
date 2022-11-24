<template>
  <span>
    <v-system-bar v-if="cart" class="d-flex justify-center" app color="white">
      <span class="text-subtitle-1 black--text styled">Eza Elektronik</span>
    </v-system-bar>
    <v-app-bar id="nab" :class="this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm' ? 'mt-5 white' : 'white'" app 
    :elevation="elevation">
      <v-container>
        <v-row>
          <v-col v-if="!cart" class="d-flex justify-center">
            <div style="width: 150px; height: 40px" class="overflow-y-hidden">
              <v-img width="150" height="40" :src="require('../assets/eza.png')"></v-img>
            </div>
          </v-col>
          <v-col class="px-0" :cols="this.$vuetify.breakpoint.xs ? 10 : 4" style="position: relative">
            <v-text-field placeholder="# cari produk..." filled rounded dense background-color="grey lighten-4"
              single-line hide-details :prepend-inner-icon="hideOnScroll ? 'mdi-magnify' : 'mdi-arrow-left'"
              v-model="search" @focus="showKategori" @click:prepend-inner="changeState" ref="search"
              @keyup.enter="cari">
            </v-text-field>
            <v-card v-if="this.$store.state.isSearch" style="position: absolute; top: 60px;width: 100%">
              <v-card-title v-if="recommendation.length == 0" class="d-flex justify-center align-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-card-title>
              <v-list v-else>
                <div v-for="(n, index) in recommendation" :key="index">
                  <v-list-item @click="toProduk(n.produkId)">
                    <v-list-item-title class="text-left">
                      {{ n.title }}
                    </v-list-item-title>
                  </v-list-item>
                </div>
              </v-list>
            </v-card>
          </v-col>
          <v-col :cols="this.$vuetify.breakpoint.xs ? 2 : 4">
            <menuButton v-if="!cart" />
            <v-btn v-else icon :to="{ name: 'Keranjang' }">
              <v-badge :content="this.$store.state.keranjang.length" :value="this.$store.state.keranjang.length"
                color="red darken-2" overlap>
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
import db from "../plugins/firebaseInit";

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
      search: '',
      timer: null,
      recommendation: [],
      isSearch: false
    };
  },
  mounted() { },
  created() {
    this.watchNav();
  },
  methods: {
    cari(){
      this.$store.state.searchViewParams = this.search;
      this.$router.push({name: 'searchView'});
    },
    toProduk(n){
      this.$router.push({name: 'detailProduk', params: {id: n, isFromLike: 'true'}});
    },
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
      this.isSearch = false;
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
    getAnswer() {
      clearTimeout(this.timer);

      this.timer = setTimeout(async () => {
        this.recommendation = [];
        if (this.search.length != 0) {
          this.$store.state.isSearch = true
          const database = await db.collection("produk")
            .orderBy("title", 'asc').startAt(this.search.toUpperCase())
            .endAt(`${this.search.toLowerCase()}\uf8ff`).limit(6).get();
          database.forEach((n) => {
            this.recommendation.push(n.data());
          })
        } else {
          this.$store.state.isSearch = false;
        }
      }, 800)
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
    search() {
      this.getAnswer();
    }
  },
};
</script>

<style lang="scss" scoped>
.styled {
  font-family: "Bungee Hairline" !important;
  font-weight: 600 !important;
}

</style>
