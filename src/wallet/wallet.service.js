import api from "../api";

/**
 * WALLET SERVICE
 * - No UI
 * - No state
 * - Backend is authority
 */
const walletService = {
  /* =========================
     DEPOSIT
     ========================= */
  initDeposit(amount) {
    return api.post("/wallet/deposit/init", { amount });
  },

    listDeposits({ cursor = null } = {}) {
    return api.get("/wallet/deposit", {
      params: cursor ? { cursor } : {}
    });
  },
  /* =========================
     WITHDRAWALS
     ========================= */
  requestWithdrawal(payload) {
    return api.post("/withdraw/withdraw", payload);
  },

  verifyWithdrawalOtp(payload) {
    return api.post("/withdraw/verify-otp", payload);
  },
  resendWithdrawalOtp(payload) {
  return api.post("/withdraw/resend-otp", payload);
},

  cancelWithdrawal(uuid) {
    return api.post(`/withdraw/${uuid}/cancel`);
  },

  listWithdrawals() {
    return api.get("/withdraw");
  }
};

export default walletService;
