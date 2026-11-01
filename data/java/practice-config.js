/* Java Practice Ground API configuration.
 * The Java routes proxy requests to the server-side Judge0 integration.
 * Keep private Judge0 credentials on the server; do not put secrets in this browser file.
 */
window.JAVA_PRACTICE_CONFIG = {
  compileEndpoint: "/api/java/compile",
  judgeEndpoint: "/api/java/judge",
  aiCheckEndpoint: "/api/java/check",
  localProxyPort: 3000,
  requestHeaders: {
    "Content-Type": "application/json"
  },
  includeCredentials: false
};