import {app} from "./app";
import { env } from "./config/env";
const PORT = env.PORT || 3000;
export const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
