<template>
  <div>
    <v-card elevation="0" outlined>
      <v-list-item class="grey lighten-4">
        <v-list-item-title>
          <span class="text-caption float-left"
            >Pesanan: {{ order.created_at }}</span
          >
          <span class="text-caption font-weight-bold float-right">{{
            order.status
          }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <div style="min-height: 110px; max-height: 110px;" class="overflow-y-auto">
        <v-list-item v-for="(item, index) in order.pesanan" :key="index">
          <v-list-item-avatar tile size="90" color="grey">
            <v-img :src="item.src"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="mt-n6">
            <v-list-item-title
              class="text-body-2 font-weight-bold grey--text text--darken-3"
              >{{ item.title }}</v-list-item-title
            >
            <v-list-item-subtitle>
              <span class="text-caption black--text">x {{ item.jumlah }}</span>
            </v-list-item-subtitle>
            <span class="text-caption black--text"
              >Rp {{ formatedHarga(item.harga) }}</span
            >
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item v-if="order.pesanan.length < 2">
          <v-list-item-title  class="py-4 d-flex justify-center flex-column" style="height: 100px" v-for="i in 5" :key="i">
            <v-img contain height="40" src="../assets/cat.png">
            </v-img>
            <p class="d-flex justify-center text-caption blue-grey--text text--darken-4">meoww</p>
          </v-list-item-title>
        </v-list-item> -->
      </div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-4">
            <span class="text-body-2">Total Pesanan</span>
            <span class="font-weight-black text-overline ml-2"
              >Rp.{{ formatedHarga(order.total) }}</span
            >
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn
              large
              block
              text
              color="primary"
              @click="toDetail()"
              :to="{ name: 'detailPesanan', params: {id: order.pemesananId, data: data} }"
              >Detail</v-btn
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PenjualanProducklist",
  props: ["order", "data"],
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
