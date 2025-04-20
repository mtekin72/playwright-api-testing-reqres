import { test, expect } from "@playwright/test";
import {
  register,
  unsuccessfulRegister,
  login,
  loginUnsuccessful,
} from "@helpers/api";
import {
  registerUser,
  unsuccessfulRegisterUser,
  loginUser,
  unsuccessfulLoginUser,
} from "@fixtures/testData";

test.describe("Auth API", () => {
  test("should register user with valid credentials @smoke @regression @e2e", async ({ request }) => {
    const { status, data } = await register(request, registerUser);
    expect(status).toBe(200);
    expect(data.id).toBe(4);
    expect(data.token).toBeDefined();

    if (process.env.TOKEN) {
      expect(data.token).toBe(process.env.TOKEN);
    } else {
      console.warn("⚠️ TOKEN env variable not set — skipping exact match check.");
    }
  });

  test("should fail to register user with missing password @regression @e2e", async ({ request }) => {
    const { status, data } = await unsuccessfulRegister(request, unsuccessfulRegisterUser);
    expect(status).toBe(400);
    expect(data.error).toBe("Missing password");
  });

  test("should login user with correct credentials @smoke @regression @e2e", async ({ request }) => {
    const { status, data } = await login(request, loginUser);
    expect(status).toBe(200);
    expect(data.token).toBeDefined();

    if (process.env.TOKEN) {
      expect(data.token).toBe(process.env.TOKEN);
    } else {
      console.warn("⚠️ TOKEN env variable not set — skipping exact match check.");
    }
  });

  test("should fail to login with missing password @smoke @regression @e2e", async ({ request }) => {
    const { status, data } = await loginUnsuccessful(request, unsuccessfulLoginUser);
    expect(status).toBe(400);
    expect(data.error).toBe("Missing password");
  });
});
