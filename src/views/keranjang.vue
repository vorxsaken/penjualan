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
    <div v-if="showKeranjang" class="d-flex flex-column justify-center fill-height align-center">
      <v-icon size="80">mdi-delete-empty</v-icon>
      <h4 class="" style="font-weight: 300">Keranjang Kosong :(</h4>
    </div>
    <v-card v-else elevation="0" :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 
    '' : 
    'px-12'"
    >
      <v-card-title class="font-weight-bold text-body-1 ml-4">Keranjang</v-card-title>
      <v-card-text style="max-height: 360px" class="overflow-y-auto pt-4">
        <v-skeleton-loader v-if="isKeranjang" class="mx-auto" max-width="320" type="list-item-avatar-three-line">
        </v-skeleton-loader>
        <v-list dense v-else>
          <v-list-item v-for="(list, index) in keranjang" :key="index" style="
              box-shadow: 0px 0px 15 px -5px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            " class="mb-2">
            <v-list-item-avatar size="80" rounded="" color="grey">
              <v-img :src="list.src"> </v-img>
            </v-list-item-avatar>
            <v-list-item-content class="pt-0 mt-n6">
              <v-list-item-title class="text-body-1 font-weight-bold">{{
                  list.title
              }}</v-list-item-title>
              <v-list-item-subtitle>Rp
                {{ formatHarga(list.harga, list.jumlah) }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn small icon :disabled="disabledButton">
                <v-icon class="black--text font-weight-bold" @click="add(index, list.keranjangId)" small>mdi-plus
                </v-icon>
              </v-btn>
              <v-btn small text icon>{{ list.jumlah }}</v-btn>
              <v-btn small icon :disabled="disabledButton">
                <v-icon @click="kurangi(index, list.keranjangId)" class="black--text font-weight-bold" small>mdi-minus
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text>
        <v-card-title class="text-body-2 font-weight-bold black--text">
          Pilih Alamatmu & Pilih Kurir
        </v-card-title>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-select v-model="pilihAlamat" hide-details="auto" single-line outlined flat :items="userAlamat"
                item-text="title" item-value="alamatId" label="pilih alamat mu" :messages="detailAlamat">
              </v-select>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="pilihProvinsi"
                hide-details="auto"
                single-line
                outlined
                flat
                :items="provinsi"
                item-text="province"
                item-value="province_id"
                label="Provinsi"
              >
              </v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="showKota">
            <v-list-item-content>
              <v-select
                v-model="pilihKota"
                hide-details="auto"
                single-line
                outlined
                flat
                :rules="[(v) => !!v || 'kota tidak boleh kosong']"
                :items="kota"
                item-text="city_name"
                item-value="city_id"
                label="Kota"
              >
              </v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="showAlamatLengkap">
            <v-list-item-content>
              <v-text-field
                v-model="noTelp"
                single-line
                outlined
                type="number"
                flat
                :rules="[(v) => !!v || 'tidak boleh kosong']"
                hide-spin-buttons
                hide-details="auto"
                label="No Telp (yang bisa dihubungi)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="showAlamatLengkap">
            <v-list-item-content>
              <v-textarea
                v-model="alamatLengkap"
                single-line
                outlined
                flat
                :rules="[(v) => !!v || 'Alamat tidak boleh kosong']"
                rows="4"
                no-resize
                hide-details="auto"
                label="Alamat Lengkap"
              ></v-textarea>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item v-if="showAlamatLengkap">
            <v-list-item-content>
              <v-select v-model="pilihKurir" hide-details="auto" single-line outlined flat
                :rules="[(v) => !!v || 'kurir tidak boleh kosong']" :items="kurir" item-text="title" item-value="value"
                label="Kurir">
              </v-select>
              <v-list-item-subtitle>
                <span class="text-caption grey--text text--darken-1">
                  <span class="red--text">*</span> tidak bisa menambah produk
                  sesudah memilih kurir
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="showServis">
            <v-list-item-content>
              <v-select v-model="pilihServis" hide-details="auto" single-line outlined flat
                :rules="[(v) => !!v || 'servis tidak boleh kosong']" :items="servis" item-text="servis"
                item-value="ongkir" label="servis">
              </v-select>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text>
        <span class="text-body-2 font-weight-bold black--text ml-4">Metode pembayaran</span>
        <v-expansion-panels flat accordion class="mt-4">
          <v-expansion-panel v-for="(item, index) in pembayaran" :key="index">
            <v-expansion-panel-header class="px-4">{{
                item.title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-radio-group v-model="pilihanPembayaran">
                <v-radio v-for="(bayar, i) in item.pilihan" :key="i" :value="bayar.title">
                  <template v-slot:label>
                    <v-avatar size="80" tile class="mr-2">
                      <v-img :alt="bayar.title" contain :src="getImage(bayar.img)" ></v-img>
                    </v-avatar>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-text>
        <v-card-title class="black--text">
          <span class="text-body-2 font-weight-bold">Sub Total</span>
          <v-spacer></v-spacer>
          <span class="text-body-1 font-weight-bold">Rp {{ formatHarga(getSubTotal, 1) }}</span>
        </v-card-title>
        <v-card-title class="black--text">
          <span class="text-body-2 font-weight-bold">Ongkir</span>
          <v-spacer></v-spacer>
          <span class="text-body-1 font-weight-bold">Rp {{ this.formatHarga(this.ongkir, 1) }}</span>
        </v-card-title>
        <v-card-title class="black--text">
          <span class="text-body-2 font-weight-bold">Total</span>
          <v-spacer></v-spacer>
          <span class="text-body-1 font-weight-bold">Rp {{ formatHarga(total, 1) }}</span>
        </v-card-title>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn width="300" rounded color="grey darken-4" class="white--text" x-large>Proses Ke Pemesanan</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import db from "../plugins/firebaseInit.js";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "PenjualanKeranjang",

  data() {
    return {
      disabledButton: false,
      ongkir: 0,
      showKeranjang: null,
      isKeranjang: true,
      keranjang: [],
      subTotal: null,
      pilihanPembayaran: "",
      provinsi: [],
      provinsiId: [],
      kota: [],
      servis: [],
      showKota: false,
      showAlamatLengkap: false,
      showServis: false,
      alamatLengkap: "",
      pilihProvinsi: "",
      pilihKota: "",
      pilihKurir: "",
      pilihServis: 0,
      noTelp: "",
      userAlamat: [],
      pilihAlamat: "",
      detailAlamat: "",
      kurir: [
        {
          title: "Jalur Nugraha Ekakurir (JNE)",
          value: "jne",
        },
        {
          title: "POS Indonesia (POS)",
          value: "pos",
        },
        {
          title: "Citra Van Titipan Kilat (TIKI)",
          value: "tiki",
        },
      ],
      pembayaran: [
        {
          title: "Virtual Banking",
          pilihan: [
            {
              title: "Bri",
              img: "bri",
            },
            {
              title: "Bni",
              img: "bni",
            },
            {
              title: "Bca",
              img: "bca",
            },
            {
              title: "Mandiri",
              img: "mandiri",
            },
            {
              title: "Bsi syariah",
              img: "bsi",
            },
          ],
        },
        {
          title: "E wallet",
          pilihan: [
            {
              title: "Ovo",
              img: "ovo",
            },
            {
              title: "Dana",
              img: "dana",
            },
            {
              title: "GoPay",
              img: "gopay",
            },
          ],
        },
        {
          title: "QR Code",
          pilihan: [
            {
              title: "QRcode",
              img: "qrcode",
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.getProvinsi();
    this.showCart();
  },
  watch: {
    pilihKota() {
      this.showAlamatLengkap = true;
    },
    pilihKurir() {
      this.getCost();
      this.disabledButton = true;
    },
    pilihServis() {
      this.ongkir = this.pilihServis;
    },
    pilihAlamat() {
      this.filterUserAlamat();
    },
  },
  created() {
    this.getKeranjang();
    this.getAlamat();
  },
  computed: {
    getSubTotal() {
      var t = 0;
      for (const c of this.keranjang) {
        var y = c.harga * c.jumlah;
        t += y;
      }
      return t;
    },
    getWeight() {
      var t = 0;
      for (const c of this.keranjang) {
        var y = 198 * c.jumlah;
        t += y;
      }
      return t;
    },
    total() {
      const totl = this.getSubTotal + this.pilihServis;
      return totl;
    },
  },
  methods: {
    filterUserAlamat() {
      this.pilihProvinsi = "";
      this.pilihKota = "";
      this.pilihKurir = "";
      this.pilihServis = "";
      let currentAlamat = this.userAlamat.filter((curr) => {
        return curr.alamatId == this.pilihAlamat;
      });
      this.pilihProvinsi = currentAlamat[0].provinsi;
      this.pilihKota = currentAlamat[0].kabupaten;
      this.detailAlamat =
        currentAlamat[0].telp + ", " + currentAlamat[0].detailAlamat;
    },
    async getAlamat() {
      const database = await db
        .collection("alamat")
        .where("userId", "==", firebase.auth().currentUser.uid)
        .get();
      const alamat = database.docs.map((doc) => doc.data());
      for (const x of alamat) {
        this.userAlamat.push(x);
      }
    },
    getImage(i){
      var images = require.context('../assets', false, /\.png$/);
      return images('./' + i + ".png");
    },
    getCost() {
      this.servis = [];
      this.pilihServis = "";
      axios
        .get(
          `http://localhost:3001/user/getCost/209/${this.pilihKota}/${this.getWeight}/${this.pilihKurir}`
        )
        .then((res) => {
          var servis = res.data.rajaongkir.results[0].costs;
          servis.forEach((s) => {
            let ss = {
              servis: s.service + " (" + s.cost[0].etd + ")",
              ongkir: s.cost[0].value,
            };
            this.servis.push(ss);
          });
          this.showServis = true;
        })
        .catch(() => { });
    },
    showCart() {
      if (this.$store.state.keranjang.length < 1) {
        this.showKeranjang = true;
        return;
      }
      this.showKeranjang = false;
      return;
    },
    getProvinsi() {
      this.provinsi = [];
      axios.get("http://localhost:3001/user/getProvinsi").then((res) => {
        res.data.rajaongkir.results.forEach((i) => {
          this.provinsi.push(i);
        });
      });
    },
    getKota() {
      this.kota = [];
      this.pilihServis = "";
      axios
        .get(`http://localhost:3001/user/getKota/${this.pilihProvinsi}`)
        .then((res) => {
          res.data.rajaongkir.results.forEach((i) => {
            this.kota.push(i);
          });
        });
    },
    async add(index, id) {
      var curr = this.keranjang[index].jumlah;
      this.keranjang[index].jumlah++;
      this.$store.state.keranjang[index].jumlah = this.keranjang[index].jumlah;
      const database = db.collection("keranjang").doc(id);
      await database.update({
        jumlah: curr + 1,
      });
    },
    async kurangi(index, id) {
      var curr = this.keranjang[index].jumlah;
      this.keranjang[index].jumlah--;
      this.$store.state.keranjang[index].jumlah = this.keranjang[index].jumlah;
      const database = db.collection("keranjang").doc(id);
      await database.update({
        jumlah: curr - 1,
      });
      if (this.keranjang[index].jumlah < 1) {
        await database.delete().then(() => {
          this.keranjang.splice(index, 1);
          this.$store.commit("filterKeranjang", index);
          if (this.keranjang.length < 1) {
            this.showKeranjang = true;
          }
        });
      }
    },
    formatHarga(harga, jumlah) {
      const tot = harga * jumlah;
      const har = Intl.NumberFormat("de-DE").format(tot);
      return har;
    },
    async getKeranjang() {
      await this.$store.state.keranjang.forEach(async (doc) => {
        const database = db.collection("produk").doc(doc.produkId);
        const dbRef = await database.get();
        const gambar = await db
          .collection("produk/" + doc.produkId + "/gambar")
          .get();
        const pref = [];
        gambar.forEach((col) => {
          const sr = {
            src: col.data().src,
          };
          pref.push(sr);
        });
        const data = {
          keranjangId: doc.keranjangId,
          title: dbRef.data().title,
          harga: dbRef.data().harga,
          jumlah: doc.jumlah,
          src: pref[0],
        };
        this.keranjang.push(data);
      });
      setTimeout(() => {
        this.isKeranjang = false;
      }, 1000);
    },
  },

  async beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    // await this.$store.dispatch("getKeranjang");
    return;
  },
};
</script>
