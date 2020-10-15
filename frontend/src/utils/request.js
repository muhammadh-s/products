const axios = require("axios").default;

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export default {
  common: {
    getAllProduct(token) {
      return apiClient.get('/common/get', {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    getProductDetails(token, id) {
        return apiClient.get(`/common/get/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      },
  },
  auth: {
    userLogin(payload) {
      return apiClient.post("/auth/login/", payload);
    },
  },
};
