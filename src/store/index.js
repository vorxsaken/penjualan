import Vue from 'vue'
import Vuex from 'vuex'
import db from '../plugins/firebaseInit.js'
import firebase from "firebase/app"
import "firebase/auth";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footbarValue: 0,
    footbarValueHistory: [0],
    hideKategori: null,
    pop: true,
    pemesanan: [],
    riwayatPesanan: [],
    backCounter: 0,
    produk: [],
    keranjang: [],
    kategori: [],
    alamat: [],
    favorit: [],
    user: null,
    userEmail: '',
    userName: '',
    userAvatar: '',
    provinsi: '',
    nama_provinsi: '',
    kabupaten: '',
    nama_kota: '',
    telpon: '',
    detailAlamat: '',
    scrollY: 0,
    lastVisible: null,
    totalLength: 0,
    isSearch: false,
    searchViewParams: '',
    isLoginError: false,
    loginErrorMessage: '',
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;
    },
    filterProduk(state, payload) {
      state.produk = state.produk.filter((prod) => {
        return prod.produkId !== payload;
      });
    },
    filterKeranjang(state, payload) {
      state.keranjang.splice(payload, 1);
    },
    filterFavorit(state, payload) {
      state.favorit = state.favorit.filter((fav) => { return fav.likeId !== payload });
    },
    filterPemesanan(state, payload) {
      state.pemesanan = state.pemesanan.filter((pem) => { return pem.pemesananId !== payload });
    },
    setNewAlamat(state, payload) {
      state.provinsi = payload.provinsi;
      state.nama_provinsi = payload.nama_provinsi;
      state.kabupaten = payload.kabupaten;
      state.nama_kota = payload.nama_kota;
      state.telpon = payload.telpon;
      state.detailAlamat = payload.detail_alamat;
    },
    changeFootbarValue(state, payload) {
      state.footbarValue = payload;
      state.footbarValueHistory.push(payload);
      state.pop = true;
    },
    setUserInfo(state, payload) {
      state.userEmail = payload.data().email;
      state.userName = payload.data().username;
      state.userAvatar = payload.data().avatar;
      state.provinsi = payload.data().provinsi;
      state.nama_provinsi = payload.data().nama_provinsi;
      state.kabupaten = payload.data().kabupaten;
      state.nama_kota = payload.data().nama_kota;
      state.telpon = payload.data().telpon;
      state.detailAlamat = payload.data().detail_alamat;
    }
  },
  actions: {
    deleteLoginError({state}){
      state.isLoginError = false;
      state.loginErrorMessage = '';
    },
    loginError({state}, payload){
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
    changeOrderStatus({state}, payload){
      for(let i = 0; i < state.pemesanan.length; i++){
        if(state.pemesanan[i].pemesananId == payload.id){
          state.pemesanan[i].status = payload.status;
        }
      }
    },
    async getKategori({state}){
      const database = await db.collection("kategori").get();
      database.forEach((kategori) => {
        state.kategori.push(kategori.data());
      })
    },
    async getRiwayatPesanan({state}){
      const getDiterimaStatus = db.collection('pemesanan')
      .where("userEmail", '==', state.userEmail).where('status', '==', 'diterima').get();
      const getDeclineStatus = db.collection('pemesanan')
      .where("userEmail", '==', state.userEmail).where('status', '==', 'declined').get();

      const [diterima, declined] = await Promise.all([
        getDiterimaStatus,
        getDeclineStatus
      ])

      const diterimaArray = diterima.docs;
      const declinedArray = declined.docs;

      const riwayatPesanan = diterimaArray.concat(declinedArray)

      riwayatPesanan.forEach((document) => {
        if (!state.riwayatPesanan.some((doc) => { return doc.pemesananId == document.data().pemesananId })) {
          var subCollection = [];
          document.ref.collection("pesanan").get().then((querySnapshot) => {
            querySnapshot.forEach((query) => {
              subCollection.push(query.data());
            })
          })

          var pemesanan = {
            ...document.data(),
            pesanan: subCollection
          }
          state.riwayatPesanan.push(pemesanan);
        }
      })
    },
    async getPemesanan({ state }) {
      const diterima = await db.collection("pemesanan").where("userEmail", '==', state.userEmail)
      .where("status", '!=', 'diterima').get();

      const diterimaArray = diterima.docs;
      const declinedArray = diterima.docs.filter((dec) => {dec.data().status != 'declined'});

      const database = diterimaArray.concat(declinedArray);

      database.forEach((document) => {
        if (!state.pemesanan.some((doc) => { return doc.pemesananId == document.data().pemesananId })) {
          var subCollection = [];
          document.ref.collection("pesanan").get().then((querySnapshot) => {
            querySnapshot.forEach((query) => {
              subCollection.push(query.data());
            })
          })

          var pemesanan = {
            ...document.data(),
            pesanan: subCollection
          }
          state.pemesanan.push(pemesanan);
        }
      })
    },
    async getCurrentUser({ commit }) {
      const database = await db.collection("client").doc(firebase.auth().currentUser.uid);
      const get = await database.get();
      commit("setUserInfo", get);
    },
    setCurrentFootbarValue({ state }) {
      if (state.footbarValueHistory.length > 1) {
        state.footbarValueHistory.pop();
        let value = state.footbarValueHistory.length - 1;
        state.footbarValue = state.footbarValueHistory[value];
      }
    },
    async getProduk({ state }) {
      const totalLength = await db.collection("produk").get();
      state.totalLength = totalLength.docs.length;
      const database = db.collection('produk').orderBy("title", "asc").limit(12);
      const get = await database.get();
      state.lastVisible = get.docs[get.docs.length - 1];
      get.forEach(async (doc) => {
        if (!state.produk.some((post) => { return post.produkId === doc.id })) {
          const subCollection = await db.collection("produk/" + doc.data().produkId + "/gambar").get();
          const arrSub = [];
          subCollection.forEach((sub) => {
            const arrData = {
              gambarId: sub.data().gambarId,
              namaGambar: sub.data().namaGambar,
              src: sub.data().src,
              pic: sub.data().picUrl
            };
            arrSub.push(arrData);
          })
          const dat = {
            produkId: doc.data().produkId,
            harga: doc.data().harga,
            deskripsi: doc.data().deskripsi,
            kategori: doc.data().kategori,
            title: doc.data().title,
            totalReview: doc.data().totalReview,
            rating: doc.data().rating,
            stok: doc.data().stokProduk,
            gambar: arrSub
          }
          state.produk.push(dat);
        }
      })
    },
    async getNextproduk({ state }) {
      const database = db.collection("produk").orderBy("title", "asc").limit(12).startAfter(state.lastVisible);
      const get = await database.get();
      state.lastVisible = get.docs[get.docs.length - 1];
      get.forEach(async (doc) => {
        if (!state.produk.some((post) => { return post.produkId === doc.id })) {
          const subCollection = await db.collection("produk/" + doc.data().produkId + "/gambar").get();
          const arrSub = [];
          subCollection.forEach((sub) => {
            const arrData = {
              gambarId: sub.data().gambarId,
              namaGambar: sub.data().namaGambar,
              src: sub.data().src,
              pic: sub.data().picUrl
            };
            arrSub.push(arrData);
          })
          const dat = {
            produkId: doc.data().produkId,
            harga: doc.data().harga,
            deskripsi: doc.data().deskripsi,
            kategori: doc.data().kategori,
            title: doc.data().title,
            totalReview: doc.data().totalReview,
            rating: doc.data().rating,
            stok: doc.data().stokProduk,
            gambar: arrSub
          }
          state.produk.push(dat);
        }
      })
    },
    updateProduk({ commit, dispatch }, payload) {
      commit("filterProduk", payload);
      dispatch("getProduk");
    },
    async getFavorit({ state }) {
      if (firebase.auth().currentUser != null) {
        const arr = await db.collection("like").where("user", "==", firebase.auth().currentUser.email).get();
        // const arr = database.docs.map(doc => doc.data());
        arr.forEach(async (val) => {
          if (!state.favorit.some((fav) => { return fav.likeId === val.id })) {
            const prod = await db
              .collection("produk")
              .where("produkId", "==", val.data().produkId)
              .get();
            const arrayOfLiked = prod.docs.map((doc) => doc.data());
            const gambar = await db
              .collection("produk/" + arrayOfLiked[0].produkId + "/gambar")
              .limit(1)
              .get();
            const mapSrc = gambar.docs.map((doc) => doc.data());
            const fin = {
              likeId: val.id,
              produkId: arrayOfLiked[0].produkId,
              title: arrayOfLiked[0].title,
              harga: arrayOfLiked[0].harga,
              src: mapSrc[0].picUrl,
              rating: 4,
            };
            state.favorit.push(fin);
          }
        });
      }
    },
    async pushFavorit({ state }, payload) {
      const prod = await db
        .collection("produk")
        .where("produkId", "==", payload.produkId)
        .get();
      const arrayOfLiked = prod.docs.map((doc) => doc.data());
      const gambar = await db
        .collection("produk/" + arrayOfLiked[0].produkId + "/gambar")
        .limit(1)
        .get();
      const mapSrc = gambar.docs.map((doc) => doc.data());
      const fin = {
        likeId: payload.likeId,
        produkId: arrayOfLiked[0].produkId,
        title: arrayOfLiked[0].title,
        harga: arrayOfLiked[0].harga,
        src: mapSrc[0].picUrl,
        rating: 4,
      };
      state.favorit.push(fin);
    },
    async getKeranjang({ state }) {
      state.keranjang = [];
      if (firebase.auth().currentUser != null) {
        const database = db.collection("keranjang")
          .where("userId", "==", firebase.auth().currentUser.uid)
          .where("status", "==", "keranjang");

        const dbRef = await database.get();
        dbRef.forEach((doc) => {
          if (!state.keranjang.some((keranjang) => { return keranjang.keranjangId === doc.id })) {
            state.keranjang.push(doc.data());
          }
        })
      }
    },
    async getAlamat({ state }) {
      state.alamat = [];
      if (firebase.auth().currentUser != null) {
        const data = db.collection("alamat").where('userId', '==', firebase.auth().currentUser.uid);
        const database = await data.get();
        database.forEach((dat) => {
          if (!state.alamat.some((al) => { return al.alamatId === dat.alamatId })) {
            state.alamat.push(dat.data());
          }
        })
      }
    },
    async updateAlamat({ commit }, payload) {
      commit("setNewAlamat", payload);
    }
  },
  modules: {
  }
})
