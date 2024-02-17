import { createRouter, createWebHashHistory } from 'vue-router';
import Welcome from '../components/Welcome.vue';
import InboxFolders from '../components/InboxFolders.vue';
import EmailsList from '../components/EmailsList.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/folders', component: InboxFolders },
  { path: '/emails/:folderId', component: EmailsList },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
