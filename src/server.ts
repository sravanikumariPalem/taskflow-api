import { env } from "./config/env";
import { app } from "./app";
const server = app.listen(env.PORT, () => {
  console.log(
    `TaskFlow API running at http://localhost:${env.PORT}`
  );
});
export { server };
