import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import homeIcon from '@/components/homeIcon.vue';
import pesananIcon from "../components/pesananIcon.vue";
import favoritIcon from "../components/favoritIcon.vue";
import profilIcon from "../components/profilIcon.vue";
import cartIcon from "../components/cartIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            home: {
                component: homeIcon
            },
            pesanan: {
                component: pesananIcon
            },
            favorit: {
                component: favoritIcon
            },
            profil: {
                component: profilIcon
            },
            cart: {
                component: cartIcon
            }
        }
    }
});
