<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6"
        :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? '' : 'd-flex justify-end'">
        <div
          :style="{ width: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? '' : caraouselWidth + 'px' }">
          <v-carousel style="border-radius: 10px" :height="height" delimiter-icon="mdi-minus" hide-delimiter-background
            show-arrows-on-hover>
            <v-carousel-item v-for="(item, index) in detailProduk[0].gambar" :key="index"
            :src="item.src" :to="{name: 'imagePreview', params: {src: item.src}}">
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
      <v-col cols="12" lg="6" :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'pa-0 pb-4' : ''">
        <v-card elevation="0" width="400">
          <v-card-title>
            <v-row>
              <v-col cols="10" class="text-h6 blue-grey--text text--darken-2 font-weight-bold">
                <div>{{ detailProduk[0].title }}</div>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-start">
                <v-icon @click="addLike" :color="liked ? 'red' : 'blue-grey darken-2'" class="mt-2" size="35">
                  mdi-heart</v-icon>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="pl-2 d-flex flex-column">
            <v-rating size="15" color="yellow" readonly length="5" :value="detailProduk[0].rating">
            </v-rating>
            <span class="
              pl-2 
              blue-grey--text 
              text--darken-1 
              font-weight-bold 
              text-subtitle-1">
              Rp {{ formatedHarga }}
            </span>
            <div class="pl-2 text-caption">GRATIS Ongkir Di Sekitar Wilayah Toko Kami</div>
          </v-card-subtitle>
          <!-- tambah keranjang btn -->
          <v-card-actions class="d-flex justify-center">
            <v-btn text outlined rounded @click="bottomSheet = true" elevation="0" block height="45" color="primary">
              Tambah Keranjang
            </v-btn>
          </v-card-actions>
          <!-- tombol deskripsi produk -->
          <v-card-title v-ripple style="cursor: pointer; height: 50px" class="py-2"
            @click="deskripsiSheet = !deskripsiSheet">
            <div class="text-button black--text">Deskripsi</div>
            <v-spacer></v-spacer>
            <v-icon small>mdi-chevron-right</v-icon>
          </v-card-title>
          <!-- tombol beri rating -->
          <v-card-title v-ripple style="cursor: pointer; height: 50px" @click="dialogBeriRating" class="py-2">
            <div class="text-button black--text">Beri Rating</div>
            <v-spacer></v-spacer>
            <v-icon small>mdi-chevron-right</v-icon>
          </v-card-title>
          <!-- tombol kumpulan review -->
          <v-card-title class="py-2" @click="dialog = !dialog" style="cursor: pointer; height: 50px" v-ripple>
            <div class="text-button black--text">Reviews</div>
            <v-spacer></v-spacer>
            <v-icon small>mdi-chevron-right</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <!-- some dialog -->
    <!-- ----- -->
    <!-- ----- -->
    <!-- ----- -->
    <!-- dialog review jika belum login -->
    <v-bottom-sheet v-model="dialogBelumLogin" inset>
      <v-sheet>
        <v-card elevation="0">
          <v-card-title class="d-flex justify-center">
            <v-img src='../assets/what.png' max-width="300" max-height="250">
            </v-img>
          </v-card-title> 
          <v-card-subtitle class="d-flex justify-center text-h6 font-weight-bold blue-grey--text text--darken-1">
            Login Untuk Memberi Review
          </v-card-subtitle>
          <!-- <v-card-text class="d-flex flex-row justify-center">
            <div>
              <v-img src='../assets/what.png' max-width="300" max-height="250">
              </v-img>
            </div>
            <span class="font-weight-bold blue-grey--text text--darken-1">Login Untuk Memberi Review</span>
          </v-card-text> -->
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
    <!-- dialog tambah keranjang -->
    <v-bottom-sheet v-model="bottomSheet" inset>
      <v-sheet>
        <v-card elevation="0" class="py-4">
          <v-card-subtitle>
            <v-row justify="center">Quantity </v-row>
          </v-card-subtitle>
          <v-card-actions>
            <v-row justify="center" align="center" class="mx-1 my-1">
              <div>
                <v-btn icon @click="kurangiJumlahProduk">
                  <v-icon color="grey darken-4">mdi-minus</v-icon>
                </v-btn>
              </div>
              <div class="ml-2">
                <v-btn elevation="0" color="white" v-ripple="false">{{
                    jumlahProduk
                }}</v-btn>
              </div>
              <div class="ml-2">
                <v-btn icon @click="jumlahProduk++">
                  <v-icon color="grey darken-4">mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center">
            <v-btn text outlined color="primary" class="white--text" :loading="loadingBottom" rounded width="230"
              @click="addKeranjang">Tambah Keranjang</v-btn>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
    <!-- deskripsi bottom sheet -->
    <v-bottom-sheet v-model="deskripsiSheet" inset>
      <v-card elevation="0">
        <v-card-title class="font-weight-bold">Deskripsi</v-card-title>
        <v-card-text v-html="detailProduk[0].deskripsi"></v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn text color="black" @click="deskripsiSheet = !deskripsiSheet">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
    <!-- beri rating bottom sheet -->
    <v-bottom-sheet v-model="ratingSheet" scrollable inset>
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center">
          Beri Rating
        </v-card-title>
        <v-card-text style="overflow: hidden">
          <div class="d-flex justify-center pb-4">
            <span @click="showBeriReview = true">
              <v-rating v-model="beriRating" :value="beriRating" size="45" color="warning lighten-2"
                background-color="grey" :readonly="!isFill"></v-rating>
            </span>
          </div>
        </v-card-text>
        <v-card-text v-show="showBeriReview">
          <v-textarea no-resize auto-grow solo flat outlined clearable rows="4" color="black" label="beri review..."
            v-model="reviewText" :disabled="!isFill">
          </v-textarea>
          <v-card-actions v-if="isFill" class="d-flex justify-center">
            <v-btn :loading="isKirim" @click="kirimReview" color="black" outlined>Kirim</v-btn>
            <v-btn color="black" outlined @click="hideBeriReview">Batal</v-btn>
          </v-card-actions>
          <v-card-actions v-else class="d-flex justify-center">
            <v-btn outlined :loading="isKirim" width="200" color="black" @click="hapusSelfRating">Hapus</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <!-- kumpulan review -->
    <v-dialog v-model="dialog" scrollable
      :fullscreen="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? true : false" width="500">
      <v-card>
        <v-card-title>
          <div class="pl-4">Review</div>
          <v-spacer></v-spacer>
          <v-icon large @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-list v-for="(data, index) in reviews" :key="index">
            <template>
              <v-list-item three-line>
                <v-list-item-avatar>
                  <v-img :src="data.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                      data.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-rating color="yellow darken-2" readonly :value="data.rating" size="12"></v-rating>
                  </v-list-item-subtitle>
                  <div class="text-caption">
                    {{ data.text }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- snackbar ingfo -->
    <v-snackbar v-model="snackbar" outlined :color="snackbarColor ? 'green' : 'pink'">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import db from "../plugins/firebaseInit";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "PenjualanTestView",

  data() {
    return {
      dialogBelumLogin: false,
      color: false,
      currentHeight: null,
      caraouselWidth: 450,
      detailProduk: null,
      fab: false,
      height: 450,
      dialog: false,
      offsetTop: null,
      snackbar: false,
      beriRating: 0,
      snackbarColor: false,
      showBeriReview: false,
      text: "",
      labelColor: "",
      jumlahProduk: 1,
      bottomSheet: false,
      loadingBottom: false,
      deskripsiSheet: false,
      ratingSheet: false,
      liked: false,
      reviewText: "",
      isKirim: false,
      isFill: true,
      jumlahReview: 0,
      rating: null,
      reviews: [],
    };
  },

  mounted() {
    this.returnLabelColor();
    this.scrollTop();
  },
  created() {
    this.filterToDetailProduk(this.$route.params.id);
    this.isLiked();
    this.checkReview();
    this.getReviews();
  },
  computed: {
    formatedHarga() {
      let harga = this.detailProduk[0].harga;
      let formated = Intl.NumberFormat("de-DE").format(harga);
      return formated;
    },
  },
  methods: {
    selImg(i){
      console.log(i);
    },
    dialogBeriRating() {
      if (this.$store.state.user) {
        this.ratingSheet = !this.ratingSheet;
      } else {
        this.dialogBelumLogin = !this.dialogBelumLogin;
      }
    },
    async getReviews() {
      this.reviews = [];
      const database = await db
        .collection("review")
        .where("produkId", "==", this.$route.params.id)
        .get();
      const arr = database.docs.map((doc) => doc.data());
      arr.forEach(async (dat) => {
        const getUserData = await db
          .collection("client")
          .where("email", "==", dat.user)
          .get();
        const reData = getUserData.docs.map((doc) => doc.data());
        const review = {
          avatar: reData[0].avatar,
          username: reData[0].username,
          rating: dat.rating,
          text: dat.text,
        };
        this.reviews.push(review);
      });
    },
    async hapusSelfRating() {
      this.isKirim = true;
      const database = db
        .collection("review")
        .where("user", "==", firebase.auth().currentUser.email)
        .where("produkId", "==", this.$route.params.id);
      await database.get().then((some) => {
        some.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              this.showBeriReview = false;
              this.isFill = true;
              this.reviewText = "";
              this.beriRating = 0;
              this.isKirim = false;
              this.getReviews();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
      await this.getRating();
      console.log(this.jumlahReview + "/" + this.rating);
      const produk = db.collection("produk").doc(this.$route.params.id);
      produk
        .update({
          totalReview: this.jumlahReview,
          rating: this.rating,
        })
        .then(() => {
          console.log("review updated");
        });
    },
    async checkReview() {
      const database = await db.collection("review").get();
      const arr = database.docs.map((doc) => doc.data());
      if (
        arr.some((doc) => {
          return (
            doc.user == firebase.auth().currentUser.email &&
            doc.produkId == this.$route.params.id
          );
        })
      ) {
        this.showBeriReview = true;
        this.isFill = false;
        let review = arr.filter((dat) => {
          return (
            dat.user == firebase.auth().currentUser.email &&
            dat.produkId == this.$route.params.id
          );
        });
        if (review[0].text.length == 0) {
          this.reviewText = "( Memberi rating tidak memberi review )";
        } else {
          this.reviewText = review[0].text;
        }
        this.beriRating = review[0].rating;
      } else {
        console.log("^_^");
      }
    },
    async getRating() {
      const database = await db
        .collection("review")
        .where("produkId", "==", this.$route.params.id)
        .get();
      let arr = database.docs.map((doc) => doc.data());
      let arrRating = [];
      let jumlahRating = 0;
      arr.forEach((some) => {
        arrRating.push(some.rating);
      });
      for (const x of arrRating) {
        jumlahRating += x;
      }
      this.jumlahReview = arr.length;
      this.rating = Math.ceil(jumlahRating / arr.length);
    },
    async kirimReview() {
      this.isKirim = true;
      const database = db.collection("review").doc();
      await database
        .set({
          user: firebase.auth().currentUser.email,
          produkId: this.$route.params.id,
          text: this.reviewText,
          rating: this.beriRating,
          reviewAt: this.getDate(),
        })
        .then(() => {
          console.log("Beri Review");
          this.checkReview();
          this.isKirim = false;
          this.getReviews();
        })
        .catch((err) => {
          console.log(err);
        });
      await this.getRating();
      console.log(this.jumlahReview + "/" + this.rating);
      const produk = db.collection("produk").doc(this.$route.params.id);
      produk
        .update({
          totalReview: this.jumlahReview,
          rating: this.rating,
        })
        .then(() => {
          console.log("review updated");
        });
    },
    async isLiked() {
      const database = await db
        .collection("like")
        .where("user", "==", firebase.auth().currentUser.email)
        .where("produkId", "==", this.$route.params.id)
        .get();
      const arr = database.docs.map((doc) => doc.data());
      if (
        arr.some((data) => {
          return (
            data.user == firebase.auth().currentUser.email &&
            data.produkId == this.$route.params.id
          );
        })
      ) {
        this.liked = !this.liked;
      }
    },
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
    async addLike() {
      if (this.liked) {
        this.liked = false;
        const database = db
          .collection("like")
          .where("user", "==", firebase.auth().currentUser.email)
          .where("produkId", "==", this.$route.params.id);
        await database.get().then((some) => {
          some.forEach((data) => {
            data.ref
              .delete()
              .then(() => {
                this.$store.commit("filterFavorit", data.id);
                console.log("Terhapus favorit");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      } else {
        this.liked = true;
        const database = db.collection("like").doc();
        let like = {
          likeId: database.id,
          user: firebase.auth().currentUser.email,
          produkId: this.$route.params.id,
          likedAt: this.getDate(),
        };
        this.$store.dispatch("pushFavorit", like);
        await database
          .set({
            likeId: database.id,
            user: firebase.auth().currentUser.email,
            produkId: this.$route.params.id,
            likedAt: this.getDate(),
          })
          .then(() => {
            console.log("Tambah favorit");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async filterToDetailProduk(id) {
      if (this.$route.params.isFromLike == 'true') {
        const database = await db
          .collection("produk")
          .where("produkId", "==", id)
          .get();
        const produk = database.docs.map((doc) => doc.data());
        const getGambar = await db.collection("produk/" + id + "/gambar").get();
        var arr = [];
        getGambar.forEach((dat) => {
          let dd = {
            gambarId: dat.data().gambarId,
            namaGambar: dat.data().namaGambar,
            src: dat.data().src
          }
          arr.push(dd);
        });
        const fin = {
          produkId: produk[0].produkId,
          harga: produk[0].harga,
          deskripsi: produk[0].deskripsi,
          kategori: produk[0].kategori,
          title: produk[0].title,
          totalReview: produk[0].totalReview,
          rating: produk[0].rating,
          gambar: arr,
        };
        this.detailProduk = [fin];
      } else {
        let produk = this.$store.state.produk.filter((produk) => {
          return produk.produkId === id;
        });
        this.detailProduk = produk;
      }
    },
    showButton() {
      if (document.documentElement.scrollTop > 10) {
        this.offsetTop = true;
      } else {
        this.offsetTop = false;
      }
    },
    scrollTop() {
      document.documentElement.scrollTop = 0;
    },
    hideBeriReview() {
      this.showBeriReview = false;
      this.beriRating = 0;
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    returnLabelColor() {
      let arrayColor = [
        "pink",
        "red",
        "blue",
        "green",
        "purple",
        "yellow darken-4",
        "black",
        "grey",
        "deep-purple",
        "blue darken-4",
      ];
      let value = Math.floor(Math.random() * 10);
      this.labelColor = arrayColor[value];
    },
    addFavorite() {
      this.snackbar = true;
      this.text = "Ditambahkan Ke Favorit";
      this.snackbarColor = false;
    },
    async addKeranjang() {
      this.loadingBottom = true;
      if (firebase.auth().currentUser != null) {
        const database = db.collection("keranjang").doc();
        await database
          .set({
            keranjangId: database.id,
            userId: firebase.auth().currentUser.uid,
            produkId: this.$route.params.id,
            jumlah: this.jumlahProduk,
            status: "keranjang",
          })
          .then(() => {
            this.loadingBottom = false;
            this.bottomSheet = false;
            this.snackbar = true;
            this.text = "Ditambahkan Ke Keranjang";
            this.snackbarColor = true;
            this.$store.dispatch("getKeranjang");
          });
      } else {
        this.$router.push({ name: "Profile" });
        this.$store.commit("changeFootbarValue", 3);
      }
    },
    changeHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.height = 400;
          return;
        case "sm":
          this.height = 400;
          return;
        case "md":
          this.height = 500;
          return;
        case "lg":
          this.height = 550;
          return;
        case "xl":
          this.height = 700;
          return;
      }
    },
    kurangiJumlahProduk() {
      if (this.jumlahProduk > 1) {
        this.jumlahProduk--;
        return;
      }
    },
  },
  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  watch: {
    "$vuetify.breakpoint.name": function () {
      this.changeHeight();
    },
  },
};
</script>