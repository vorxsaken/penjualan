<template>
  <div>
    <v-card elevation="0" outlined>
      <v-list-item class="grey lighten-4">
        <v-list-item-title>
          <span class="text-caption float-left">Pesanan: {{ order.title }}</span>
          <span class="text-caption font-weight-bold float-right">{{ order.status }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="(item, index) in order.produkPesanan" :key="index">
        <v-list-item-avatar tile size="90" color="grey">
          <v-img :src="item.src"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="mt-n6">
          <v-list-item-title
            class="text-body-2 font-weight-bold grey--text text--darken-3"
            >{{ item.namaProduk }}</v-list-item-title
          >
          <v-list-item-subtitle>
            <span class="text-caption black--text">x {{ item.jumlah }}</span>
          </v-list-item-subtitle>
          <span class="text-caption black--text"
            >Rp {{ formatedHarga(item.produkTotal) }}</span
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-4">
            <span class="text-body-2">Total Pesanan</span>
            <span class="font-weight-black text-overline ml-2"
              >Rp.{{ formatedHarga(order.total) }}</span
            >
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn large block  text color="primary" :to="{name: 'detailPesanan'}">Detail</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PenjualanProducklist",
  props: ["order"],
  data() {
    return {};
  },

  mounted() {
    document.documentElement.scrollTop = 0;
  },
  watch: {
    order: function () {
      this.formatedHarga();
    },
  },
  methods: {
    formatedHarga(nilai) {
      let harga = Intl.NumberFormat("de-DE").format(nilai);
      return harga;
    },
  },
};
</script>
