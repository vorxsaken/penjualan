<template>
    <v-dialog v-model="show" width="450" persistent>
        <v-card elevation="0">
            <v-card-title class="d-flex justify-center text-h5 font-weight-bold blue-grey--text text--darken-2">Panduan
                Pembayaran</v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel v-for="(method, index) in pembayaran" :key="index">
                        <v-expansion-panel-header>{{ method.media.nama }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["show", "vbn"],
    data() {
        return {
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
                                    'Masukkan Nomor Virtual Account 92001988572642231 dan jumlah yang ingin andabayarkan',
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
                                    'Masukkan Nomor Virtual Account 92001988572642231 dan jumlah yang ingin anda bayarkan',
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
                                    'Masukkan Nomor Virtual Account anda 92001988572642231 dan jumlah yang ingin anda bayarkan',
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
    }

}
</script>

<style>

</style>