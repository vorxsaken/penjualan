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
          <!-- users input their address -->
          <v-stepper-content step="4">
            <v-card elevation="0">
              <v-card-title class="pt-0 text-subtitle-1 d-flex justify-center">
                <span>Tambahkan Alamat</span>
              </v-card-title>
              <v-card-subtitle class="d-flex justify-center">
                <span>langkah ini wajib untuk ke tahap selanjutnya</span>
              </v-card-subtitle>
              <v-card-text class="px-2">
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        class="mb-2 text-subtitle-2 grey--text text--darken-2">Provinsi</v-list-item-title>
                      <div>
                        <v-select v-model="pilihProvinsi" hide-details="auto" flat outlined single-line
                          :rules="[(v) => !!v || 'provinsi tidak boleh kosong']" label="Provinsi" :items="provinsi"
                          item-text="province" item-value="province_id">
                        </v-select>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="mb-2 text-subtitle-2 grey--text text--darken-2">Kabupaten/kota
                      </v-list-item-title>
                      <div>
                        <v-select v-model="pilihKabupaten" hide-details="auto" flat outlined single-line
                          :rules="[(v) => !!v || 'kota tidak boleh kosong']" label="Kabupaten/kota" :items="kabupaten"
                          item-text="city_name" item-value="city_id">
                        </v-select>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        class="mb-2 text-subtitle-2 grey--text text--darken-2">No.Telp</v-list-item-title>
                      <div>
                        <v-text-field v-model="notelp" hide-details="auto"
                          :rules="[(v) => !!v || 'no telepon tidak boleh kosong']" single-line flat outlined
                          type="number" label="No telepon" hide-spin-buttons>
                        </v-text-field>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="mb-2 text-subtitle-2 grey--text text--darken-2">Detail Alamat
                      </v-list-item-title>
                      <div>
                        <v-textarea hide-details="auto" v-model="detailAlamat" flat outlined single-line no-resize
                          auto-grow clearable label="detail alamat minimal 40 karakter" rows="4"
                          :rules="[(v) => !!v || 'detail alamat tidak boleh kosong']">
                        </v-textarea>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn :disabled="isDisabled" @click="el = 5" class="primary" width="210"
                  height="50">Selanjutnya</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="5">
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
import axios from "axios";

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
      provinsi: [],
      kabupaten: [],
      pilihProvinsi: '',
      pilihKabupaten: '',
      notelp: '',
      detailAlamat: '',
      isDisabled: true
    };
  },

  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  created() {
    this.getProvinsi();
  },
  watch: {
    pilihProvinsi() {
      this.getKabupaten();
      this.validate();
    },
    pilihKabupaten() {
      this.validate();
    },
    notelp() {
      this.validate();
    },
    detailAlamat() {
      this.validate();
    },
  },
  methods: {
    getProvinsi() {
      this.provinsi = [];
      axios.get("https://thisisezabackend.vercel.app/user/getProvinsi").then((res) => {
        res.data.rajaongkir.results.forEach((i) => {
          this.provinsi.push(i);
        });
      });
    },
    getKabupaten() {
      this.kabupaten = [];
      axios
        .get(`https://thisisezabackend.vercel.app/user/getKota/${this.pilihProvinsi}`)
        .then((res) => {
          res.data.rajaongkir.results.forEach((i) => {
            this.kabupaten.push(i);
          });
        });
    },
    validate() {
      if (
        this.pilihProvinsi.length != 0 &&
        this.pilihKabupaten.length != 0 &&
        this.notelp.length != 0 &&
        this.detailAlamat != null &&
        this.detailAlamat.length > 40
      ) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
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
        var getCityNameAndProvinceName = this.kabupaten.filter(kab => kab.city_id == this.pilihKabupaten);
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
          provinsi: this.pilihProvinsi,
          nama_provinsi: getCityNameAndProvinceName[0].province,
          kabupaten: this.pilihKabupaten,
          nama_kota: getCityNameAndProvinceName[0].city_name,
          telpon: this.notelp,
          detail_alamat: this.detailAlamat
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
