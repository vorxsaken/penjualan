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
    <v-card elevation="0" :key="key">
      <v-card-text class="py-0">
        <v-card-title class="font-weight-medium text-h5 black--text">
          Alamat pengiriman
        </v-card-title>
        <v-card-text class="pb-1">
          <div class="font-weight-medium grey--text text--darken-4">
            {{ produkPesanan[0].namaPemesan }}
          </div>
          {{
              produkPesanan[0].alamatLengkap +
              ". " +
              produkPesanan[0].kotaTujuan +
              ", " +
              produkPesanan[0].provinsiTujuan
          }}
        </v-card-text>
        <v-card-title class="pb-0 text-body-2 font-weight-medium black--text">
          <span>Pembayaran:</span>
          <v-spacer></v-spacer>
          <span>{{ produkPesanan[0].metodePembayaran }} ( {{ produkPesanan[0].pembayaran }} )</span>
        </v-card-title>
        <v-card-title class="pt-2 text-body-2 font-weight-medium black--text">
          <span>Kurir:</span>
          <v-spacer></v-spacer>
          <span>{{ produkPesanan[0].jasaKurir }}</span>
        </v-card-title>
        <v-card-title class="mt-n6 0 text-body-2 font-weight-medium black--text">
          <span>Estimasi Sampai:</span>
          <v-spacer></v-spacer>
          <span>{{ produkPesanan[0].estimasiSampai }} Hari</span>
        </v-card-title>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <span class="text-caption float-left">Pesanan: {{ produkPesanan[0].created_at }}</span>
              <span class="text-caption font-weight-medium float-right">{{
                  produkPesanan[0].status
              }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-for="(item, index) in produkPesanan[0].pesanan" :key="index">
            <v-list-item-avatar tile size="90" color="grey">
              <v-img :src="item.src"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="mt-n6">
              <v-list-item-title class="text-body-2 font-weight-bold grey--text text--darken-3">{{ item.namaProduk }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class="text-caption black--text">x {{ item.jumlah }}</span>
              </v-list-item-subtitle>
              <span class="text-caption black--text">Rp {{ formatedHarga(item.harga) }}</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-3">
            <v-list-item-title>
              <span class="float-left">Sub Total</span>
              <span class="float-right">Rp {{ formatedHarga(produkPesanan[0].subtotal) }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="float-left">Ongkir</span>
              <span class="float-right">Rp {{ formatedHarga(produkPesanan[0].ongkir) }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="float-left">Total</span>
              <span class="float-right">Rp {{ formatedHarga(produkPesanan[0].total) }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-if="produkPesanan[0].status == 'declined'"
        class="d-flex justify-center text-subtitle-1 font-weight-bold red--text">
        Pesanan Kamu ditolak !!
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn @click="proses_ke_pembayaran" :loading="loading_proses_pembayaran" class="px-8" color="primary" large
          rounded outlined v-if="produkPesanan[0].status == 'belum bayar'">
          <v-icon class="mr-2">mdi-cash</v-icon> Proses Ke Pembayaran
        </v-btn>
        <v-btn @click="ditolak(produkPesanan[0].pemesananId)" :loading="loadingDiterima" class="px-8" color="primary"
          large rounded outlined v-if="produkPesanan[0].status == 'declined'">
          <v-icon class="mr-2">mdi-delete</v-icon> Hapus Pesanan
        </v-btn>
        <v-btn :loading="loadingDiterima" class="px-8" color="success" @click="diterima(produkPesanan[0].pemesananId)"
          large rounded outlined v-else-if="produkPesanan[0].status == 'shipped'">
          <v-icon class="mr-2">mdi-check-circle</v-icon> telah di terima
        </v-btn>
        <div v-else-if="produkPesanan[0].status == 'Pending'">
          <v-btn v-if="produkPesanan[0].metodePembayaran == 'Virtual Banking'" class="px-8" color="success"
            @click="toggle_panduan = true" large rounded outlined>
            <v-icon class="mr-2">mdi-book-open</v-icon> Panduan Pembayaran
          </v-btn>
          <v-btn v-else-if="produkPesanan[0].metodePembayaran == 'E wallet'" class="px-8" color="success"
            @click="proses_ke_bayar" large rounded outlined>
            <v-icon class="mr-2">mdi-cash</v-icon> Bayar
          </v-btn>
          <v-btn v-else-if="produkPesanan[0].metodePembayaran == 'QR Code'" class="px-8" color="success"
            @click="scanQrcode" large rounded outlined>
            <v-icon class="mr-2">mdi-qrcode</v-icon> Qrcode Untuk Bayar
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <!-- proses ke bayar -->
    <v-dialog v-model="redirectPayment" width="350" persistent>
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center mb-4">
          <v-icon size="100" color="success">mdi-check-circle</v-icon>
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center text-center">
          pemrosesan berhasil, klik tombol bayar dibawah untuk pembayaran
        </v-card-subtitle>
        <v-card-actions class="d-flex justify-center pb-8">
          <v-btn color="primary" @click="proses_ke_bayar" class="px-4" outlined>Bayar</v-btn>
          <v-btn color="error" outlined @click="redirectPayment">Kembali</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show qrcode -->
    <v-dialog v-model="qrcode" width="400" persistant>
      <v-card elevation="0">
        <div class="d-flex justify-center text-center text-subtitle-1 font-weight-bold py-4 px-4">
          Scan Qr code dibawah untuk pembayaran
        </div>
        <v-card-text class="d-flex justify-center">
          <canvas id="qrcode"></canvas>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-4">
          <v-btn outlined @click="qrcode = false" color="error">Kembali</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- panduan pembayaran -->
    <panduanPembayaran :show="toggle_panduan" :vbn="produkPesanan[0].virtual_number"
      @kembali="toggle_panduan = false" />
  </div>
</template>

<script>
import { changeAt } from '../composes/edit';
import { remove } from '../composes/delete';
import axios from 'axios';
import panduanPembayaran from "../components/dialogPanduan.vue";
import db from '../plugins/firebaseInit'
import QRCode from "qrcode";

export default {
  name: "PenjualanDetailpesanan",
  components: {
    panduanPembayaran,
  },
  data() {
    return {
      qrcode: false,
      qrstring: 'this is null',
      order: {
        pesananId: 12345,
        title: "21 okt 2022, 14.45",
        total: 150000,
        status: "Telah Dikirim",
      },
      produkPesanan: [],
      redirectPayment: false,
      linkBayar: null,
      loading_proses_pembayaran: false,
      toggle_panduan: false,
      loadingDiterima: false,
      key: 0,
    };
  },
  created() {
    if (this.$route.params.data == 'riwayatPesanan') {
      this.getDetailRiwayatPesanan();
    } else {
      this.getDetailPesanan();
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  methods: {
    proses_ke_bayar() {
      window.open(this.produkPesanan[0].linkBayar, "Bayar");
    },
    proses_ke_pembayaran() {
      this.loading_proses_pembayaran = true;
      if (this.produkPesanan[0].metodePembayaran == 'Virtual Banking') {
        axios.post('https://insearchingofeza.herokuapp.com/user/create_virtual_banking_charge', {
          id: this.produkPesanan[0].pemesananId,
          bank_code: this.produkPesanan[0].pembayaran,
          name: this.$store.state.userName
        }).then((result) => {
          const database = db.collection("pemesanan").doc(this.produkPesanan[0].pemesananId);
          database.update({ status: 'Pending', virtual_number: result.data.account_number }).then(async () => {
            this.$store.commit("filterPemesanan", this.produkPesanan[0].pemesananId);
            await this.$store.dispatch("getPemesanan");
            this.produkPesanan = [];
            this.getDetailPesanan();
            this.key++;
          }).catch((err) => {
            console.log(err);
          })

        }).catch((err) => {
          console.log(err)
        })
      } else if (this.produkPesanan[0].metodePembayaran == 'E wallet') {
        axios.post('https://insearchingofeza.herokuapp.com/user/create_ewallet_charge', {
          id: this.produkPesanan[0].pemesananId,
          total: this.produkPesanan[0].total,
          metode: this.produkPesanan[0].pembayaran
        }).then((result) => {
          const database = db.collection('pemesanan').doc(this.produkPesanan[0].pemesananId);
          database.update({ status: 'Pending', linkBayar: result.data.actions.mobile_web_checkout_url }).then(async () => {
            this.$store.commit('filterPemesanan', this.produkPesanan[0].pemesananId);
            await this.$store.dispatch("getPemesanan");
            this.produkPesanan = [];
            this.getDetailPesanan();
            this.key++
          })
        }).catch((err) => {
          console.log('err', err);
          this.loading_proses_pembayaran = false;
        })
      } else if (this.produkPesanan[0].metodePembayaran == 'QR Code') {
        axios.post('https://insearchingofeza.herokuapp.com/user/create_qrcode', {
          id: this.produkPesanan[0].pemesananId,
          total: this.produkPesanan[0].total
        }).then((result) => {
          const database = db.collection('pemesanan').doc(this.produkPesanan[0].pemesananId);
          console.log(result.data);
          database.update({ status: 'Pending', qr_string: result.data.qr_string }).then(async () => {
            this.$store.commit('filterPemesanan', this.produkPesanan[0].pemesananId);
            await this.$store.dispatch("getPemesanan");
            this.produkPesanan = [];
            this.getDetailPesanan();
            this.key++
          }).catch((err) => {
            console.log('err', err);
            this.loading_proses_pembayaran = false;
          })
        })
      }
    },
    scanQrcode() {
      // this.qrstring = this.produkPesanan[0].qr_string;
      this.qrcode = true;
      setTimeout(() => {
        QRCode.toCanvas(document.getElementById("qrcode"), this.produkPesanan[0].qr_string, {
          width: 300
        }, (error) => {
          if (error) console.log(error);
        })
      }, 300)

    },
    onQrCodeChange(qrstring) {
      this.qrstring = qrstring
    },
    diterima(id) {
      this.loadingDiterima = true;
      changeAt('pemesanan', id, { status: 'diterima' }).then(() => {
        this.loadingDiterima = false;
        this.$store.commit('filterPemesanan', id);
        this.$router.replace({ name: 'Pesanan' })
      }).catch((err) => {
        console.log(err);
      })
    },
    ditolak(id) {
      this.loadingDiterima = true;
      remove("pemesanan", id).then(() => {
        this.loadingDiterima = false;
        this.$store.commit('filterPemesanan', id);
        this.$router.replace({ name: 'Pesanan' })
      }).catch((err) => {
        console.log(err);
      })
    },
    getDetailPesanan() {
      this.produkPesanan = this.$store.state.pemesanan.filter((pesanan) => {
        return pesanan.pemesananId == this.$route.params.id;
      });
    },
    getDetailRiwayatPesanan() {
      this.produkPesanan = this.$store.state.riwayatPesanan.filter((riwayat) => {
        return riwayat.pemesananId == this.$route.params.id
      })
    },
    formatedHarga(nilai) {
      let harga = Intl.NumberFormat("de-DE").format(nilai);
      return harga;
    },
  },
};
</script>
