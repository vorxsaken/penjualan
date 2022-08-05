<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex justify-center">
        <input @change="stateChange" type="file" ref="foto" class="d-none" />
        <v-avatar
          size="180"
          class="grey lighten-1"
          style="cursor: pointer"
          @click="updateAvatar"
        >
          <v-img :src="getImageUrl"> </v-img>
        </v-avatar>
      </v-card-title>
      <v-card-text>
        <v-card-title>
          <v-text-field
            outlined
            flat
            single-line
            hide-details="auto"
            :rules="[(v) => !!v || 'Username tidak boleh kosong']"
            label="Username"
            v-model="username"
          >
          </v-text-field>
          <v-text-field
            class="mt-4"
            outlined
            flat
            single-line
            hide-details="auto"
            label="Email"
            :value="this.$store.state.userEmail"
            disabled
          >
          </v-text-field>
        </v-card-title>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          :loading="upLoad"
          @click="updateUser"
          large
          width="150"
          color="primary"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { changeAt, updateWithAFile } from "../composes/edit.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "profilUser",
  data() {
    return {
      avatar: null,
      username: "",
      upLoad: false,
    };
  },
  mounted() {},
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
  methods: {
    updateAvatar() {
      this.$refs.foto.click();
    },
    stateChange(e) {
      this.avatar = e.target.files[0];
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
            this.upLoad = false;
            this.$store.state.userName = this.username
          });
        } else {
          updateWithAFile(
            uid,
            "client",
            `profilUser/${foto.name}`,
            { username: this.username },
            foto,
            "avatar"
          ).then((ref) => {
            this.upLoad = false;
            this.$store.state.userName = this.username;
            this.$store.state.userAvatar = ref
          });
        }
      }
    },
  },
};
</script>
