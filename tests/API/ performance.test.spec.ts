import { test, expect } from "@playwright/test";

test("should complete 10 parallel requests under 500ms benchmark,@smoke@regression@e2e", async ({ request }) => {
  const timesToRun = 10;
  const benchmarkLimit = 500; // ms
  const start = Date.now();

  const responses = await Promise.all(
    Array.from({ length: timesToRun }, () => request.get("/api/users?page=2"))
  );

  const totalTime = Date.now() - start;
  console.log(`Total time for ${timesToRun} requests: ${totalTime}ms`);

  expect(totalTime).toBeLessThanOrEqual(benchmarkLimit);
});