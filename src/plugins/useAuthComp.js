import { useRouter } from "vue-router";
import { useAuth } from "@websanova/vue-auth/src/v3.js";

export default function useAuthComp() {
    const auth   = useAuth();
    const router = useRouter();

    function fetch(data) {
      return auth.fetch(data);
    }

    function refresh(data) {
      return auth.refresh(data);
    }

    function login(data) {
      data = data || {};

      return new Promise((resolve, reject) => {
        auth.login({
		      url: "auth/login",
          data: data.body,
          remember: data.remember,
          staySignedIn: data.staySignedIn,
          fetchUser: data.fetchUser,
          redirect: "/profile"
        })
        .then((res) => {
          if (data.remember) {
            auth.remember(JSON.stringify({
              name: res.data.user.first_name
            }));
          }

          router.push({ name: "profile" });
          resolve(res);
        }, reject);
      });
    };

    function impersonate(data) {
      return auth.impersonate({
        url: 'auth/' + data.user.id + '/impersonate',
        redirect: {
          name: 'user-account'
        }
      });
    }

    function unimpersonate() {
      return auth.unimpersonate({
        redirect: { name: 'admin-users' }
      });
    }

    function logout() {
      return auth.logout();
    }

    function user() {
      return auth.user();
    }

    function impersonating() {
      return auth.impersonating();
    }

    return {
        fetch,
        refresh,
        login,
        impersonate,
        unimpersonate,
        logout,
        user,
        impersonating,
    }
}