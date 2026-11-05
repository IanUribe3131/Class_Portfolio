import { EmailChannel } from "../channels/EmailChannel";
import { SlackChannel } from "../channels/SlackChannel";
import { SmsChannel } from "../channels/SmsChannel";

export class ChannelFactory {
    static createChannel(type){
        switch (type){
            case 'SMS':
                return new SmsChannel;
            case 'EMAIL':
                return new EmailChannel;
            case 'SLACK':
                return new SlackChannel;
            default:
                throw new Error("Unsupported channel type!");
        }
    }
}