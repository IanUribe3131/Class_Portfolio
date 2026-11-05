import { INotificationChannel } from "../interfaces/INotificationChannel";

export class SlackChannel extends INotificationChannel {
    async send(recipient, payload) {
        console.log(`Posting to Slack channel ${recipient}: ${payload.SlackBody}`);
        return { success: true, channel: 'Email'};
    }
}