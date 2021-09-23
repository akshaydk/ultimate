import Lib from 'jsonapi-serializer'

export default class Serializer {
  type = 'reply'
  attributes = ['reply']
  relationships = {}

  serialize = (data: object, meta: object = {}) => {
    try{
      const Serializer = new Lib.Serializer(this.type, {
        attributes: this.attributes,
        meta,
        ...this.relationships
      })
      return Serializer.serialize(data)
    }catch(e){
      console.log(e)
    }
  }

  deserialize = (data: object): Object => {
    try{
      return new Lib.Deserializer({
        keyForAttribute: 'camelCase'
      }).deserialize(data)
    }catch(e){
      console.log(e)
    }
  }
}