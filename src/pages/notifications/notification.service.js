import api from "../../api";

const notificationService = {

  list(params = {}) {
    return api.get("/notifications", { params });
  },

  unreadCount() {
    return api.get("/notifications/unread-count");
  },

  markRead(id) {
    return api.post(`/notifications/${id}/read`);
  },

  markAllRead() {
    return api.post("/notifications/read-all");
  }

};

export default notificationService;