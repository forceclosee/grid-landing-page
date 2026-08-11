import { ActionError, defineAction } from "astro:actions";

import { db } from "@db/index";
import { stats } from "@db/schema";

export const server = {
	getStats: defineAction({
		handler: async () => {
			try {
				const statsData = await db.select().from(stats);
				return statsData;
			} catch (error) {
				console.error(`Failed to retrieve data from database: ${error}`);

				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to retrieve stats data",
				});
			}
		},
	}),
};
