import Library from '../../lib/intent';
import Service from '../../services/intent';
import { Reply } from '../../entity/reply';

let lib, service;

beforeAll(async () => {
  lib = new Library();
  service = new Service();
});

describe('getIntent', () => {
  it('returns the reply when intent is found', async () => {
    const body = {
      botId: '5f74865056d7bb000fcd39ff',
      message: 'Hello',
    };
    const expected = {
      intents: [
        {
          confidence: 0.999990701675415,
          name: 'Greeting',
        },
        {
          confidence: 0.000008325902854267042,
          name: 'Means or need to contact ',
        },
      ],
    };

    jest.spyOn(service, '_getReply').mockImplementationOnce(() => 'Hello');
    jest.spyOn(service, '_getLib').mockImplementationOnce(() => lib);
    jest.spyOn(lib, 'get').mockImplementationOnce(() => expected);

    const result = await service.getIntent(body);
    expect(result).toBe('Hello');
  });
});

describe('#private methods', () => {
  it('returns a reply if intent is found in db', async () => {
    const reply = 'How are you doing today?';
    const expectedReply = _createReply('Greeting', reply);

    jest.spyOn(Reply, 'findOne').mockResolvedValueOnce(expectedReply);
    const result = await service._getReply('Hello');
    expect(result).toBe(reply);
  });

  it('returns a default reply if intent is not found in db', async () => {
    const reply = 'Sorry, we could not find what you have asked for.';
    jest.spyOn(Reply, 'findOne').mockResolvedValueOnce(undefined);
    const result = await service._getReply('Hello');
    expect(result).toBe(reply);
  });

  it('return a library object', () => {
    expect(service._getLib()).toBeInstanceOf(Library);
  });
});

const _createReply = (intent: string, message: string): Reply => {
  const reply = new Reply();
  reply.intent = intent;
  reply.reply = message;
  return reply;
};
