import { Component } from "preact";

import {
  NotificationItem,
  notifications,
  removeNotification,
} from "@/libs/notification.ts";
import { X } from "@/components/icon/X.tsx";

type NotificationProps = {};

type NotificationState = {};

export default class Notification
  extends Component<NotificationProps, NotificationState> {
  constructor(props: NotificationProps) {
    super(props);
  }

  render() {
    return (
      <div className="notification-container">
        {notifications.value.map((notification) => (
          <div className="notification">
            {notification.text}
            <X
              size={20}
              onClick={() => {
                removeNotification(notification.id);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export type { NotificationItem };
