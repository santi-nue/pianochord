import { Signal, signal } from "@preact/signals";

export type NotificationItem = {
    id: number,
    text: string,
}

const notifications: Signal<NotificationItem[]> = signal([]);

const addNotification = (text: string, duration: number) => {
    const id = Math.floor(Math.random() * 1000000)
    notifications.value = [...notifications.value, { id, text }]
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(id)
        }, duration)
    }
}

const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(x => x.id != id)
}

export { notifications, addNotification, removeNotification }