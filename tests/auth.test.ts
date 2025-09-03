import { FastifyInstance } from "fastify";
import { buildApp } from "../src/app.ts";

describe("Auth routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    if(app) await app.close();
  });

  test("Login should work", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com", password: "teste" },
    });

    expect(response.statusCode).toBe(201);
  })

  test("Login without email should fail", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { password: "teste" },
    });

    expect(response.statusCode).toBe(400);
  });

  test("Login without password should fail", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com" },
    });

    expect(response.statusCode).toBe(400);
  });

  test("Login with incorrect password", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste.com", password: "test123" },
    });

    expect(response.statusCode).toBe(500);
  });

  test("Login with incorrect email", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email: "teste@teste123.com", password: "test" },
    });

    expect(response.statusCode).toBe(500);
  });
});
