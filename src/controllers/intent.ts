import { Response, Request } from 'express';
import Serializer from '../serializers/intent';
import Service from '../services/intent';
import isEmpty from 'lodash/isEmpty';
import HttpError from '../errors/http-error';
import { IntentBody } from '../types/IntentBody';

export default class Controller {

  
  intent = async (req: Request, res: Response) : Promise<Response>  => {
    //ToDo: Use a better way to initialize the stings. Do not hard code.
    const intentReply = 'intentReply'
    const intentBody = 'intentBody'
    const service = this._getService();
    const serializer = this._getSerializer();
    const body = req.body;

    try {
      const deserializedBody: IntentBody = await serializer.deserialize(
        intentBody,
        body
      );

      if (isEmpty(deserializedBody['botId'])) {
        throw new HttpError(422, 'Bot Id cannot be empty');
      }

      const result = await service.getIntent(deserializedBody);
      const serializedResponse = await serializer.serialize(intentReply, {
        reply: result,
      });

      return res.status(200).json(serializedResponse);
    } catch (e) {
      // console.log(e);
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
