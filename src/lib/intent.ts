import fetch from 'node-fetch'

const {
  path, API_VALUE
} = process.env

export default class {
  async get(body){
    const method = 'POST'
    
    try{
      const res = await fetch(path, {
        method: method,
        body: JSON.stringify(body),
        headers: this._getHeaders()
      })
  
      if(!res.ok){
        throw new Error(`${res.status} return from API.`)
      }
      return res.json()
    }catch(e){
      console.log(e)
    }
  }

  private _getHeaders(){
    return ({
      'Content-Type': 'application/json',
      Authorization: API_VALUE,
    })
  }
}