import Vue from 'vue';

import app from './app.vue'
import generalHelpers from './helpers/general-helpers';

Vue.use(generalHelpers);

new Vue({
	el: '#vue-app',
	components: {
		app: app
	}
});