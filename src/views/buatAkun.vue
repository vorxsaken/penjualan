<template>
  <div>
    <v-card elevation="0">
      <v-stepper elevation="0" v-model="el">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card elevation="0">
              <v-card-title class="pt-0 text-h5 d-flex justify-center">
                <span>Pilih Nama Pengguna</span>
              </v-card-title>
              <v-card-subtitle class="d-flex justify-center"><span>Disarankan menggunakan nama lengkap asli, digunakan
                  untuk
                  checkout dll.</span></v-card-subtitle>
              <v-card-text class="px-2">
                <v-text-field v-model="username" outlined flat placeholder="Nama Pengguna" hide-details="">
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="username.length < 5" @click="el = 2" block large color="primary">Lanjut</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card elevation="0">
              <v-card-title class="pt-0 text-h5 d-flex justify-center">
                <span>Masukkan Email</span>
              </v-card-title>
              <v-card-subtitle class="d-flex justify-center"><span>Masukkan email anda yang valid</span>
              </v-card-subtitle>
              <v-card-text class="px-2">
                <v-text-field v-model="email" outlined flat placeholder="Email" hide-details=""></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="email.length < 8" @click="el = 3" block large color="primary">Lanjut</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card elevation="0">
              <v-card-title class="pt-0 text-h5 d-flex justify-center">
                <span>Buat Password</span>
              </v-card-title>
              <v-card-subtitle class="d-flex justify-center"><span>Buat password minimal 8 huruf</span>
              </v-card-subtitle>
              <v-card-text class="px-2">
                <v-text-field v-model="password" type="password" outlined flat placeholder="Password" hide-details="">
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn :disabled="password.length < 8" @click="el = 4" block large color="primary">Lanjut</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card elevation="0">
              <v-card-title class="pt-0 text-h5 d-flex justify-center">
                <span>Pilih Foto Profil</span>
              </v-card-title>
              <v-card-subtitle class="d-flex justify-center"><span>usahakan menggunakan foto asli anda</span>
              </v-card-subtitle>
              <v-card-text class="px-2 d-flex justify-center">
                <v-avatar color="grey" size="130">
                  <v-img :src="previewProfil"></v-img>
                </v-avatar>
                <input @change="displayImage" type="file" ref="fotoProfil" style="display: none" />
              </v-card-text>
              <v-card-text class="d-flex justify-center">
                <v-btn text color="primary" @click="pilihGambar">pilih gambar</v-btn>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="buatAkun" :loading="loading" block large color="primary">Buat Akun</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <v-dialog persistent v-model="suksesBuatAkun" max-width="250">
      <v-card elevation="0" class="pb-4">
        <v-card-title class="d-flex justify-center">
          <v-icon color="success" size="90">mdi-account-check</v-icon>
        </v-card-title>
        <v-card-subtitle class="mt-2 text-body-1 font-weight-medium">
          <p class="text-center">
            Sukses Buat Akun, cek email anda untuk verifikasi agar bisa login
          </p>
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
          <v-btn @click="ok" block color="primary">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../plugins/firebaseInit.js";
import "firebase/storage";
export default {
  name: "PenjualanBuatakun",

  data() {
    return {
      el: 1,
      username: "",
      email: "",
      password: "",
      previewProfil: "",
      fotoProfil: null,
      loading: false,
      suksesBuatAkun: false,
    };
  },

  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  methods: {
    async ok() {
      await firebase.auth().signOut();
      this.$router.replace({ name: "Home" });
      document.location.reload();
    },
    pilihGambar() {
      this.$refs.fotoProfil.click();
    },
    displayImage(e) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      this.fotoProfil = file;
      this.previewProfil = url;
    },
    async docUser(profil) {
      //membuat akun user dengan email dan password
      console.log('111');
      const firebaseAuth = firebase.auth();
      await firebaseAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      ).then(async (user) => {
        // send email verification
        await user.user.sendEmailVerification();
        //membuat collection user
        const database = db.collection("client").doc(user.user.uid);
        await database.set({
          id: user.user.uid,
          username: this.username,
          email: this.email,
          enable: true,
          access: "user",
          avatar: profil,
        });
        this.loading = false;
        this.suksesBuatAkun = true;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
    },
    async buatAkun() {
      this.loading = true;
      //akan mengupload gambar jika ada, dan hanya membuat collection user jika tidak ada
      if (this.fotoProfil != null) {
        const file = this.fotoProfil;
        const storageRef = firebase.storage().ref();
        const storage = storageRef.child(`profilUser/${file.name}`);
        storage.put(file).on(
          "state_changed",
          (snapshot) => {
            const progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("upload: " + progress + "%");
          },
          (err) => {
            console.log(err.message);
          },
          async () => {
            const profilURL = await storage.getDownloadURL();
            this.docUser(profilURL);
          }
        );
      } else {
        this.docUser("noProfil");
      }
    },
  },
};
</script>
