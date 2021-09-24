import Serializer from '../intent';

let serializer;

beforeAll(() => {
  serializer = new Serializer();
});

describe('Intent Serializer Tests', () => {
  it('should be of type reply', () => {
    expect(serializer.type).toBe('reply');
  });

  it('should return the correct number of attributes', () => {
    expect(serializer.attributes).toHaveLength(1);
  });

  it('should return the attributes', () => {
    const expected = ['reply'];
    expect(serializer.attributes).toEqual(expected);
  });
});
