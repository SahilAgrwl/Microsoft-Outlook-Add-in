import axios from 'axios';

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axios.create({
      baseURL: 'http://localhost:3000', // Replace with your backend URL
    });
  },
};
