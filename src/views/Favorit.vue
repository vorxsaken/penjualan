<template>
  <div
    :style="{ height: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? this.$vuetify.breakpoint.height - 140 + 'px' : '' }"
    :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'overflow-y-auto' : ''"
  >
    <v-card elevation="0" class="pb-4">
      <v-card-title
        ><span class="text-h4 pl-4 grey--text text--darken-3 font-weight-bold"
          >Favorit</span
        ></v-card-title
      >
      <div
        v-if="isLoad == true && isEmpty == false"
        class="d-flex justify-center"
      >
        <v-card-text style="width: 250px" class="mt-2 d-flex justify-center">
          <v-progress-linear
            indeterminate
            color="blue"
            height="6"
            size="40"
          ></v-progress-linear>
        </v-card-text>
      </div>
      <div
        style="height: 50vh"
        v-else-if="isLoad == false && isEmpty == true"
        class="d-flex justify-center"
      >
        <v-card-text style="height: 65vh;" class="d-flex align-center justify-center">
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center">
              <v-icon size="60">mdi-delete-empty</v-icon>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold">
              Favorit Kosong
            </v-card-subtitle>
          </v-card>
        </v-card-text>
      </div>
      <v-card-text
        v-else-if="isLoad == false && isEmpty == false"
        class="mb-n5"
      >
        <v-row dense>
          <v-col cols="12" lg="4" v-for="(items, index) in favorit" :key="index">
            <favoritList :item="items" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import favoritList from "../components/favoritList.vue";
// import firebase from "firebase/app";
// import db from "../plugins/firebaseInit";
import "firebase/auth";
export default {
  name: "PenjualanPesanan",
  components: {
    favoritList,
  },
  data() {
    return {
      favorit: [],
      isLoad: true,
      isEmpty: false,
    };
  },

  mounted() {},
  created() {
    this.getLike();
  },
  methods: {
    async getLike() {
      // const database = await db
      //   .collection("like")
      //   .where("user", "==", firebase.auth().currentUser.email)
      //   .get();
      // const arr = database.docs.map((doc) => doc.data());
      if (this.$store.state.favorit.length == 0) {
        this.isLoad = false;
        this.isEmpty = true;
        return;
      }
      this.isEmpty = false;
      // this.$store.state.favorit = [];
      // await this.$store.dispatch("getFavorit");
      this.favorit = this.$store.state.favorit;
      this.isLoad = false;
      return;
      // arr.forEach(async (val) => {
      //   const prod = await db
      //     .collection("produk")
      //     .where("produkId", "==", val.produkId)
      //     .get();
      //   const arrayOfLiked = prod.docs.map((doc) => doc.data());
      //   arrayOfLiked.forEach(async (dat) => {
      //     const produk = await db
      //       .collection("produk")
      //       .where("produkId", "==", dat.produkId)
      //       .get();
      //     const gambar = await db
      //       .collection("produk/" + dat.produkId + "/gambar")
      //       .limit(1)
      //       .get();
      //     const mapSrc = gambar.docs.map((doc) => doc.data());
      //     const mapProduk = produk.docs.map((doc) => doc.data());
      //     const fin = {
      //       produkId: mapProduk[0].produkId,
      //       title: mapProduk[0].title,
      //       harga: mapProduk[0].harga,
      //       src: mapSrc[0].src,
      //       rating: 4,
      //     };
      //     this.favorit.push(fin);
      //   });
      // });
      // setTimeout(() => {
      //   this.isLoad = false;
      // }, 900)
      // this.isLoad = false;
      // return;
    },
  },
};
</script>
