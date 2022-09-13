<template>
  <div>
    <!-- <v-main> -->
    <v-container>
      <p class="text-h6 ml-2">Kategori</p>
      <v-row dense>
        <v-col v-for="(card, index) in this.$store.state.kategori" :key="index" cols="6" md="3" lg="3">
          <v-card @click="toKategori(card.namaKategori)">
            <v-img :src="card.coverURL" height="150px" class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)">
              <v-card-title class="white--text text-h6 font-weight-bold" v-text="card.namaKategori"></v-card-title>
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
    toKategori(title) {
      this.$router.push({name: 'kategoriView', params: {id: title}});
    }
  },
};
</script>
