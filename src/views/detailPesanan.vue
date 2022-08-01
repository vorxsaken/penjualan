<template>
  <div
    :style="{ height: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? this.$vuetify.breakpoint.height - 140 + 'px' : '' }"
    :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'overflow-y-auto' : ''"
  >
    <v-card elevation="0">
      <v-card-text class="py-0">
        <v-card-title class="font-weight-medium text-h5 black--text">
          Alamat pengiriman
        </v-card-title>
        <v-card-text class="pb-1">
          <div class="font-weight-medium grey--text text--darken-4">
            Moh Basyarudin Alfahmi
          </div>
          (+62) 88226356473 Kost Bu Yani ngemplak, Rt 04, Rw 08, No 33, Kel,
          Mlati Krajan, Sendangadi, Kec. Mlati, Kabupaten Sleman, Daerah
          Istimewa Yogyakarta 55285, KAB. SLEMAN, MLATI, DI YOGYAKARTA, ID,
          55284
        </v-card-text>
        <v-card-title class="pb-0 text-body-2 font-weight-medium black--text">
          <span>Pembayaran:</span>
          <v-spacer></v-spacer>
          <span>E Wallet ( Dana )</span>
        </v-card-title>
        <v-card-title class="pt-2 text-body-2 font-weight-medium black--text">
          <span>Kurir:</span>
          <v-spacer></v-spacer>
          <span>Regular JNE Express</span>
        </v-card-title>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <span class="text-caption float-left"
                >Pesanan: {{ order.title }}</span
              >
              <span class="text-caption font-weight-medium float-right">{{
                order.status
              }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in order.produkPesanan"
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
                >Rp {{ formatedHarga(item.produkTotal) }}</span
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-3">
            <v-list-item-title>
              <span class="float-left">Sub Total</span>
              <span class="float-right">Rp 150.000</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="float-left">Ongkir</span>
              <span class="float-right">Rp 7.000</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="float-left">Total</span>
              <span class="float-right">Rp 157.000</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
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
        produkPesanan: [
          {
            produkId: 1234,
            namaProduk: "produk #1",
            jumlah: 1,
            produkTotal: 75000,
            src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fmod.jpg?alt=media&token=8e8ba7a1-a5dc-4b0c-92ea-ec55203eb0a7",
          },
          {
            produkId: 5678,
            namaProduk: "produk #2",
            jumlah: 1,
            produkTotal: 75000,
            src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fpod.jpg?alt=media&token=f3de89d1-4657-4077-b53e-03fd0fdc373f",
          },
        ],
      },
    };
  },
  created() {},
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
    formatedHarga(nilai) {
      let harga = Intl.NumberFormat("de-DE").format(nilai);
      return harga;
    },
  },
};
</script>
