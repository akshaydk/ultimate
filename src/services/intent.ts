import Library from '../lib/intent'
import { Reply } from '../entity/reply'

export default class {
  async getIntent(body){
    const lib = this._getLib()
    try{
      const data = await lib.get(body)
      console.log(body)
      const intent: string = data['intents'][0]['name']
      
      return await this._getReply(intent)
    }catch(e){
      console.log('Error while processing the intent.')
    }
  }

  private async _getReply(intent: string): Promise<string> {
    try{
      let record = await Reply.findOne({
        where: {
           intent
        }
      })
      if(!record){
        return `Sorry, we could not find what you have asked for.`
      }
      return record.reply
    }catch(e){
      console.log(e)
      console.log('Error while fetching the reply')
    }
  }

  private _getLib(): Library{
    return new Library()
  }
}