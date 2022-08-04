<template>
  <div
    :style="{
      height:
        this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
          ? this.$vuetify.breakpoint.height - 140 + 'px'
          : '',
    }"
    :class="
      this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        ? 'overflow-y-auto'
        : ''
    "
  >
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
              <span class="text-caption float-left"
                >Pesanan: {{ produkPesanan[0].created_at }}</span
              >
              <span class="text-caption font-weight-medium float-right">{{
                produkPesanan[0].status
              }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in produkPesanan[0].pesanan"
            :key="index"
          >
            <v-list-item-avatar tile size="90" color="grey">
              <v-img :src="item.src"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="mt-n6">
              <v-list-item-title
                class="text-body-2 font-weight-bold grey--text text--darken-3"
                >{{ item.namaProduk }}</v-list-item-title
              >
              <v-list-item-subtitle>
                <span class="text-caption black--text"
                  >x {{ item.jumlah }}</span
                >
              </v-list-item-subtitle>
              <span class="text-caption black--text"
                >Rp {{ formatedHarga(item.harga) }}</span
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-3">
            <v-list-item-title>
              <span class="float-left">Sub Total</span>
              <span class="float-right">Rp {{ formatedHarga(produkPesanan[0].subtotal)}}</span>
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
              <span class="float-right">Rp {{ formatedHarga(produkPesanan[0].total ) }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="d-flex justify-center" v-if="produkPesanan[0].status == 'belum bayar'">
        <v-btn color="primary" text large rounded>
          Proses Ke Pembayaran
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
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
      },
    };
  },
  created() {
    this.getDetailPesanan();
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
    getDetailPesanan() {
      this.produkPesanan = this.$store.state.pemesanan.filter((pesanan) => {
        return pesanan.pemesananId == this.$route.params.id;
      });
    },
    formatedHarga(nilai) {
      let harga = Intl.NumberFormat("de-DE").format(nilai);
      return harga;
    },
  },
};
</script>
