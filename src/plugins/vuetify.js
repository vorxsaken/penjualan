import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import homeIcon from '@/components/homeIcon.vue';
import pesananIcon from "../components/pesananIcon.vue";
import favoritIcon from "../components/favoritIcon.vue";
import profilIcon from "../components/profilIcon.vue";
import cartIcon from "../components/cartIcon.vue";
import expressIcon from "../components/expressIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
        }
    },
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
            },
            express: {
                component: expressIcon
            }
        }
    }
});
