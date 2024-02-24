import axios from "axios";
const BASEURL = import.meta.env.VITE_APP_ROOT_API;

export default (app) => {
	app.axios = axios;
	app.$http = axios;
	app.axios.defaults.baseURL = "http://localhost:3000";

	app.config.globalProperties.axios = axios;
	app.config.globalProperties.$http = axios;
}