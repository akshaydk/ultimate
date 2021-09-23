import fetch from "node-fetch";
import * as faker from "faker";
import Lib from "../intent";

let lib;
const { Response } = jest.requireActual("node-fetch");

jest.mock("node-fetch", () => jest.fn());

beforeAll(() => {
  lib = new Lib();
});

describe("#Get Intent", () => {
  it("handles susscessful repsonse from the API", async () => {
    const body = {
      botId: faker.datatype.string(10),
      message: faker.datatype.string(10),
    };
    const expected = {
      intents: [
        {
          confidence: 0.999990701675415,
          name: "Greeting",
        },
        {
          confidence: 0.000008325902854267042,
          name: "Means or need to contact ",
        },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(expected))
    );

    const res = await lib.get(body);
    expect(JSON.stringify(res)).toBe(JSON.stringify(expected));
  });

  it("raise and exception with API response bad request", async () => {
    const body = {
      botId: faker.datatype.string(10),
      message: faker.datatype.string(10),
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response("", {
          status: 400,
          statusText: "Bad Request",
        })
    );

    expect(async () => { await lib.get(body)}).toThrowError
  });

  it("raise and exception with API response is unauthorized", async () => {
    const body = {
      botId: faker.datatype.string(10),
      message: faker.datatype.string(10),
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response("", {
          status: 403,
          statusText: "Unauthorized",
        })
    );

    expect(async () => await lib.get(body)).toThrowError
  });
});
