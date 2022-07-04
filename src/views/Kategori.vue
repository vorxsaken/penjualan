<template>
  <div>
    <!-- <v-main> -->
      <v-container>
        <p class="text-h6 ml-2">Kategori</p>
        <v-row dense>
          <v-col v-for="(card, index) in cards" :key="index" cols="6" md="3" lg="3">
            <v-card @click="toKategori(card.title)">
              <v-img
                :src="card.src"
                height="150px"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
              >
                <v-card-title
                  class="white--text text-h6 font-weight-bold"
                  v-text="card.title"
                ></v-card-title>
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
      cards: [
        {
          title: "Mod",
          src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fmod.jpg?alt=media&token=8e8ba7a1-a5dc-4b0c-92ea-ec55203eb0a7",
        },
        {
          title: "Pod",
          src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fpod.jpg?alt=media&token=f3de89d1-4657-4077-b53e-03fd0fdc373f",
        },
        {
          title: "Atomizer",
          src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fatomizer.jpg?alt=media&token=655b2877-cd95-4ea0-a278-86467fd5c29e",
        },
        {
          title: "Liquid",
          src: "https://firebasestorage.googleapis.com/v0/b/penjualan-7c9e9.appspot.com/o/imageKategori%2Fliquid.jpg?alt=media&token=13b43168-f2c5-4205-8996-03be339a061a",
        },
      ],
    };
  },

  mounted() {},

  methods: {
      toKategori(title){
          console.log(title);
      }
  },
};
</script>
