# Developer Interview Master

## Run the Java Practice Ground

The project is a static frontend with a small Node.js proxy for the Java compiler API. The proxy keeps the OnlineCompiler REST API key out of browser code.

1. Copy `.env.example` to `.env`.
2. Add `ONLINECOMPILER_API_KEY`, `ONLINECOMPILER_RUN_URL`, and `ONLINECOMPILER_COMPILER` to `.env`.
3. Start the app:

```bash
node server.js
```

4. Open `http://localhost:3000/topics.html` and choose **Java Practice Ground**.

The compiler proxy sends Java code to the configured OnlineCompiler synchronous run endpoint. Set the endpoint and compiler identifier in the server environment; they are never placed in browser code. The AI review route remains `/api/java/check` until an AI endpoint and response format are configured.

Never commit `.env` or place API keys in frontend JavaScript.