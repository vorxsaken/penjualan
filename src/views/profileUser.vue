<template>
  <div class="d-flex justify-center">
    <v-card elevation="0" width="700">
      <v-card-title class="d-flex justify-center mb-8">
        <div style="position: relative">
          <input @change="stateChange" type="file" ref="foto" class="d-none" />
          <v-avatar size="210" class="grey lighten-1" style="cursor: pointer" @click="updateAvatar">
            <v-img :src="getImageUrl"> </v-img>
          </v-avatar>
          <span class="grey darken-1 d-flex justify-center align-center"
            style="position: absolute; bottom: 6px; right: 10px;width: auto; height: auto; padding: 12px; border-radius: 100%">
            <v-icon color="white">mdi-file-image-plus-outline</v-icon>
          </span>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row class="">
          <v-col class="py-0">
            <v-text-field outlined flat single-line hide-details="auto"
              :rules="[(v) => !!v || 'Username tidak boleh kosong']" label="Username" hint="pastikan merupakan nama asli anda" v-model="username">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col class="py-0">
            <v-text-field class="mt-4" outlined flat single-line hide-details="auto" label="Email"
              :value="this.$store.state.userEmail" disabled>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn :loading="upLoad" @click="updateUser" large width="150" color="primary">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- dialog -->
    <v-dialog persistent v-model="dialog" width="350">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-center">
          <video ref="myvideo" width="200" height="200" src="../assets/order-success.mp4"></video>
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center text-caption blue-grey--text text--darken-1 mt-2">
          Data User Berhasil Diupdate
        </v-card-subtitle>
        <v-card-actions class="d-flex flex-column">
          <v-btn color="error" text @click="dialog = false">Kembali</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { changeAt, updateWithAFile } from "../composes/edit.js";
import { deleteFileFromStorageWithUrl } from "../composes/delete.js"
import firebase from "firebase/app";
import "firebase/auth";
import Compressor from 'compressorjs';

export default {
  name: "profilUser",
  data() {
    return {
      avatar: null,
      username: "",
      upLoad: false,
      dialog: false,
    };
  },
  mounted() { },
  created() {
    this.avatar = this.$store.state.userAvatar;
    this.username = this.$store.state.userName;
  },
  computed: {
    getImageUrl() {
      if (/\b.com\b/.test(this.avatar)) {
        return this.avatar;
      }
      let urlImg = URL.createObjectURL(this.avatar);
      return urlImg;
    },
  },
  watch: {},
  beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    return;
  },
  methods: {
    updateAvatar() {
      this.$refs.foto.click();
    },
    stateChange(e) {
      const file = e.target.files[0];
      const data = this;

      new Compressor(file, {
        quality: 0.8,
        width: 600,
        success(result){
          data.avatar = result   
        },
        error(err){
          console.log(err);
        }
      })
    },
    updateUser() {
      const { uid } = firebase.auth().currentUser;
      const foto = this.avatar;
      this.upLoad = true;
      if (this.username != "") {
        if (/\b.com\b/.test(this.avatar)) {
          changeAt("client", uid, {
            username: this.username,
          }).then((res) => {
            console.log(res);
            this.dialog = true;
            setTimeout(() => {
              this.$refs.myvideo.play()
            },10)
            this.upLoad = false;
            this.$store.state.userName = this.username;
          });
        } else {
          updateWithAFile(
            uid,
            "client",
            `profilUser/${foto.name}`,
            { username: this.username },
            foto,
            "avatar"
          ).then(async (ref) => {
            await deleteFileFromStorageWithUrl(this.$store.state.userAvatar)
            this.upLoad = false;
            this.dialog = true;
            setTimeout(() => {
              this.$refs.myvideo.play()
            },10)
            this.$store.state.userName = this.username;
            this.$store.state.userAvatar = ref;
          });
        }
      }
    },
  },
};
</script>
