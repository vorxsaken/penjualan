<template>
    <div class="d-flex justify-center">
        <v-card elevation="0" max-width="400">
            <v-card-title class="d-flex justify-center text-h5 font-weight-bold grey--text text--darken-2">
                Ubah Password
            </v-card-title>
            <v-card-text class="d-flex justify-center">
                <v-list dense>
                    <v-list-item class="py-0">
                        <v-list-item-content class="py-0">
                            <v-list-item-title class="text-caption grey--text text--darken-1">
                                masukkan password lama
                            </v-list-item-title>
                            <v-list-item-subtitle class="py-2">
                                <v-text-field :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showOldPassword = !showOldPassword"
                                    :type="showOldPassword ? 'text' : 'password'" solo flat outlined hide-details="auto"
                                    single-line v-model="old_password">
                                </v-text-field>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="py-0">
                        <v-list-item-content class="py-0">
                            <v-list-item-title class="text-caption grey--text text--darken-1">
                                masukkan password baru
                            </v-list-item-title>
                            <v-list-item-subtitle class="py-2">
                                <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showPassword = !showPassword"
                                    hint='password tidak boleh sama dengan password lama'
                                    :type="showPassword ? 'text' : 'password'" solo flat outlined hide-details="auto"
                                    single-line v-model="new_password">
                                </v-text-field>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="d-flex justify-center">
                                <v-btn :disabled="disButton" @click="updatePassword" color="primary"
                                    :loading="isLoading" class="py-6 px-7">
                                    ubah password</v-btn>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <!-- dialog update -->
        <v-dialog persistent v-model="dialog" width="350">
            <v-card elevation="0">
                <v-card-title class="d-flex justify-center">
                    <video ref="myvideo" width="200" height="200" src="../assets/order-success.mp4"></video>
                </v-card-title>
                <v-card-subtitle
                    class="d-flex justify-center text-caption blue-grey--text text--darken-3 font-weight-bold">
                    Berhasil Update Password
                </v-card-subtitle>
                <v-card-actions class="d-flex flex-column">
                    <v-btn color="error" text @click="dialog = false">Kembali</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data() {
        return {
            showPassword: false,
            showOldPassword: false,
            isLoading: false,
            old_password: '',
            new_password: '',
            dialog: false,
            disButton: true,
        }
    },
    mounted() {
    },
    watch: {
        new_password() {
            this.new_password.length > 7 && this.old_password.length > 7 && this.old_password != this.new_password
                ? this.disButton = false : this.disButton = true
        }
    },
    methods: {
        updatePassword() {
            this.isLoading = true;
            if(this.$store.state.userEmail == "vorxsaken@vorxsaken.com"){
                this.loading = false;
                return;
            }

            const user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                this.$store.state.userEmail,
                this.old_password
            )

            user.reauthenticateWithCredential(credential).then(() => {
                user.updatePassword(this.new_password).then(() => {
                    setTimeout(() => {
                        this.$refs.myvideo.play();
                    }, 300)
                    this.isLoading = false;
                    this.dialog = true;
                    this.new_password = '';
                    this.old_password = '';
                }).catch((err) => {
                    console.log('update password error :', err);
                })
            }).catch((err) => {
                console.log('reauthenticate error :', err)
            })

        }
    },
    beforeDestroy() {
        if (this.$route.name == "Kategori") {
            return true;
        }
        this.$store.state.backCounter = 1;
        return;
    },

}
</script>

<style>

</style>