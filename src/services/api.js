import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL_API;
// const BASE_URL = "http://localhost:2000";

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

  patch(url, data) {
    return axios.patch(`${BASE_URL}${url}`, data, {
      headers: this._createAuthHeaders(),
    });
  }

  delete(url) {
    return axios.delete(`${BASE_URL}${url}`, {
      headers: this._createAuthHeaders(),
    });
  }

  _createAuthHeaders() {
    return {
      "Auth-Token": localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Header": "*",
    };
  }
}

export default new API();
