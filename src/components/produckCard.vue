<template>
  <v-card max-width="375" elevation="0">
    <v-icon
      style="position: absolute; z-index: 1"
      class="ms-2 mt-2"
      @click="favoritClick"
      v-ripple
      :color="isFavorit ? 'red' : 'white'"
      >mdi-heart</v-icon
    >
    <div class="rating">
      <v-icon color="white" x-small>mdi-star</v-icon
      ><span class="ml-1 text-overline white--text font-weight-bold">{{
        isNaN(produk.rating) ? "0" : produk.rating
      }}</span>
    </div>
    <v-img
      style="cursor: pointer"
      @click="produkClick"
      height="220"
      class="align-end"
      :src="produk.gambar[0]"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
    >
      <template v-slot:placeholder>
        <v-row
          class="grey lighten-2 fill-height ma-0"
          align="center"
          justify="center"
        >
        </v-row>
      </template>
      <v-card-title style="word-break: break-word;" 
      class="text-subtitle-2 white--text font-weight-medium">
      {{ title }}
      </v-card-title>
      <v-card-subtitle
        class="blue-grey--text text--lighten-5 text-caption font-weight-light"
        >Rp. {{ formatedHarga }}
      </v-card-subtitle>
    </v-img>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../plugins/firebaseInit.js";
export default {
  name: "PenjualanProduckcard",
  props: ["produk"],
  data() {
    return {
      isFavorit: false,
    };
  },
  computed: {
    title() {
      let currentTitle = this.produk.title;
      if (currentTitle.split("").length > 33) {
        let newTitle = currentTitle.slice(0, 30) + " ....";
        return newTitle;
      }
      return currentTitle;
    },
    formatedHarga() {
      let harga = this.produk.harga;
      let formated = Intl.NumberFormat("de-DE").format(harga);
      return formated;
    },
  },
  watch: {
    produk: function () {
      this.title();
      this.formatedHarga();
    },
  },
  mounted() {},
  created() {
    this.isLiked();
  },
  methods: {
    favoritClick() {
      this.isFavorit = !this.isFavorit;
      this.$emit("favoritClick", this.produk.produkId);
    },
    produkClick() {
      this.$emit("produkClick", this.produk.produkId);
    },
    async isLiked() {
      const database = await db.collection("like").get();
      const arr = database.docs.map((doc) => doc.data());
      if (
        arr.some((data) => {
          return (
            data.user == firebase.auth().currentUser.email &&
            data.produkId == this.produk.produkId
          );
        })
      ) {
        this.isFavorit = !this.isFavorit;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rating{
  position: absolute;
  z-index: 1;
  right: 6px;
  top: 2px;
}
</style>