import { useEffect, useState } from "react";
import notificationService from "./notification.service";
import NotificationItem from "./NotificationItem";
import "../../styles/notification.css";

export default function NotificationsPage() {

  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (next = false) => {

    if (loading) return;

    setLoading(true);

    try {

      const res = await notificationService.list({
        cursor: next ? cursor : null
      });

      const data = res.data.data;

      setItems(prev =>
        next ? [...prev, ...data.items] : data.items
      );

      setCursor(data.next_cursor);

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="notifications-page">

      <div className="page-title">
        Notifications
      </div>

      {items.map(n => (
        <NotificationItem key={n.id} notification={n} />
      ))}

      {cursor && (
        <button
          className="load-more"
          onClick={() => load(true)}
        >
          Load more
        </button>
      )}

      {!items.length && !loading && (
        <div className="empty-state">
          No notifications yet
        </div>
      )}

    </div>

  );

}