import fetch from "node-fetch";
import { IntentBody } from "types/IntentBody";
import HttpError from "../errors/http-error";

const { path, API_VALUE } = process.env;

export default class {
  async get(body: IntentBody): Promise<JSON> {
    const method = "POST";

    const res = await fetch(path, {
      method: method,
      body: JSON.stringify(body),
      headers: this._getHeaders(),
    });

    if (!res.ok) {
      throw new HttpError(res.status, res.statusText)
    }
    return res.json();
  }

  private _getHeaders(): {[K: string]: string} {
    return {
      "Content-Type": "application/json",
      Authorization: API_VALUE,
    };
  }
}
