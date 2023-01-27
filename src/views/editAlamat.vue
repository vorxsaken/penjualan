<template>
  <div :style="{
    height:
      this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        ? this.$vuetify.breakpoint.height - 140 + 'px'
        : '',
  }" :class="
  this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    ? 'overflow-y-auto'
    : ''
">
    <v-dialog persistent v-model="isSukses" max-width="250">
      <v-card elevation="0" class="pb-4">
        <v-card-title class="d-flex justify-center">
          <v-icon color="success" size="90">mdi-check</v-icon>
        </v-card-title>
        <v-card-subtitle class="mt-2 text-body-1 font-weight-medium">
          <p class="text-center">
            Sukses Merubah Alamat
          </p>
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
          <v-btn @click="ok" block color="primary">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card elevation="0" class="pb-4">
      <v-card-title class="pb-0 font-weight-bold ml-4 text-h5">Edit Alamat</v-card-title>
      <v-card-subtitle class="text-caption mt-1 ml-4 pb-0">Disini kamu bisa edit alamat kamu</v-card-subtitle>
      <v-card-text class="py-0">
        <v-list two-line>
          <!-- <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="pb-2 text-subtitle-2 grey--text text--darken-2">Title Alamat</v-list-item-title>
              <v-list-item-subtitle>
                <div>
                  <v-text-field v-model="title" hide-details="auto" :rules="[(v) => !!v || 'title tidak boleh kosong']"
                    single-line flat outlined label="Title">
                  </v-text-field>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="pb-2 text-subtitle-2 grey--text text--darken-2">Provinsi</v-list-item-title>
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
              <v-list-item-title
                class="pb-2 text-subtitle-2 grey--text text--darken-2">Kabupaten/kota</v-list-item-title>
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
              <v-list-item-title class="pb-2 text-subtitle-2 grey--text text--darken-2">No.Telp</v-list-item-title>
                <div>
                  <v-text-field v-model="notelp" hide-details="auto"
                    :rules="[(v) => !!v || 'no telepon tidak boleh kosong']" single-line flat outlined type="number"
                    label="No telepon" hide-spin-buttons>
                  </v-text-field>
                </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="pb-2 text-subtitle-2 grey--text text--darken-2">Detail
                Alamat</v-list-item-title>
                <div>
                  <v-textarea hide-details="auto" v-model="detailAlamat" flat outlined single-line no-resize auto-grow
                    clearable label="detail alamat minimal 40 karakter" rows="4"
                    :rules="[(v) => !!v || 'detail alamat tidak boleh kosong']">
                  </v-textarea>
                </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn :disabled="isDisabled" @click="updateAlamat" :loading="isLoading" class="primary" width="310"
          height="50">Update Alamat</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import db from "../plugins/firebaseInit";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "PenjualanInputAlamat",

  data() {
    return {
      provinsi: [],
      kabupaten: [],
      notelp: "",
      detailAlamat: null,
      pilihProvinsi: "",
      pilihKabupaten: "",
      title: "",
      isDisabled: true,
      isLoading: false,
      isSukses: false
    };
  },
  created() {
    this.getProvinsi();
    this.loadData();
  },
  watch: {
    pilihProvinsi() {
      this.getKabupaten();
      this.validate();
    },
    title() {
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
  mounted() { },
  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  methods: {
    ok() {
      window.history.back();
    },
    async loadData() {
      // const database = await db
      //   .collection("alamat")
      //   .where("alamatId", "==", this.$route.params.id)
      //   .get();
      // const alamat = database.docs.map((doc) => doc.data());
      // this.title = alamat[0].title;
      this.pilihProvinsi = this.$store.state.provinsi;
      this.pilihKabupaten = this.$store.state.kabupaten;
      this.notelp = this.$store.state.telpon;
      this.detailAlamat = this.$store.state.detailAlamat;
    },
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
    async updateAlamat() {
      this.isLoading = true;
      const { uid } = firebase.auth().currentUser;
      const database = db.collection("client").doc(uid);
      var literal = this.kabupaten.filter((kab) => { return kab.city_id == this.pilihKabupaten });
      var data = {
          provinsi: this.pilihProvinsi,
          nama_provinsi: literal[0].province,
          kabupaten: this.pilihKabupaten,
          nama_kota: literal[0].city_name,
          telpon: this.notelp,
          detail_alamat: this.detailAlamat,
        }
      await database
        .update( data )
        .then(() => {
          console.log("alamat terupdate");
          this.$store.dispatch("updateAlamat", data);
          this.isLoading = false;
          this.isSukses = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>