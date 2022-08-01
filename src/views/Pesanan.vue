<template>
  <div
    :style="{ height: this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? this.$vuetify.breakpoint.height - 140 + 'px' : '' }"
    :class="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm ? 'overflow-y-auto' : ''"
  >
    <v-card elevation="0" class="pb-4">
      <v-card-title>
        <span class="text-h4 pl-4 grey--text text--darken-3 font-weight-bold"
          >Pesanan</span
        >
        <v-spacer></v-spacer>
        <v-menu offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
          </template>
          <v-list width="170">
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item link>
                <v-list-item-title>Diproses</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>Selesai</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text class="mb-n5" >
       <v-row dense>
        <v-col cols="12" lg="4" v-for="(items, index) in cards" :key="index">
           <produckList :order="items" />
        </v-col>
       </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import produckList from "../components/pesananList.vue";
export default {
  name: "PenjualanPesanan",
  components: {
    produckList,
  },
  data() {
    return {
      selectedItem: 0,
      cards: [
        {
          pesananId: 12345,
          title: "21 okt 2022, 14.45",
          total: 150000,
          status: "diproses",
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
        {
          pesananId: 12345,
          title: "21 okt 2022, 14.45",
          total: 150000,
          status: "Telah dikirim",
          produkPesanan: [
            {
              produkId: 1234,
              namaProduk: "produk #3",
              jumlah: 1,
              produkTotal: 75000,
              src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fmod.jpg?alt=media&token=8e8ba7a1-a5dc-4b0c-92ea-ec55203eb0a7",
            },
            {
              produkId: 5678,
              namaProduk: "produk #4",
              jumlah: 1,
              produkTotal: 75000,
              src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fpod.jpg?alt=media&token=f3de89d1-4657-4077-b53e-03fd0fdc373f",
            },
          ],
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>
