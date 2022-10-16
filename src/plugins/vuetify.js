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
            light: {
                baseText: '#1b1d3b',
                background : '#ffffff',
                textfieldBackground: '#ededed',
                whiteTheme: '#000000',
                blueGrayTheme: "#23243d",
                imagePlaceHolder: '#23243d',
                cardBackground: '#ffffff'
              },
              dark: {
                baseText: '#d9dbff',
                background : '#121212',
                textfieldBackground: '#404040',
                whiteTheme: '#ffffff',
                blueGrayTheme: "#dedfff",
                imagePlaceHolder: '#404040',
                cardBackground: '#1e1e1e'
              }
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
