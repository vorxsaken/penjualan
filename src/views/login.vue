<template>
  <div>
    <!-- <v-main> -->
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="4">
          <v-card elevation="0" class="px-2 py-2">
            <v-card-title class="d-flex justify-center">
              <span style="user-select: none" class="title-login pb-4 grey--text text--darken-3">Login</span>
            </v-card-title>
            <v-list>
              <v-list-item v-if="isError" class="pt-0">
                <v-list-item-content class="py-0">
                  <div class="d-flex justify-center red--text pt-6 pb-2 text-subtitle-2 text-center">
                    {{ error }}
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="pb-4">
                    <v-text-field outlined v-model="email" type="email" flat placeholder="Email"
                      prepend-inner-icon="mdi-email" hide-details>
                    </v-text-field>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-text-field outlined flat v-model="password" :type="isSeen ? 'text' : 'password'"
                      placeholder="Password" prepend-inner-icon="mdi-lock"
                      :append-icon="isSeen ? 'mdi-eye' : 'mdi-eye-off'" hide-details @click:append="isSeen = !isSeen">
                    </v-text-field>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-center">
                    <v-btn color="primary" :loading="loading" @click="signIn" large block>Masuk</v-btn>
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-2">
                    <v-row>
                      <v-col cols="5">
                        <span class="text-caption mr-6">tidak punya akun ?</span>
                      </v-col>
                      <v-col cols="7">
                        <v-btn class="px-2" :to="{ name: 'buatAkun' }" dense x-small color="primary" text>Buat Akun
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-row>
                      <v-col cols="5">
                        <span class="text-caption mr-6">tentang aplikasi ini ?</span>
                      </v-col>
                      <v-col cols="7">
                        <v-btn class="px-2" :to="{name: 'about'}" dense x-small color="primary" text>Info
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-main> -->
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../plugins/firebaseInit";

export default {
  name: "PenjualanLogin",

  data() {
    return {
      isSeen: false,
      email: "",
      password: "",
      loading: false,
      error: "",
      isError: false,
    };
  },

  mounted() { },
  methods: {
    async signIn() {
      this.loading = true;
      const database = await db
        .collection("client")
        .where("email", "==", this.email)
        .get();
      const enable = database.docs.map((i) => i.data());
      if (enable.length > 0) {
        if (enable[0].enable) {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.loading = false;
              this.error = "";
              this.isError = false;
              this.$router.replace({ name: "Home" });
              document.location.reload();
            })
            .catch((err) => {
              this.loading = false;
              if (err.code == "auth/user-not-found") {
                this.error = "user tidak di temukan";
              } else if (err.code == "auth/wrong-password") {
                this.error = "password salah";
              } else {
                this.error = err.message;
              }
              console.log(err);
              this.isError = true;
              setTimeout(() => {
                this.isError = false;
              }, 10000);
            });
        } else {
          this.loading = false;
          this.isError = true;
          this.error =
            "Akun anda di nonaktifkan, harap hubungi admin untuk info lebih lanjut";
          setTimeout(() => {
            this.isError = false;
          }, 10000);
        }
      } else {
        this.loading = false;
        this.isError = true;
        this.error = "Akun Tidak Ditemukan";
        setTimeout(() => {
          this.isError = false;
        }, 10000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title-login {
  font-family: "Pacifico" !important;
  font-size: 62px;
  font-weight: 200;
}
</style>
