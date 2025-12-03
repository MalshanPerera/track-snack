import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_LAST_FM_API_KEY: z.string().min(1).optional(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
