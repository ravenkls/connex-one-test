import request from "supertest";
import app from "../../app";

describe("routes/index", () => {
  describe("GET /time", () => {
    it("should return 403 error when no auth token is present", async () => {
      const res = await request(app).get("/time");
      expect(res.status).toEqual(403);
    });

    it("should return a JSON object with the epoch time", async () => {
      const res = await request(app)
        .get("/time")
        .set("Authorization", "mysecrettoken");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("epoch");
    });
  });

  // testing /metrics endpoint
  describe("GET /metrics", () => {
    it("responds with 403 if no authorization header", async () => {
      const response = await request(app).get("/metrics");
      expect(response.status).toBe(403);
    });

    it("responds with metrics if authorization header is correct", async () => {
      const response = await request(app)
        .get("/metrics")
        .set("Authorization", "mysecrettoken");

      expect(response.status).toBe(200);
    });
  });
});
