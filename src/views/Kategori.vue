<template>
  <div>
    <!-- <v-main> -->
    <v-container>
      <p class="text-h6 ml-2">Kategori</p>
      <v-row dense>
        <v-col v-for="(card, index) in this.$store.state.kategori" :key="index" cols="6" md="3" lg="3">
          <v-card @click="toKategori(card.kategoriId, card.namaKategori)">
            <v-img :src="card.coverURL" height="150px" class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)">
              <div class="white--text text-h6 font-weight-bold px-3 py-2" v-text="card.namaKategori"></div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-main> -->
  </div>
</template>

<script>
export default {
  name: "PenjualanKategori",

  data() {
    return {
    };
  },

  mounted() { },

  methods: {
    toKategori(id, nama) {
      this.$router.push({name: 'kategoriView', params: {id: id, nama: nama}});
    }
  },
};
</script>
