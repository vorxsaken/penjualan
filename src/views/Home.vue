<template>
  <div
    id="home"
    :style="{
      height:
        this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
          ? this.$vuetify.breakpoint.height - 140 + 'px'
          : '',
    }"
    :class="
      this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        ? 'overflow-y-auto'
        : ''
    "
  >
    <v-container v-scroll:#home="rememberScroll">
      <v-card class="mb-2" elevation="0">
        <v-card-title class="py-1 pl-2 d-flex justify-start">
          <span class="text-body-1 pl-0 black--text font-weight-bold"
            >Semua Produk</span
          >
        </v-card-title>
      </v-card>
      <v-row dense>
        <v-col
          v-for="(card, index) in produk"
          :key="index"
          cols="6"
          md="4"
          lg="2"
          xl="2"
        >
          <produkCard
            @produkClick="detailProduk"
            @favoritClick="addFavorit"
            :produk="card"
          />
        </v-col>
      </v-row>
      <v-row v-if="isBottom">
        <v-col>
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center pa-0">
              <v-progress-circular
                size="30"
                color="red"
                indeterminate
                v-intersect="appendProduk"
              ></v-progress-circular>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import produkCard from "../components/produckCard.vue";
import db from "../plugins/firebaseInit.js";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  components: {
    produkCard,
  },
  data() {
    return {
      produk: null,
      benched: 0,
      isInfinite: false,
      isBottom: false,
    };
  },
  methods: {
    getDate() {
      let dateGet = new Date();
      let tanggal = dateGet.getDate();
      let bulanArray = [
        "jan",
        "feb",
        "mar",
        "apr",
        "mei",
        "jun",
        "jul",
        "agu",
        "sep",
        "okt",
        "nov",
        "des",
      ];
      let bulan = bulanArray[dateGet.getMonth()];
      let tahun = dateGet.getFullYear();
      let finalDate = tanggal + "/" + bulan + "/" + tahun;
      return finalDate;
    },
    detailProduk(payload) {
      this.$router.push({
        name: "detailProduk",
        params: { id: payload, isFromLike: "false" },
      });
    },
    async addFavorit(produkID) {
      const getLike = await db.collection("like").get();
      const arr = getLike.docs.map((doc) => doc.data());
      if (
        arr.some((like) => {
          return (
            like.user == firebase.auth().currentUser.email &&
            like.produkId == produkID
          );
        })
      ) {
        let del = db
          .collection("like")
          .where("produkId", "==", produkID)
          .where("user", "==", firebase.auth().currentUser.email);
        await del.get().then((some) => {
          some.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                this.$store.commit("filterFavorit", doc.id);
                console.log("Terhapus favorit");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      } else {
        const database = db.collection("like").doc();
        let like = {
          likeId: database.id,
          user: firebase.auth().currentUser.email,
          produkId: produkID,
          likedAt: this.getDate(),
        };
        this.$store.dispatch("pushFavorit", like);
        await database
          .set({
            likeId: database.id,
            user: firebase.auth().currentUser.email,
            produkId: produkID,
            likedAt: this.getDate(),
          })
          .then(() => {
            console.log("Tambah Favorit");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    appendProduk(entries) {
      if (entries[0].isIntersecting) {
        console.log("mengambil data selanjutnya");
        // if (
        //   window.innerHeight + window.pageYOffset >=
        //   document.body.offsetHeight - 2
        // ) {
        this.$store.dispatch("getNextproduk");
        // }
      }
    },
    rememberScroll(e) {
      this.$store.state.scrollY = e.target.scrollTop;
    },
    checkState() {
      if (this.$store.state.produk.length >= this.$store.state.totalLength) {
        this.isBottom = false;
      } else {
        this.isBottom = true;
      }
    },
  },
  async created() {
    this.produk = this.$store.state.produk;
    setTimeout(() => {
      this.checkState();
    }, 1500);
  },
  watch: {
    "$store.state.produk": function () {
      this.checkState();
    },
  },
  mounted() {
    document.getElementById("home").scrollTo(0, this.$store.state.scrollY);
  },
};
</script>
