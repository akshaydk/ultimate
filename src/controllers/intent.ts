import { Response, Request, NextFunction } from "express";
import Serializer from "../serializers/intent";
import Service from "../services/intent";

export default class Controller {
  intent = async (req: Request, res: Response) => {
    const service = this._getService();
    const serializer = this._getSerializer();
    const body = req.body;

    try {
      const deserializedBody = await serializer.deserialize(body);
      const result = await service.getIntent(deserializedBody);
      const serializedResponse = await serializer.serialize({ reply: result });

      return res.status(200).json(serializedResponse);
    } catch (e) {
      console.log("error!!!");
      return res.status(500).json("Error while processing the request.");
    }
  };

  private _getService(): Service {
    return new Service();
  }
  private _getSerializer(): Serializer {
    return new Serializer();
  }
}
