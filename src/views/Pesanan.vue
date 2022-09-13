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
    <div
      v-if="this.$store.state.pemesanan.length == 0"
      :style="{ height: this.$vuetify.breakpoint.height - 140 + 'px' }"
      class="fill-height d-flex justify-center align-center"
    >
      <v-img
        v-if="showLoading && this.$store.state.user != null"
        src="@/assets/Circles-menu-3.gif"
        max-height="25"
        max-width="50"
      ></v-img>
      <div v-else-if="!showLoading || this.$store.state.user == null" class="d-flex flex-column justify-center fill-height align-center">
        <v-icon size="60">mdi-delete-empty</v-icon>
        <h4 class="" style="font-weight: 300">Pesanan Kosong :(</h4>
      </div>
    </div>
    <div v-else>
      <v-card elevation="0" class="pb-4">
        <v-card-title>
          <span class="text-h4 pl-4 grey--text text--darken-3 font-weight-bold"
            >Pesanan</span
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="reloadPesanan">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mb-n5">
          <v-row dense>
            <v-col
              cols="12"
              lg="4"
              v-for="(items, index) in this.$store.state.pemesanan"
              :key="index"
            >
              <produckList :order="items" data="pesanan" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
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
      showLoading: true,
    };
  },

  created() {
    this.getPesanan();
  },
  mounted() {},

  methods: {
    reloadPesanan(){
      this.$store.state.pemesanan = [];
      this.$store.dispatch('getPemesanan');
    },
    async getPesanan() {
      if (this.$store.state.pemesanan.length == 0) {
        await this.$store.dispatch("getPemesanan");
        if(this.$store.state.pemesanan.length == 0){
          this.showLoading = false;
        }
      }
    },
  },
};
</script>
