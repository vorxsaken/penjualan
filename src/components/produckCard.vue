<template>
  <v-card max-width="375" elevation="0" flat rounded="lg">
    <v-img style="cursor: pointer" height="240" :src="produk.gambar[0].pic"
      gradient="to bottom, rgba(0,0,0,.1), rgba(12, 11, 41,0.5)">
      <template v-slot:placeholder>
        <v-row class="grey lighten-2 fill-height ma-0" align="center" justify="center">
        </v-row>
      </template>
      <div class="d-flex flex-column align-start fill-height " @click.self="produkClick">
        <div class="d-flex flex-row justify-space-between mb-auto px-2 py-1" style="z-index: 2; width: 100%;">
          <v-icon class="" @click.self="favoritClick" :color="isFavorit ? 'red' : 'white'">
            mdi-heart
          </v-icon>
          <div class="d-flex flex-row align-center">
            <v-icon color="white" small>
              mdi-star
            </v-icon>
            <span class="ml-1 text-overline white--text font-weight-bold">
              {{ isNaN(produk.rating) ? "0" : produk.rating }}
            </span>
          </div>
        </div>
        <div class="d-flex flex-column" @click="produkClick">
          <v-card-title style="word-break: break-word;"
            class="text-subtitle-2 white--text font-weight-medium pt-0 pr-0">
            {{ title }}
          </v-card-title>
          <v-card-subtitle class="blue-grey--text text--lighten-5 text-caption font-weight-light">Rp. {{ formatedHarga
          }}
          </v-card-subtitle>
        </div>
      </div>

    </v-img>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../plugins/firebaseInit.js";
// import Compressor from "compressorjs";
import { compressImage } from "../composes/composes";

export default {
  name: "PenjualanProduckcard",
  props: ["produk"],
  data() {
    return {
      isFavorit: false,
      image: ''
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
  mounted() { },
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
    async compress(gambar) {
      // fetch(gambar).then(result => result.blob()).then((blob) => {
      //   new Compressor(blob, {
      //     quality: 0.8,
      //     width: 300,
      //     success(res){
      //       const con = URL.createObjectURL(res);
      //       return con;
      //     }
      //   })
      // })

      // const image = new Image();
      // image.src = gambar;

      // image.onload = () => {
      //   new Compressor(this, {
      //     quality: 0.8,
      //     width: 300,
      //     success(result){
      //       const img = URL.createObjectURL(result);
      //       console.log(img)
      //     }
      //   })
      // }

      const image = new Image();
      image.src = gambar;

      var width = 0;
      var height = 0;
      image.onload = function () {
        width = this.width;
        height = this.height;
      }

      const s = await compressImage(gambar, 300 / width, width, height);
      const img = URL.createObjectURL(s);
      return img;

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
.rating {
  position: absolute;
  z-index: 1;
  right: 6px;
  top: 2px;
}
</style>