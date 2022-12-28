import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
  TELEGRAM_API_URL,
  TELEGRAM_BOT_API_KEY,
  TELEGRAM_CHANEL_ID,
} from "../config";
import { IMailerService, ISendPayload } from "../typing";

@Injectable()
export class TelegramMailerService implements IMailerService {
  public async send(options: ISendPayload) {
    const telegramMessage = `
                <b>EMAIL</b>
                ${options.from ? `<b>${options.from}</b>` : ""}
                <b>Send to:</b>
                <b>User email: <i>${options.to}</i></b>
                Message: ${options.text}
                `;

    try {
      await this.sendMessageToChanel(telegramMessage);
    } catch (e) {
      console.log("Send email errors", e);
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
