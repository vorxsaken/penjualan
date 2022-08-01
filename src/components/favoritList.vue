<template>
  <div>
    <v-card v-ripple elevation="0" outlined @click="detailProduk(item.produkId)">
      <v-list-item>
        <v-list-item-avatar tile size="90" color="grey">
          <v-img :src="item.src"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="text-body-2 font-weight-bold grey--text text--darken-3"
            >{{ item.title }}</v-list-item-title
          >
          <v-list-item-subtitle>
            <v-rating class="ml-n2" :value="rating" size="12" readonly></v-rating>
            <span class="text-caption black--text">
              Rp {{ title }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon color="blue">mdi-heart</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import db from "../plugins/firebaseInit";
export default {
  name: "PenjualanFavoritlist",
  props: ["item"],
  data() {
    return {
      rating : 0,
    };
  },
  computed: {
    title(){
      let format = Intl.NumberFormat("de-DE").format(this.item.harga);
      return format;
    }
  },
  created(){
    this.getReview();
  },
  mounted() {},
  watch: {
    item : function(){
      this.title();
    }
  },
  methods: {
    detailProduk(payload){
      this.$router.push({name: "detailProduk", params: {id: payload, isFromLike: 'true'}})
    },
    async getReview(){
      const database = await db.collection("review").where("produkId", "==", this.item.produkId).get();
      const revArr = database.docs.map(doc => doc.data());
      let rating = []; let sumRating = 0;
      revArr.forEach((some) => {
        rating.push(some.rating);
      });
      for(const x of rating){
        sumRating += x;
      }
      this.rating = Math.ceil(sumRating / revArr.length);
    }
  },
};
</script>
