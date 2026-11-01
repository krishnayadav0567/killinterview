# Developer Interview Master

## Run the Java Practice Ground

The project is a static frontend with a small Node.js proxy for the Judge0 Java execution API. The proxy keeps Judge0 credentials out of browser code.

1. Copy `.env.example` to `.env`.
2. Configure `JUDGE0_URL` and `JUDGE0_LANGUAGE_ID` in `.env`. For the local Judge0 image used in this workspace, Java is language ID `62` (`Java (OpenJDK 13.0.1)`). Confirm the ID with `GET /languages` when using a different Judge0 version. Add `JUDGE0_AUTH_TOKEN` or the RapidAPI variables only when your Judge0 host requires them.
3. Start the app:

```bash
node server.js
```

4. Open `http://localhost:3000/topics.html` and choose **Java Practice Ground**.

The compiler proxy submits Java code to Judge0 at `POST {JUDGE0_URL}/submissions`, then polls the returned token until the result is complete. The AI review route remains `/api/java/check` until an AI endpoint and response format are configured.

## Run Judge0 locally

The linked `janishar/api` repository is an older Judge0 API fork. Its Docker Compose setup runs the API and worker with PostgreSQL and Redis, and the API/worker containers require privileged Docker execution for the sandbox. In this Apple Silicon workspace, the Compose file builds `Dockerfile.apple-silicon`, which disables only isolate's address-space limit for Java language 62. The legacy OpenJDK 13 VM otherwise fails during startup under Docker Desktop/Rosetta even though the Java source is valid. In that repository:

```bash
git clone https://github.com/janishar/api.git
cd api
cp judge0-api.conf.default judge0-api.conf
# Edit docker-compose.yml and publish the container's port 3000 as host port 2358:
# ports:
#   - "2358:3000"
docker compose up -d
```

The fork exposes port `3000` inside its API container. Publish it as host port `2358` so this project can continue running on its default port `3000`, then set `JUDGE0_URL=http://localhost:2358` in this project's `.env`. A local Judge0 URL will not work from Netlify; production must use a publicly reachable Judge0 host or a private network path available to the deployed function. Before using the fork in production, review its old Rails/Docker dependencies and GPL-3.0 license. The current upstream Judge0 project is preferable for a new deployment.

For Netlify, configure these Function environment variables and redeploy:

```text
JUDGE0_URL=https://your-public-judge0-host
JUDGE0_LANGUAGE_ID=62
JUDGE0_AUTH_TOKEN=          # only if your host requires it
RAPIDAPI_KEY=               # only for a RapidAPI deployment
RAPIDAPI_HOST=              # only for a RapidAPI deployment
```

Do not set `JUDGE0_URL` to `localhost` in Netlify: it refers to the Netlify runtime, not your computer. If a self-hosted Judge0 API is publicly reachable, protect it with authentication and network controls; Judge0 executes untrusted code in its worker sandbox, but the API itself should not be left open unintentionally.

## Java submissions

The Practice Ground has two separate actions:

- **Run code** executes the program once with the editor input for debugging.
- **Submit solution** calls `/api/java/judge`, executes the question's complete automated test suite, and marks the question complete only for `accepted`.

The judge keeps expected output on the server in `server/practice-test-cases.js`. It supports explicit question metadata in this shape when a question needs custom cases:

```js
testCases: [
  { input: "", expectedOutput: "42", hidden: false },
  { input: "", expectedOutput: "42", hidden: true }
]
```

Until explicit cases are added, deterministic standalone questions use their existing example output as one visible setup-based case. The current catalog has 172 deterministic standalone questions. Spring Boot questions, nondeterministic examples, external-resource tasks, and ambiguous contracts return `manual_review` rather than a false Accepted/Wrong Answer verdict. Setup-based cases intentionally use empty stdin because the generated starter programs describe hardcoded values in their instructions instead of a standard-input contract.

Run the built-in regression tests with:

```bash
node --test test/java-judge.test.js
```

Never commit `.env` or place API keys in frontend JavaScript.