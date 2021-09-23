import Serializer from "../../serializers/intent";
import httpMocks from "node-mocks-http";
import Controller from "../../controllers/intent";
import Service from "../../services/intent";

let controller, service, req, res, next;

beforeAll(async () => {
  controller = new Controller();
  service = new Service();
});

describe("#GET", () => {
  beforeEach(() => {
    jest.spyOn(controller, "_getService").mockImplementationOnce(() => service);
  });

  it("returns 200 and reply on success", async () => {
    const message = "Hello!";
    const type = "replies";
    jest.spyOn(service, "getIntent").mockImplementationOnce(() => message);

    req = httpMocks.createRequest({
      method: "GET",
      body: {
        data: {
          type: type,
          attributes: {
            botId: "5f74865056d7bb000fcd39ff",
            message: "Hello",
          },
        },
      },
    });

    res = httpMocks.createResponse();
    next = jest.fn();

    await controller.intent(req, res, next);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data["data"]["type"]).toBe(type);
    expect(data["data"]["attributes"]["reply"]).toBe(message);
  });

  it("returns 422 when bot id is not found", async () => {
    const message = "Hello!";
    const type = "replies";
    jest.spyOn(service, "getIntent").mockImplementationOnce(() => message);

    req = httpMocks.createRequest({
      method: "GET",
      body: {
        data: {
          type: type,
          attributes: {
            botId: "",
            message: "Hello",
          },
        },
      },
    });

    res = httpMocks.createResponse();
    next = jest.fn();

    await controller.intent(req, res, next);

    expect(res.statusCode).toBe(422);
  });
});

describe("#private methods", () => {
  it("return a service object", () => {
    expect(controller._getService()).toBeInstanceOf(Service);
  });

  it("return a Serializer object", () => {
    expect(controller._getSerializer()).toBeInstanceOf(Serializer);
  });
});
