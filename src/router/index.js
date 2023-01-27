import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Pesanan from '../views/Pesanan.vue';
import Favorit from '../views/Favorit.vue';
import Profile from '../views/Profile.vue';
import Kategori from '../views/Kategori.vue';
// import detailProduk from "../views/detailProduk.vue";
import Login from "../views/login.vue";
import buatAkun from "../views/buatAkun.vue";
import Keranjang from "../views/testKeranjang.vue";
import Alamat from "../views/alamat.vue";
import inputAlamat from "../views/inputAlamat.vue"; 
import detailPesanan from "../views/detailPesanan.vue";
import editAlamat from "../views/editAlamat.vue";
import test from "../views/testView.vue";
import profileUser from "../views/profileUser.vue";
import kategoriView from "../views/kategoriView.vue";
import imagePreview from "../views/imagePreview.vue";
import searchView from "../views/searchView.vue";
import about from "../views/about.vue";
import ubahPassword from "../views/ubahPassword.vue";
import riwayatPesanan from "../views/riwayatPesanan.vue";
import firebase from "firebase/app";
import "firebase/auth";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/pesanan',
    name: 'Pesanan',
    component: Pesanan,
    meta: {
      title: "Pesanan"
    }
  },
  {
    path: '/favorit',
    name: 'Favorit',
    component: Favorit,
    meta: {
      title: "Favorit"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: '/kategori',
    name: 'Kategori',
    component: Kategori,
    meta: {
      title: "Kategori"
    }
  },
  {
    path: '/detailProduk/:id/:isFromLike',
    name: 'detailProduk',
    component: test,
    meta: {
      title: "Detail Produk "
    }
  },
  {
    path: '/buatAkun',
    name: 'buatAkun',
    component: buatAkun,
    meta: {
      title: "Buat Akun"
    }
  },
  {
    path: '/user',
    name: 'User',
    component: Profile,
    meta: {
      title: "Profile"
    }
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang,
    meta: {
      title: "Keranjang"
    }
  },
  {
    path: '/detailPesanan/:id/:data',
    name: 'detailPesanan',
    component: detailPesanan,
    meta: {
      title: "Detail Pesanan"
    }
  },
  {
    path: '/alamat',
    name:'alamat',
    component: Alamat,
    meta: {
      title: "Alamat"
    }
  },
  {
    path: '/inputAlamat',
    name:'inputAlamat',
    component: inputAlamat,
    meta: {
      title: "Tambah Alamat"
    }
  },
  {
    path: '/editAlamat/',
    name:'editAlamat',
    component: editAlamat,
    meta: {
      title: "Edit Alamat"
    }
  },
  {
    path: '/profileUser',
    name: 'profileUser',
    component: profileUser,
    meta: {
      title: "Profile User"
    }
  },
  {
    path: '/kategoriView/:id',
    name: 'kategoriView',
    component: kategoriView,
    meta: {
      title: "Kategori"
    }
  },
  {
    path: '/searchView',
    name: 'searchView',
    component: searchView,
    meta: {
      title: "Search"
    }
  },
  {
    path: '/imagePreview/:src',
    name: 'imagePreview',
    component: imagePreview
  },
  {
    path: '/about',
    name: 'about',
    component: about,
    meta: {
      title: "About"
    }
  },
  {
    path: '/ubah_password',
    name: 'ubah_password',
    component: ubahPassword,
    meta: {
      title: "Ubah Password"
    }
  },
  {
    path: '/riwayat_pesanan',
    name: 'riwayat_pesanan',
    component: riwayatPesanan,
    meta: {
      title: "Riwayat Pesanan"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Eza Elektronik`
  next();
})

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  if(from.name != 'Profile' && to.name == 'Profile' && user == null){
    next();
  }else if(from.name != 'Profile' && to.name == 'Profile' && user != null && user.emailVerified){
    next({name: 'User'});
  }else{
    next();
  }
});

export default router
