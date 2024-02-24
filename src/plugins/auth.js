import { createAuth } from "@websanova/vue-auth/src/v3.js";
import driverAuthBear from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js'
import driverHttpAxios from "@websanova/vue-auth/src/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/src/drivers/router/vue-router.2.x.js";

export default (app) => {
  app.use(
    createAuth({
      plugins: {
        http: app.axios,
        router: app.router,
      },
      drivers: {
        http: driverHttpAxios,
        router: driverRouterVueRouter,
        auth: {
          request: function (req, token) {
            this.drivers.http.setHeaders.call(this, req, {
              Authorization: "Bearer " + token
            });
          },
          response: function (res) {
            var headers = this.drivers.http.getHeaders.call(this, res),
                token = headers.Authorization || res.data.token;

            if (token) {
              token = token.split(/Bearer\:?\s?/i);

              return token[token.length > 1 ? 1 : 0].trim();
            }
          }
        }
      },
      options: {
        fetchData: { url: "users", enabled: true },
        refreshData: {
          url: "users/refresh",
          method: 'GET',
          enabled: false,
          interval: 30
        },
        parseUserData: function (data) {
          let d = data.data;
          if ("attributes" in d) return d.attributes;
          return d;
        },
      },
    })
  );
};
