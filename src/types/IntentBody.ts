
export interface IntentBody {
  botId: string,
  message: string
}

export interface ItentReply {
  reply: string
}

export interface DeserialisedBodyMap {
  intentBody: IntentBody
}

export interface SerializedBodyMap {
  intentReply: ItentReply
}