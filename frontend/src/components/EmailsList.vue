<template>
  <div>
    <h2>Emails List</h2>
    <!-- Display emails list here -->
    <div v-for="email in emails" :key="email.id">
      {{ email.subject }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emails: [], // Fetch emails for the selected folder
    };
  },
  created() {
    // Fetch emails when component is created
    this.fetchEmails();
  },
  methods: {
    async fetchEmails() {
      // Fetch emails from backend
      try {
        const response = await this.$axios.get(`/api/emails/${this.$route.params.folderId}`);
        this.emails = response.data;
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    },
  },
};
</script>