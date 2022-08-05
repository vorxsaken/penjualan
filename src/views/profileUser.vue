<template>
  <div>
    <v-card elevation="0">
      <v-card-title class="d-flex justify-center">
        <input @change="stateChange" type="file" ref="foto" class="d-none" />
        <v-avatar size="180" class="grey lighten-1" style="cursor: pointer;" @click="updateAvatar">
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
            label="Username"
            :value="this.$store.state.userName"
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
        <v-btn large width="150" color="primary"> Update </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "profilUser",
  data() {
    return {
      avatar: null,
    };
  },
  mounted() {},
  created() {
    this.avatar = this.$store.state.userAvatar;
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
  watch: {
  },
  methods: {
    updateAvatar() {
      this.$refs.foto.click();
    },
    stateChange(e) {
      this.avatar = e.target.files[0];
    },
  },
};
</script>
