import notificationService from "./notification.service";
import { useNavigate } from "react-router-dom";

export default function NotificationItem({ notification }) {

  const navigate = useNavigate();

  async function handleClick() {

    if (!notification.read_at) {
      await notificationService.markRead(notification.id);
    }

    /* REDIRECT BASED ON TYPE */

    if (notification.reference_type === "slip") {
      navigate(`/slip/${notification.reference_id}`);
    }

    else if (notification.reference_type === "duel") {
      navigate(`/duel/${notification.reference_id}`);
    }

  }

  return (

    <div
      className={`notification-item ${!notification.read_at ? "unread" : ""}`}
      onClick={handleClick}
    >

      <div className="notification-title">
        {notification.title}
      </div>

      <div className="notification-message">
        {notification.message}
      </div>

      <div className="notification-time">
        {new Date(notification.created_at).toLocaleString()}
      </div>

    </div>

  );

}