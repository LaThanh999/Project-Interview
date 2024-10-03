import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

import ListItem from "@/components/ListItem.vue";
import FormInput from "@/components/FormInput.vue";
import { paths } from "@/constants/path";

const routes: Array<RouteRecordRaw> = [
  {
    component: FormInput,
    path: paths.home,
    name: "index",
  },
  {
    component: ListItem,
    path: paths.listItem,
    name: "listItem",
    meta: { title: "Examples" },
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const baseTitle = "Vue + TypeScript + Vite";

  if (to.name === "index") {
    document.title = baseTitle;
  } else {
    document.title = `${to.meta.title} | ${baseTitle}`;
  }
});

export default router;
