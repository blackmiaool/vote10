import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import CreatePage from "./components/CreatePage.vue";
import DetailPage from "./components/DetailPage.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/create",
        },
        {
            path: "/create",
            name: "create",
            component: CreatePage,
        },
        {
            path: "/detail",
            name: "detail",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: DetailPage,
        },
    ],
});
