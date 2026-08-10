import { Plus } from "lucide-solid";

import Card from "./Card";

export default function Stats() {
	return (
		<div class="grid lg:grid-cols-2">
			<Card
				icon={Plus}
				stat="1,284"
				name="Schools partnered"
				description="In 14 countries, from Kenya to Guatemala."
			/>
			<Card
				icon={Plus}
				stat="1,284"
				name="Schools partnered"
				description="In 14 countries, from Kenya to Guatemala."
			/>
			<Card
				icon={Plus}
				stat="1,284"
				name="Schools partnered"
				description="In 14 countries, from Kenya to Guatemala."
			/>
			<Card
				icon={Plus}
				stat="1,284"
				name="Schools partnered"
				description="In 14 countries, from Kenya to Guatemala."
			/>
		</div>
	);
}

// fetch data dari database dan ganti placeholder
