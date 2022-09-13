<template>
    <div class="d-flex justify-center py-4 px-4">
        <v-card elevation="0" max-width="600">
            <v-card-title class="title-login sm:text-h6 font-weight-bold sm d-flex justify-center mb-2">
                E-commerce App
            </v-card-title>
            <v-card-subtitle class="d-flex justify-center">
                versi: 1.0.0
            </v-card-subtitle>
            <v-card-text class="d-flex justify-center">
                <v-list>
                    <v-list-item dense>
                        <v-list-item-icon>
                            <v-icon large>
                                mdi-account
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                Developer
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                Moh Basyarudin Alfahmi
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                        <v-list-item-icon>
                            <v-icon large>
                                mdi-whatsapp
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                Whatsapp
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                (+62) 81952207090
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                        <v-list-item-icon>
                            <v-icon large>
                                mdi-github
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                github
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                vorxsaken
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item dense>
                        <v-list-item-icon>
                            <v-icon large>
                                mdi-map-marker
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                Address
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                5VCX+2CV, Jalan Suryo Kusumo,
                                <br> Mejabo Wetan, Kesambi, Kec. Mejobo,
                                <br> Kabupaten Kudus, Jawa Tengah 59381
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-text class="text-caption text-center">
                *Aplikasi ini dibuat dalam rangka memenuhi tugas akhir/skripsi
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    beforeDestroy() {
        if (this.$route.name == "Kategori") {
            return true;
        }
        this.$store.state.backCounter = 1;
        return;
    },
}
</script>

<style scoped>
.title-login {
  font-family: "Amita" !important;
  font-size: 38px;
  font-weight: 200;
}
</style>