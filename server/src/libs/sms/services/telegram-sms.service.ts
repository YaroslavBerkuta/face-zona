import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
  TELEGRAM_API_URL,
  TELEGRAM_BOT_API_KEY,
  TELEGRAM_CHANEL_ID,
} from "../config";
import { ISendPayload, ISmsService } from "../interfaces";

@Injectable()
export class TelegramSmsService implements ISmsService {
  public async send(options: ISendPayload) {
    const telegramMessage = `
                <b>Send code to:</b>
                <b>User phone: <i>${options.to}</i></b>
                <b>From: <i>RWS Tasker</i></b>
                Message: ${options.text}
                `;

    try {
      await this.sendMessageToChanel(telegramMessage);
    } catch (e) {
      console.log("Send sms errors", e);
    }
  }

  private getTelegramUrl = () => {
    return `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_API_KEY}/sendMessage`;
  };

  private sendMessageToChanel = (message: string) => {
    return axios.post(
      this.getTelegramUrl(),
      {},
      {
        params: {
          chat_id: TELEGRAM_CHANEL_ID,
          text: message,
          parse_mode: "html",
        },
      }
    );
  };
}
