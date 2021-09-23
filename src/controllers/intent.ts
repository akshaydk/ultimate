import { Response, Request, NextFunction } from "express";
import Serializer from "../serializers/intent";
import Service from "../services/intent";
import isEmpty from "lodash/isEmpty";
import HttpError from "../errors/http-error";

type Body = {
  botId: string;
  message: string;
};

export default class Controller {
  intent = async (req: Request, res: Response) => {
    const service = this._getService();
    const serializer = this._getSerializer();
    const body = req.body;

    try {
      const deserializedBody: Body = await serializer.deserialize(body);

      if (isEmpty(deserializedBody["botId"])) {
        throw new HttpError(422, 'Bot Id cannot be empty');
      }

      const result = await service.getIntent(deserializedBody);
      const serializedResponse = await serializer.serialize({ reply: result });

      return res.status(200).json(serializedResponse);
    } catch (e) {
      console.log(e);
      return res.status(e.code).json(e.message);
    }
  };

  private _getService(): Service {
    return new Service();
  }
  private _getSerializer(): Serializer {
    return new Serializer();
  }
}
