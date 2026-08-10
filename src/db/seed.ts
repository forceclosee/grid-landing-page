import { db } from "@db/index";
import { stats } from "@db/schema";

async function seedData() {
	const stat: (typeof stats.$inferInsert)[] = [
		{
			stat: 2400000,
			name: "Students reached",
			description: "Across 31 countries since 2011.",
		},
		{
			stat: 1284,
			name: "Schools partnered",
			description: "In 14 countries, from Kenya to Guatemala.",
		},
		{
			stat: 38000,
			name: "Teachers trained",
			description: "Equipped with modern tools and methodology.",
		},
		{
			stat: 3.1,
			name: "Graduation lift",
			description: "Partner schools outperform national averages 3x.",
		},
	];

	await db.insert(stats).values(stat);
}

seedData();
