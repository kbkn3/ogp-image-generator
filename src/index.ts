import { Hono } from "hono";
import gensya from "./gensya";
import { logger } from "hono/logger";

const app = new Hono()
	.use("*", logger())
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.route("gensya", gensya);

export default app;
export type AppType = typeof app;
