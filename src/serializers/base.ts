import Lib from 'jsonapi-serializer';
import HttpError from '../errors/http-error';
import { DeserialisedBodyMap, SerializedBodyMap } from '../types/IntentBody';

export default class Serializer {
  type = '';
  attributes: Array<string> = [];
  relationships = {};

  serialize = <k extends keyof SerializedBodyMap>(
    _kind: k,
    data: SerializedBodyMap[k],
    meta = {}
  ): Promise<JSON> => {
    try {
      const Serializer = new Lib.Serializer(this.type, {
        attributes: this.attributes,
        meta,
        ...this.relationships,
      });
      return Serializer.serialize(data);
    } catch (e) {
      throw new HttpError(500, 'Internal Server Error');
    }
  };

  deserialize = <k extends keyof DeserialisedBodyMap>(
    _kind: k,
    data: JSON
  ): Promise<DeserialisedBodyMap[k]> => {
    try {
      return new Lib.Deserializer({
        keyForAttribute: 'camelCase',
      }).deserialize(data);
    } catch (e) {
      throw new HttpError(500, 'Internal Server Error');
    }
  };
}
