import Library from "../lib/intent";
import { Reply } from "../entity/reply";
import HttpError from "../errors/http-error";
import { IntentBody } from "../types/IntentBody";

export default class {
  async getIntent(body: IntentBody): Promise<string> {
    const lib = this._getLib();
    const data = await lib.get(body);
    const intent: string = data["intents"][0]["name"];

    return await this._getReply(intent);
  }

  private async _getReply(intent: string): Promise<string> {
    try {
      const record = await Reply.findOne({
        where: {
          intent,
        },
      });
      if (!record) {
        return `Sorry, we could not find what you have asked for.`;
      }
      return record.reply;
    } catch (e) {
      throw new HttpError(500, "Internal Server Error");
    }
  }

  private _getLib(): Library {
    return new Library();
  }
}
