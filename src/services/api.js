import axios from "axios";

const BASE_URL = "http://localhost:2000";

class API {
  get(url) {
    return axios.get(`${BASE_URL}${url}`, {
      headers: this._createAuthHeaders(),
    });
  }

  post(url, data) {
    return axios.post(`${BASE_URL}${url}`, data, {
      headers: this._createAuthHeaders(),
    });
  }

  _createAuthHeaders() {
    return {
      "Auth-Token": localStorage.getItem("token"),
    };
  }
}

export default new API();
