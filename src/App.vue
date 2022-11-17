<template>
  <v-app style="user-select: none">
    <div v-if="isMounted" class="fill-height d-flex justify-center align-center">
      <v-img src="@/assets/Circles-menu-3.gif" max-height="25" max-width="50"></v-img>
    </div>
    <div v-else>
      <navbar />
      <v-main>
        <router-view> </router-view>
      </v-main>
      <foot v-if="foot" />
      <v-dialog width="400" v-model="firstVisit" persistent>
        <!-- <v-card elevation="0" class="pb-6 pt-2">
          <v-card-title class="d-flex justify-center pb-8 font-weight-bold"
            >Note</v-card-title
          >
          <v-card-subtitle class="d-flex justify-center">
            <v-img :src="require('./assets/cuteCat.webp')"></v-img>
          </v-card-subtitle>
          <v-card-text class="d-flex justify-center">
            <span
              class="text-subtitle-2 blue-grey--text text--darken-1 font-weight-medium text-start"
            >
              Aplikasi ini masih dalam pengembangan. <br />
              <span v-if="this.$store.state.userEmail.length == 0">
                <span class="font-weight-thin text-caption"
                  >email: vorxsaken@vorxsaken.com</span
                ><br />
                <span class="font-weight-thin text-caption">password: adminadmin</span
                ><br />
              </span>
              <div class="mt-3 text-center">
                <span class="font-weight-bold">Tech Stack</span> : <br />
                <v-icon color="yellow darken-1" class="mr-2">mdi-firebase</v-icon>
                <v-icon class="mr-2">$vuetify.icons.express</v-icon>
                <v-icon color="green darken-1" class="mr-2">mdi-vuejs</v-icon>
                <v-icon color="green darken-4" class="mr-2">mdi-nodejs</v-icon>
              </div>
            </span>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              outlined
              color="primary"
              rounded
              class="py-4 px-8"
              @click="notFirstTime"
              :disabled="okayDisbaled"
            >
              Okay {{ okayDisbaled ? "(" + second + ")" : "" }}
            </v-btn>
          </v-card-actions>
        </v-card> -->
        <v-card elevation="0" class="pb-6 pt-2">
          <v-card-title class="title-login sm:text-h6 font-weight-bold sm d-flex justify-center mb-2">
            EZA Electronik
          </v-card-title>
          <v-card-subtitle class="d-flex justify-center">
            versi: 1.0.0
          </v-card-subtitle>
          <v-card-text class="d-flex justify-center">
            <v-list>
              <v-list-item dense class="pr-0">
                <v-list-item-icon>
                  <v-icon>
                    mdi-account
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    Developer
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Moh Basyarudin Alfahmi
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense class="pr-0">
                <v-list-item-icon>
                  <v-icon>
                    mdi-whatsapp
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    Whatsapp
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    (+62) 81952207090
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense class="pr-0">
                <v-list-item-icon>
                  <v-icon >
                    mdi-github
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    github
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    vorxsaken
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item dense class="pr-0">
                <v-list-item-icon>
                  <v-icon >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    Address
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    5VCX+2CV, Jalan Suryo Kusumo,
                    <br> Mejabo Wetan, Kesambi, Kec. Mejobo,
                    <br> Kabupaten Kudus, Jawa Tengah 59381
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn outlined color="primary" rounded class="py-4 px-8" @click="notFirstTime" :disabled="okayDisbaled">
              Okay {{ okayDisbaled ? "(" + second + ")" : "" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import navbar from "./components/navbar.vue";
import foot from "./components/footer.vue";
import { App as CapacitorApp } from "@capacitor/app";
import { Keyboard } from "@capacitor/keyboard";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import db from "./plugins/firebaseInit";

import "firebase/auth";
export default {
  name: "App",
  components: {
    navbar,
    foot,
  },
  data() {
    return {
      foot: null,
      isMounted: true,
      transitionName: null,
      firstVisit: false,
      second: 3,
      okayDisbaled: true,
    };
  },
  async created() {
    //data and firebase auth stuff
    await this.$store.dispatch("getProduk");
    await this.$store.dispatch("getKeranjang");
    await this.$store.dispatch("getAlamat");
    await this.$store.dispatch("getFavorit");
    await this.$store.dispatch("getKategori");
    this.isMounted = false;
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user.emailVerified) {
        this.$store.commit("updateUser", user);
        await this.$store.dispatch("getCurrentUser");
        db.collection("client")
          .where("email", "==", this.$store.state.userEmail)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type == "modified") {
                this.logout(change.doc.data().enable);
                console.log("change");
              }
              if (change.type == "removed") {
                this.logout();
              }
            });
          });
        
        db.collection("pemesanan").where('userEmail', '==', this.$store.state.userEmail).onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if(change.type == "modified"){
              if(change.doc.data().status == 'bayar'){
                let payload = {
                  id: change.doc.data().pemesananId,
                  status: 'bayar'
                }
                this.$store.dispatch("changeOrderStatus", payload );
              } else if(change.doc.data().status == 'shipped'){
                let payload = {
                  id: change.doc.data().pemesananId,
                  status: 'shipped'
                }
                this.$store.dispatch("changeOrderStatus", payload)
              }
            }
          })
        })
      }
    });

    //cek apakah user mengunjungi aplikasi ini untuk pertama kalinya
    // if(localStorage.length > 1){
    //   this.firstVisit = false;
    // }

    //footer observer
    this.watchFoot();

    //interval
    const interval = setInterval(() => {
      this.second--;
      if (this.second == -1) {
        clear();
      }
    }, 1000);

    const clear = () => {
      clearInterval(interval);
      this.okayDisbaled = false;
    };

    var t = this;
    Keyboard.addListener("keyboardDidShow", () => {
      t.foot = false;
    }).catch(() => { });

    Keyboard.addListener("keyboardDidHide", () => {
      if (this.$route.name == "Kategori") {
        t.foot = false;
      } else {
        t.foot = true;
      }
    }).catch(() => { });

    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
        window.onpopstate = function () {
          if (store.state.backCounter > 1) {
            store.dispatch("setCurrentFootbarValue");
            return;
          }
        };
      }
    });
    this.checkRoute();
  },
  mounted() {
    // setTimeout(() => {
    //   this.isMounted = false;
    // }, 2000);

    window.onpopstate = function () {
      if (store.state.backCounter > 1) {
        store.dispatch("setCurrentFootbarValue");
        return;
      }
    };
  },
  methods: {
    notFirstTime() {
      this.firstVisit = false;
      localStorage.setItem("firstVisited", "no");
    },
    checkRoute() {
      if (this.$route.name == "Kategori") {
        this.foot = false;
        return;
      }
      this.watchFoot();
      this.$store.state.hideKategori = true;
      this.$store.state.isSearch = false;
    },
    checkPopRoute() {
      if (this.$route.name != "Kategori") {
        // console.log("before: " + this.$store.state.backCounter)
        this.$store.state.backCounter++;
        // console.log("after: " + this.$store.state.backCounter);
        return;
      }
      this.$store.state.backCounter = 0;
      return;
    },
    watchFoot() {
      if (this.$vuetify.breakpoint.width > 960) {
        this.foot = false;
      } else {
        this.foot = true;
      }
    },
    async logout(isLogout) {
      if (!isLogout) {
        await firebase.auth().signOut();
        this.$router.replace({ name: "Home" });
        document.location.reload();
        console.log("sign out");
      }
    },
  },
  watch: {
    $route() {
      this.checkRoute();
      this.checkPopRoute();
    },
    "$vuetify.breakpoint.width": function () {
      this.watchFoot();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Amita&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: auto;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: #ededed;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  &:hover {
    background: #9c9adb;
  }
}

.title-login {
  font-family: "Amita" !important;
  font-size: 38px;
  font-weight: 200;
}
</style>
