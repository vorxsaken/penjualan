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
    }
}
</script>

<style>
</style>