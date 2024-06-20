import {describe, expect, it } from '@jest/globals';
import request from "supertest"
import { app } from "../../../app"


describe("staffLogin controller", () => {

  it('Should return 400 status code for incorrect input', async () => {
    const res = request(app).post("/api/v1/staff/login").send({
        email: "",
        password:""
    });

    expect((await res).statusCode).toEqual(400)
  });

  it('Should return 400 status code for incorrect input', async () => {
    const res = request(app).post("/api/v1/staff/login").send({
        email: "example@email"
    });

    expect((await res).statusCode).toEqual(400)
  });
});
