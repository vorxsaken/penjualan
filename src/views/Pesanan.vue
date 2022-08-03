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
      :style="{height: this.$vuetify.breakpoint.height - 140 + 'px'}"
      class="fill-height d-flex justify-center align-center"
    >
      <v-img
        src="@/assets/Circles-menu-3.gif"
        max-height="25"
        max-width="50"
      ></v-img>
    </div>
    <div v-else>
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
        <v-card-text class="mb-n5">
          <v-row dense>
            <v-col
              cols="12"
              lg="4"
              v-for="(items, index) in this.$store.state.pemesanan"
              :key="index"
            >
              <produckList :order="items" />
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
    };
  },

  created() {
    this.getPesanan();
  },
  mounted() {},

  methods: {
    getPesanan() {
      if (this.$store.state.pemesanan.length == 0) {
        this.$store.dispatch("getPemesanan");
      }
    },
  },
};
</script>
