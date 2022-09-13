<template>
    <div
    :style="{
      height:
        this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
          ? this.$vuetify.breakpoint.height - 140 + 'px'
          : '',
    }"
    :class="
      this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        ? 'overflow-y-auto'
        : ''
    "
    >
        <v-container>
            <div class="px-4 mb-2 text-h4 font-weight-bold blue-grey--text text--darken-1">Riwayat Pesanan</div>
            <v-data-iterator :items="this.$store.state.riwayatPesanan" hide-default-footer
                :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" :loading="loadingRiwayat" loading-text="mengambil data ...">

                <!-- header -->
                <template v-slot:header>
                    <v-toolbar elevation="0">
                        <div>
                            <v-select prepend-icon="mdi-sort" single-line solo v-model="sortBy" :items="keys"
                                item-text="title" item-value="value" flat hide-details label="Urutkan">
                            </v-select>
                        </div>
                        <v-btn-toggle v-model="sortDesc" mandatory dense>
                            <v-btn small text color="blue" :value="false" depressed>
                                <v-icon small>mdi-arrow-up</v-icon>
                            </v-btn>
                            <v-btn small text color="blue" :value="true" depressed>
                                <v-icon small>mdi-arrow-down</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </v-toolbar>
                </template>

                <!-- body -->
                <template v-slot:default="props">
                    <v-row dense>
                        <v-col cols="12" lg="4" v-for="(riwayat, index) in props.items" :key="index">
                            <produckList :order="riwayat" data="riwayatPesanan"/>
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
import produckList from "../components/pesananList.vue";
export default {
    components: {
        produckList,
    },
    data() {
        return {
            sortBy: '',
            loadingRiwayat: true,
            sortDesc: false,
            keys: [
                {
                    title: "Tanggal",
                    value: 'created_at'
                },
                {
                    title: 'Total',
                    value: 'total'
                }
            ]
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        if (this.$route.name == "Kategori") {
            return true;
        }
        this.$store.state.backCounter = 1;
        return;
    },
    methods: {
        async init() {
            await this.$store.dispatch('getRiwayatPesanan');
            this.loadingRiwayat = false;
        }
    }

}
</script>

<style>

</style>