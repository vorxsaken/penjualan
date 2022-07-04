<template>
  <div
    :style="{ height: this.$vuetify.breakpoint.height - 140 + 'px' }"
    class="overflow-y-auto"
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
      <v-card-text
        v-for="(data, index) in this.$store.state.alamat"
        :key="index"
      >
        <v-card class="pb-4">
          <v-card-title class="text-subtitle-1">{{ data.title }}</v-card-title>
          <v-card-text class="text-subtitle-2">
            {{ data.telp }}, {{ data.detailAlamat }}
          </v-card-text>
          <v-card-actions class="ml-2">
            <v-btn class="primary" @click="editAlamat(data.alamatId)"
              >Edit</v-btn
            >
            <v-btn class="error" @click="hapusAlamat(data.alamatId)"
              >Hapus</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn
          class="primary"
          :to="{ name: 'inputAlamat' }"
          width="340"
          height="40"
          >Tambah Alamat</v-btn
        >
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
    editAlamat(alamatId) {
      this.$router.push({ name: "editAlamat", params: { id: alamatId } });
    },
    async hapusAlamat(alamatId) {
      this.isDeleting = true;
      const database = await db.collection("alamat").doc(alamatId);
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