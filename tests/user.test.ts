import { FastifyInstance } from "fastify";
import { buildApp } from "../src/app.ts";

describe("User routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  test("Retrive users should work", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com", password: "teste" },
    });
    const body = JSON.parse(loginResponse.body);
    const accessToken = body.data.accessToken;

    const response = await app.inject({
      method: "GET",
      url: "/v1/users",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test("Retrive users by id should work", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com", password: "teste" },
    });
    const body = JSON.parse(loginResponse.body);
    const accessToken = body.data.accessToken;

    const userId = "1f687d44-ca22-4e20-9b06-8cac4832d4c1"
    const response = await app.inject({
      method: "GET",
      url: `/v1/users/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.statusCode).toBe(200);
  });

  test("Retrive users by incorrect id should fail", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com", password: "teste" },
    });
    const body = JSON.parse(loginResponse.body);
    const accessToken = body.data.accessToken;

    const userId = "1"
    const response = await app.inject({
      method: "GET",
      url: `/v1/users/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.statusCode).toBe(500);
  });
});
