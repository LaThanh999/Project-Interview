import { createRouter, createWebHistory } from "vue-router";
import ListItem from "@/components/ListItem.vue";
import FormInput from "@/components/FormInput.vue";
import { paths } from "@/constants/path";
const routes = [
  {
    component: FormInput,
    path: paths.home,
    name: "index",
    meta: { title: "Project Interview" },
  },
  {
    component: ListItem,
    path: paths.listItem,
    name: "listItem",
    meta: { title: "Project Interview" },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach((to) => {
  const baseTitle = "Project Interview";
  if (to.name === "index") {
    document.title = baseTitle;
  } else {
    document.title = `${to.meta.title} | ${baseTitle}`;
  }
});
export default router;
//# sourceMappingURL=router.js.map
