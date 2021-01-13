import { getCookie } from '@/helpers/cookie.js';

const NavigationGuard = function (Router) {

	Router.beforeEach((to, from, next)=> {
		const hasUserToken = !!getCookie("token_user");
		const hasAdminToken = !!getCookie("token_admin");
		if (hasUserToken) {
			next()
			// handle user		
		}
		else if (hasAdminToken) {
			next()
			// handle admin
		}
		else {
			if (to.meta.public){
				next()
			}
			else {
				next("/login")
				// kasih link di halaman login user
				// are you an admin?
				// if so, click here to log in as
			}
		}
	});
}
export default NavigationGuard;