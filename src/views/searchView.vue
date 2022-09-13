<template>
    <div :style="{
        height:
            this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
                ? this.$vuetify.breakpoint.height - 140 + 'px'
                : '',
    }" :class="
    this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        ? 'overflow-y-auto'
        : ''
">
        <div v-if="isLoad" :style="{ height: this.$vuetify.breakpoint.height - 140 + 'px' }"
            class="fill-height d-flex justify-center align-center">
            <v-img src="@/assets/Circles-menu-3.gif" max-height="25" max-width="50"></v-img>
        </div>
        <div v-else>
            <v-container>
                <v-card class="mb-2" elevation="0">
                    <v-card-title class="py-1 pl-2 d-flex justify-start">
                        <span class="text-body-1 pl-0 black--text font-weight-light">
                            Pencarian Untuk: 
                            <span class="font-weight-bold">{{ this.$store.state.searchViewParams }}</span> 
                        </span>
                    </v-card-title>
                </v-card>
                <v-row dense>
                    <v-col v-for="(card, index) in selSearch" :key="index" cols="6" md="4" lg="2" xl="2">
                        <produkCard @produkClick="detailProduk" @favoritClick="addFavorit" :produk="card" />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import db from "../plugins/firebaseInit";
import firebase from 'firebase/app';
import produkCard from "../components/produckCard.vue";

export default {
    components: {
        produkCard
    },
    data() {
        return {
            isLoad: true,
            selSearch: [],
            totalLength: 0,
            lastVisible: null,
            isBottom: false
        }
    },
    created() {
        this.getSearchView();
        setTimeout(() => {
            this.checkAutoLoad();
        }, 1500);
    },
    watch: {
    },
    methods: {
        checkAutoLoad() {
            if (this.selSearch.length >= this.totalLength) {
                this.isBottom = false;
            } else {
                this.isBottom = true;
            }
        },
        appendProduk(entries) {
            if (entries[0].isIntersecting) {
                this.getNextSearch();
                
            }
        },
        async getSearchView() {
            const wordInit = this.$store.state.searchViewParams;
            const length = await db.collection("produk").orderBy("title", "asc").startAt(wordInit.toUpperCase())
            .endAt(`${wordInit.toLowerCase()}\uf8ff`).limit(20).get();
            this.totalLength = length.docs.length;
            const dat = db.collection("produk").orderBy("title", "asc")
                .startAt(wordInit.toUpperCase()).endAt(`${wordInit.toLowerCase()}`);
            const database = await dat.get();
            this.lastVisible = database.docs[database.docs.length - 1];
            database.forEach(async (n) => {
                const subCollection = await db.collection("produk/" + n.data().produkId + "/gambar").get();
                const arrSub = [];
                subCollection.forEach((sub) => {
                    const arrData = {
                        gambarId: sub.data().gambarId,
                        namaGambar: sub.data().namaGambar,
                        src: sub.data().src
                    };
                    arrSub.push(arrData);
                })
                const dat = {
                    produkId: n.data().produkId,
                    harga: n.data().harga,
                    deskripsi: n.data().deskripsi,
                    kategori: n.data().kategori,
                    title: n.data().title,
                    totalReview: n.data().totalReview,
                    rating: n.data().rating,
                    gambar: arrSub
                }
                this.selSearch.push(dat);
            });

            this.isLoad = false;
        },
        async getNextSearch() {
            const wordInit = this.$store.state.searchViewParams;
            const database = await db.collection("produk")
                .startAt(wordInit.toUpperCase()).endAt(`${wordInit.toLowerCase()}\uf8ff`)
                .startAfter(this.lastVisible).limit(5).get();
            this.lastVisible = database.docs[database.docs.length - 1]
            database.forEach(async (n) => {
                const subCollection = await db.collection("produk/" + n.data().produkId + "/gambar").get();
                const arrSub = [];
                subCollection.forEach((sub) => {
                    const arrData = {
                        gambarId: sub.data().gambarId,
                        namaGambar: sub.data().namaGambar,
                        src: sub.data().src
                    };
                    arrSub.push(arrData);
                })
                const dat = {
                    produkId: n.data().produkId,
                    harga: n.data().harga,
                    deskripsi: n.data().deskripsi,
                    kategori: n.data().kategori,
                    title: n.data().title,
                    totalReview: n.data().totalReview,
                    rating: n.data().rating,
                    gambar: arrSub
                }
                this.selSearch.push(dat);
            })
        },
        detailProduk(payload) {
            this.$router.push({
                name: "detailProduk",
                params: { id: payload, isFromLike: "true" },
            });
        },
        async addFavorit(produkID) {
            const getLike = await db.collection("like").get();
            const arr = getLike.docs.map((doc) => doc.data());
            if (
                arr.some((like) => {
                    return (
                        like.user == firebase.auth().currentUser.email &&
                        like.produkId == produkID
                    );
                })
            ) {
                let del = db
                    .collection("like")
                    .where("produkId", "==", produkID)
                    .where("user", "==", firebase.auth().currentUser.email);
                await del.get().then((some) => {
                    some.forEach((doc) => {
                        doc.ref
                            .delete()
                            .then(() => {
                                this.$store.commit("filterFavorit", doc.id);
                                console.log("Terhapus favorit");
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                });
            } else {
                const database = db.collection("like").doc();
                let like = {
                    likeId: database.id,
                    user: firebase.auth().currentUser.email,
                    produkId: produkID,
                    likedAt: this.getDate(),
                };
                this.$store.dispatch("pushFavorit", like);
                await database
                    .set({
                        likeId: database.id,
                        user: firebase.auth().currentUser.email,
                        produkId: produkID,
                        likedAt: this.getDate(),
                    })
                    .then(() => {
                        console.log("Tambah Favorit");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    }
}
</script>