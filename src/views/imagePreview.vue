<template>
    <div ref="image" class="py-4 overflow-auto d-flex justify-center align-center">
        <v-img :src="this.$route.params.src"></v-img>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    mounted(){
    },
    methods: {
    },
    async beforeDestroy() {
    if (this.$route.name == "Kategori") {
      return true;
    }
    this.$store.state.backCounter = 1;
    // await this.$store.dispatch("getKeranjang");
    return;
  },
}
</script>

<style>
</style>