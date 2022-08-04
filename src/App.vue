<template>
  <v-app style="user-select: none">
    <div
      v-if="isMounted"
      class="fill-height d-flex justify-center align-center"
    >
      <v-img
        src="@/assets/Circles-menu-3.gif"
        max-height="25"
        max-width="50"
      ></v-img>
    </div>
    <div v-else>
      <navbar />
      <v-main>
        <router-view></router-view>
      </v-main>
      <foot v-if="foot" />
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
    };
  },
  async created() {
    await this.$store.dispatch("getProduk");
    await this.$store.dispatch("getKeranjang");
    await this.$store.dispatch("getAlamat");
    await this.$store.dispatch("getFavorit");
    this.isMounted = false;
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });

    this.watchFoot();

    var t = this;
    Keyboard.addListener("keyboardDidShow", () => {
      t.foot = false;
    }).catch(() => {});
    Keyboard.addListener("keyboardDidHide", () => {
      if (this.$route.name == "Kategori") {
        t.foot = false;
      } else {
        t.foot = true;
      }
    }).catch(() => {});

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
    checkRoute() {
      if (this.$route.name == "Kategori") {
        this.foot = false;
        return;
      }
      this.watchFoot();
      this.$store.state.hideKategori = true;
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
    watchFoot(){
      if(this.$vuetify.breakpoint.width > 960){
        this.foot = false;
      }else {
        this.foot = true;
      }
    }
  },
  watch: {
    $route() {
      this.checkRoute();
      this.checkPopRoute();
    },
    "$vuetify.breakpoint.width": function(){
      this.watchFoot();
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar{
  width: 5px;
}
::-webkit-scrollbar-track{
  background: #ededed;
}

::-webkit-scrollbar-thumb{
  background: #b4b1fa;
  border-radius: 5px;

  &:hover{
    background: #9c9adb;
  }
}
</style>
