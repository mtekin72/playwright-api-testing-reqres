import { test, expect } from "@playwright/test";
import {
  createUser,
  listUsers,
  singleUser,
  singleUserNotFound,
  updateUser,
  deleteUser,
} from "@helpers/api";
import { newUser, updatedUser, user1, user2 } from "@fixtures/testData";

test.describe("User API", () => {
  test("should create a user with valid data @smoke @regression @e2e ", async ({ request }) => {
    const { status, data: user } = await createUser(request, newUser);
    expect(status).toBe(201);
    expect(user.name).toBe(newUser.name);
    expect(user.job).toBe(newUser.job);
    expect(user).toHaveProperty("id");
  });

  test("should return list of users for page 2 @regression @e2e ", async ({ request }) => {
    const { status, data: users } = await listUsers(request);
    expect(status).toBe(200);
    expect(users.data[1].first_name).toEqual(user1.first_name);
    expect(users.data[1].last_name).toEqual(user1.last_name);
    expect(users.data[1].email).toEqual(user1.email);
  });

  test("should return details of a specific user by ID @smoke @regression @e2e ", async ({ request }) => {
    const { status, data: user } = await singleUser(request, 2);
    expect(status).toBe(200);
    expect(user.data.first_name).toEqual(user2.first_name);
    expect(user.data.last_name).toEqual(user2.last_name);
    expect(user.data.email).toEqual(user2.email);
  });

  test("should return 404 for non-existing user @regression @e2e ", async ({ request }) => {
    const { status, data: user } = await singleUserNotFound(request, "/api/users/23");
    expect(status).toBe(404);
    expect(user).toEqual({});
  });

  test("should update user details successfully @smoke @regression @e2e ", async ({ request }) => {
    const { status, data: user } = await updateUser(request, 2, updatedUser);
    expect(status).toBe(200);
    expect(user.name).toEqual(updatedUser.name);
    expect(user.job).toEqual(updatedUser.job);
  });

  test("should delete user and return 204 status @smoke @regression @e2e ", async ({ request }) => {
    const { status } = await deleteUser(request, 5);
    expect(status).toBe(204);
  });
});