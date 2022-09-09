<template>
  <v-app style="user-select: none">
    <div v-if="isMounted" class="fill-height d-flex justify-center align-center">
      <v-img src="@/assets/Circles-menu-3.gif" max-height="25" max-width="50"></v-img>
    </div>
    <div v-else>
      <navbar />
      <v-main>
        <router-view></router-view>
      </v-main>
      <foot v-if="foot" />
      <v-dialog width="400" v-model="firstVisit" persistent>
        <v-card elevation="0" class="pb-6 pt-2">
          <v-card-title class="d-flex justify-center pb-8 font-weight-bold">Note</v-card-title>
          <v-card-subtitle class="d-flex justify-center">
            <v-img :src="require('./assets/cuteCat.webp')"></v-img>
          </v-card-subtitle>
          <v-card-text class="d-flex justify-center">
            <span class="text-subtitle-2 blue-grey--text text-center text--darken-1 
            font-weight-medium">
              Aplikasi ini masih dalam pengembangan. <br />
              <span class="font-weight-bold">Tech Stack</span> : <br />
              <div class="mt-3">
                <v-icon color="yellow darken-1" class="mr-2">mdi-firebase</v-icon>
                <v-icon class="mr-2">$vuetify.icons.express</v-icon>
                <v-icon color="green darken-1" class="mr-2">mdi-vuejs</v-icon>
                <v-icon color="green darken-4" class="mr-2">mdi-nodejs</v-icon>
              </div>
            </span>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn outlined color="primary" rounded class="py-4 px-8" @click="notFirstTime" 
            :disabled="okayDisbaled">
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
      firstVisit: true,
      second: 10,
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
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
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
    }, 500);

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
</style>
