# Developer Interview Master

## Run the Java Practice Ground

The project is a static frontend with a small Node.js proxy for the Java compiler API. The proxy keeps the OnlineCompiler REST API key out of browser code.

1. Copy `.env.example` to `.env`.
2. Add your OnlineCompiler REST API key to `ONLINECOMPILER_API_KEY`.
3. Start the app:

```bash
node server.js
```

4. Open `http://localhost:3000/topics.html` and choose **Java Practice Ground**.

The compiler proxy sends Java code to OnlineCompiler's synchronous run endpoint using compiler ID `openjdk-25`. The AI review route remains `/api/java/check` until an AI endpoint and response format are configured.

Never commit `.env` or place API keys in frontend JavaScript.