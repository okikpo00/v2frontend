import api, { setAccessToken, clearSession } from "../api";

/* AUTH SERVICE — NO UI, NO STATE */

const authService = {
  async login(payload) {
    const res = await api.post("/auth/login", payload);

    const { accessToken } = res.data.data;
    setAccessToken(accessToken);

    return res;
  },

  async refresh() {
    const res = await api.post("/auth/refresh");

    const { accessToken } = res.data.data;
    setAccessToken(accessToken);

    return res;
  },

  async register(payload) {
    return api.post("/auth/register", payload);
  },

  async getMe() {
    return api.get("/auth/me");
  },

  async verifyEmail(payload) {
    return api.post("/auth/verify-email", payload);
  },

  async resendVerification(email) {
    return api.post("/auth/send-verify-email", { email });
  },

  async forgotPassword(data) {
    return api.post("/auth/forgot-password",  data );
  },

  async resetPassword(payload) {
    return api.post("/auth/reset-password", payload);
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearSession();
    }
  },
};

export default authService;