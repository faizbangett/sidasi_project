import "dotenv/config";
import { createApp } from "./app";
import { PORT, validateEnv } from "./config/env";

validateEnv();

const app = createApp();

app.listen(PORT, () => {
  console.log(`[Server] running at http://localhost:${PORT}`);
});
