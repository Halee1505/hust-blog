"use client";

import axios from "axios";

const apiBase = axios.create();

apiBase.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    if (err?.response?.status === 400) {
      const { title, message } = err?.response?.data?.error?.details || {};
      if (message == "Pharmacy not found") {
        // handle this error in useCartWithOptimalPharmacy()
        return Promise.reject(err);
      }

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default apiBase;
