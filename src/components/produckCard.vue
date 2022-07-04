<template>
  <div>
    <v-card max-width="375" elevation="0">
      <v-img height="200" :src="produk.gambar[0]">
        <template v-slot:placeholder>
          <v-row class="grey lighten-2 fill-height ma-0" align="center" justify="center">
          </v-row>
        </template>
        <v-icon
          class="ms-2 mt-2"
          @click="favoritClick"
          v-ripple
          :color="isFavorit ? 'red' : 'white'"
          >mdi-heart</v-icon
        >
      </v-img>
      <div
        @click="produkClick"
        v-ripple="{ class: 'black--text' }"
        style="cursor: pointer; min-height: 106px; max-height: 106px"
      >
        <v-card-text class="pb-1 pl-3">
          <v-row align="center" class="mx-0 pa-0">
            <v-rating
              :value="produk.rating"
              dense
              color="red"
              readonly
              size="12"
            ></v-rating>
            <div class="grey--text text--darken-1 ms-2 text-caption">({{ produk.totalReview }})</div>
          </v-row>
        </v-card-text>
        <v-list class="pt-0">
          <v-list-item>
            <v-list-item-content>
              <div class="text-button-1 font-weight-medium">
                {{ title }}
              </div>
              <v-list-item-subtitle
                class="grey--text text--darken-2 font-weight-medium"
              >
                Rp. {{ formatedHarga }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </div>
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
  created(){
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
    async isLiked(){
      const database = await db.collection("like").get();
      const arr = database.docs.map(doc => doc.data());
      if(arr.some((data) => { return data.user == firebase.auth().currentUser.email && data.produkId == this.produk.produkId})){
        this.isFavorit = !this.isFavorit;
      }
    }
  },
};
</script>
