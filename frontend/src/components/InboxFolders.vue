<!-- InboxFolders.vue -->
<template>
  <div>
    <h2>Email Inbox Folders</h2>
    <ul>
      <li v-for="folder in folders" :key="folder.id">
        <router-link :to="'/emails/' + folder.id">{{ folder.displayName }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      folders: [],
    };
  },
  created() {
    this.fetchInboxFolders();
  },
  methods: {
    async fetchInboxFolders() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/inboxfolders', {
          headers: {
            Authorization: `Bearer ${this.$route.query.access_token}`,
          },
        });

        this.folders = response.data;
      } catch (error) {
        console.error('Error fetching inbox folders:', error);
      }
    },
  },
};
</script>

<style>
/* Add your component styles here */
</style>
