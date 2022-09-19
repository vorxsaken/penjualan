<template>
    <v-dialog v-model="show" width="500" persistent>
        <v-card elevation="0" :key="key">
            <v-card-title class="d-flex justify-center text-h5 font-weight-bold blue-grey--text text--darken-2">Panduan
                Pembayaran</v-card-title>
            <v-card-text>
                <v-expansion-panels flat>
                    <v-expansion-panel v-for="(method, index) in pembayaran" :key="index">
                        <v-expansion-panel-header class="font-weight-black">{{ method.media.nama }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex flex-column" v-for="(steps, index) in method.media.steps" :key="index">
                                <div class="font-weight-black text-subtitle-1">{{
                                steps.title}}</div>
                                <div>
                                    <ol>
                                        <li v-for="(langkah, index) in steps.langkah" :key="index">{{ langkah }}</li>
                                    </ol>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions class="d-flex justify-center pb-6">
                <v-btn class="px-6" color="error" outlined @click="kembali">
                    Kembali
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["show", "vbn"],
    data() {
        return {
            key: 2,
            interval: null,
            pembayaran: [
                {
                    media: {
                        nama: 'Atm',
                        steps: [
                            {
                                title: 'Langkah 1: Temukan Atm terdekat',
                                langkah: [
                                    'Masukkan kartu, kemudian pilih bahasa dan masukkan PIN anda',
                                    'Pilih "Transaksi Lain" dan pilih "Pembayaran"',
                                    'Pilih menu "Lainnya" dan pilih "Briva"'
                                ]
                            },
                            {
                                title: 'Langkah 2: Detail Pembayaran',
                                langkah: [
                                    `Masukkan Nomor Virtual Account ${this.vbn} dan jumlah yang ingin anda bayarkan`,
                                    'Periksa data transaksi dan tekan "YA"'
                                ]
                            },
                            {
                                title: 'Langkah 3: Transaksi Berhasil',
                                langkah: [
                                    'Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit'
                                ]
                            }
                        ]
                    }
                },
                {
                    media: {
                        nama: 'Internet Banking',
                        steps: [
                            {
                                title: 'Langkah 1: Masuk Ke akun',
                                langkah: [
                                    'Buka situs https://ib.bri.co.id/ib-bri/, dan masukkan USER ID dan PASSWORD anda',
                                    'Pilih "Pembayaran" dan pilih "Briva"',
                                ]
                            },
                            {
                                title: 'Langkah 2: Detail Pembayaran',
                                langkah: [
                                    `Masukkan Nomor Virtual Account ${this.vbn} dan jumlah yang ingin anda bayarkan`,
                                    'Masukkan password anda kemudian masukkan mToken internet banking'
                                ]
                            },
                            {
                                title: 'Langkah 3: Transaksi Berhasil',
                                langkah: [
                                    'Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit'
                                ]
                            }
                        ]
                    }
                },
                {
                    media: {
                        nama: 'Mobile Banking',
                        steps: [
                            {
                                title: 'Langkah 1: Masuk Ke akun',
                                langkah: [
                                    'Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN anda',
                                    'Pilih "Pembayaran" dan pilih "Briva"',
                                ]
                            },
                            {
                                title: 'Langkah 2: Detail Pembayaran',
                                langkah: [
                                    `Masukkan Nomor Virtual Account anda ${this.vbn} dan jumlah yang ingin anda bayarkan`,
                                    'Masukkan PIN Mobile Banking BRI'
                                ]
                            },
                            {
                                title: 'Langkah 3: Transaksi Berhasil',
                                langkah: [
                                    'Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis. Proses ini mungkin memakan waktu hingga 5 menit'
                                ]
                            }
                        ]
                    }
                },
            ]
        }
    },
    watch: {
        show() {
           this.key++;
        },
    },
    methods: {
        kembali() {
            this.$emit('kembali');

        }
    }

}
</script>

<style>

</style>