import Lib from "jsonapi-serializer";
import HttpError from '../errors/http-error'

export default class Serializer {
  type = "reply";
  attributes = ["reply"];
  relationships = {};

  serialize = (data, meta = {}): any => {
    try {
      const Serializer = new Lib.Serializer(this.type, {
        attributes: this.attributes,
        meta,
        ...this.relationships,
      });
      return Serializer.serialize(data);
    } catch (e) {
      throw new HttpError(500, 'Internal Server Error')
    }
  };

  deserialize = (data): any => {
    try {
      return new Lib.Deserializer({
        keyForAttribute: "camelCase",
      }).deserialize(data);
    } catch (e) {
      throw new HttpError(500, 'Internal Server Error')
    }
  };
}
