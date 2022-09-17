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
    <v-card elevation="0">
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
      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn @click="proses_ke_pembayaran" :loading="loading_proses_pembayaran" class="px-8" color="primary" large rounded outlined 
        v-if="produkPesanan[0].status == 'belum bayar'">
          <v-icon class="mr-2">mdi-cash</v-icon> Proses Ke Pembayaran
        </v-btn>
        <v-btn :loading="loadingDiterima" class="px-8" color="success" @click="diterima(produkPesanan[0].pemesananId)"
         large rounded outlined v-else-if="produkPesanan[0].status == 'shipped'">
          <v-icon class="mr-2">mdi-check-circle</v-icon> telah di terima
        </v-btn>
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
          <v-btn color="error" outlined @click="pemesananKembali">Kembali</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { changeAt } from '../composes/edit';
import axios from 'axios';

export default {
  name: "PenjualanDetailpesanan",

  data() {
    return {
      order: {
        pesananId: 12345,
        title: "21 okt 2022, 14.45",
        total: 150000,
        status: "Telah Dikirim",
        produkPesanan: [],
        redirectPayment: false,
        linkBayar: null,
        loading_proses_pembayaran: false
      },
      loadingDiterima: false
    };
  },
  created() {
    if(this.$route.params.data == 'riwayatPesanan'){
      this.getDetailRiwayatPesanan();
    }else {
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
      window.open(this.linkBayar, "Bayar", "width=700, height=700");
    },
    proses_ke_pembayaran() {
      this.loading_proses_pembayaran = true;
      axios.post('http://localhost:3001/user/create_ewallet_charge', {
        id: this.pemesananId,
        total: this.total,
        metode: this.pilihanPembayaran
      }).then((result) => {
        this.loading_proses_pembayaran = false;
        setTimeout(() => {
          this.redirectPayment = true;
          this.linkBayar = result.data.actions.desktop_web_checkout_url;
          console.log(this.linkBayar);
          console.log(JSON.stringify(result));
        }, 200)
      }).catch((err) => {
        console.log('err', err);
        this.loading_proses_pembayaran = false;
      })
    },
    diterima(id){
      this.loadingDiterima = true;
      changeAt('pemesanan', id, {status: 'diterima'}).then(() => {
        this.loadingDiterima = false;
        this.$store.commit('filterPemesanan', id);
        this.$router.replace({name: 'Pesanan'})
      }).catch((err) => {
        console.log(err);
      })
    },
    getDetailPesanan() {
      this.produkPesanan = this.$store.state.pemesanan.filter((pesanan) => {
        return pesanan.pemesananId == this.$route.params.id;
      });
    },
    getDetailRiwayatPesanan(){
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
