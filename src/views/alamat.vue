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
    <v-dialog v-model="isDeleting" width="250" persistent>
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center pb-8"
          >Deleting ...</v-card-title
        >
        <v-card-text class="d-flex justify-center pb-8">
          <v-progress-circular
            color="red"
            indeterminate
            size="45"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card elevation="0" class="pb-6">
      <v-card-title class="pb-4"> Daftar Alamat </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(data, index) in this.$store.state.alamat"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card class="pb-4">
              <v-card-title class="text-subtitle-1">{{
                data.title
              }}</v-card-title>
              <v-card-text class="text-subtitle-2 overflow-y-hidden">
                {{ data.telp }}, {{ trimText(data.detailAlamat) }}
              </v-card-text>
              <v-card-actions class="ml-2">
                <v-btn class="primary" @click="editAlamat(data.alamatId)"
                  ><v-icon class="mr-1">mdi-pencil-box</v-icon> Edit</v-btn
                >
                <v-btn class="error" @click="hapusAlamat(data.alamatId)"
                  ><v-icon class="mr-1">mdi-trash-can</v-icon> Hapus</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          class="primary"
          :to="{ name: 'inputAlamat' }"
          :width="
            this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
              ? 340
              : 200
          "
          height="40"
        >
          <v-icon small class="mr-1">mdi-plus-thick</v-icon>Tambah Alamat
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import db from "../plugins/firebaseInit.js";
export default {
  name: "PenjualanInputAlamat",

  data() {
    return {
      alamat: null,
      isDeleting: false,
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  methods: {
    trimText(text) {
      if (text.length > 60) {
        let txt = text.substring(0, 60);
        return txt + " ...";
      }
      return text;
    },
    editAlamat(alamatId) {
      this.$router.push({ name: "editAlamat", params: { id: alamatId } });
    },
    async hapusAlamat(alamatId) {
      this.isDeleting = true;
      const database = db.collection("alamat").doc(alamatId);
      database
        .delete()
        .then(() => {
          this.isDeleting = false;
          this.$store.commit("filterAlamat", alamatId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
