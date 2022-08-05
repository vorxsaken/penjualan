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
import Keranjang from "../views/keranjang.vue";
import Alamat from "../views/alamat.vue";
import inputAlamat from "../views/inputAlamat.vue"; 
import detailPesanan from "../views/detailPesanan.vue";
import editAlamat from "../views/editAlamat.vue";
import test from "../views/testView.vue";
import profileUser from "../views/profileUser.vue";
import firebase from "firebase/app";
import "firebase/auth";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pesanan',
    name: 'Pesanan',
    component: Pesanan
  },
  {
    path: '/favorit',
    name: 'Favorit',
    component: Favorit
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Login
  },
  {
    path: '/kategori',
    name: 'Kategori',
    component: Kategori
  },
  {
    path: '/detailProduk/:id/:isFromLike',
    name: 'detailProduk',
    component: test
  },
  {
    path: '/buatAkun',
    name: 'buatAkun',
    component: buatAkun
  },
  {
    path: '/user',
    name: 'User',
    component: Profile
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang
  },
  {
    path: '/detailPesanan/:id',
    name: 'detailPesanan',
    component: detailPesanan
  },
  {
    path: '/alamat',
    name:'alamat',
    component: Alamat
  },
  {
    path: '/inputAlamat',
    name:'inputAlamat',
    component: inputAlamat
  },
  {
    path: '/editAlamat/:id',
    name:'editAlamat',
    component: editAlamat
  },
  {
    path: '/profileUser',
    name: 'profileUser',
    component: profileUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  if(from.name != 'Profile' && to.name == 'Profile' && user == null){
    next();
  }else if(from.name != 'Profile' && to.name == 'Profile' && user != null){
    next({name: 'User'});
  }else{
    next();
  }
});

export default router
