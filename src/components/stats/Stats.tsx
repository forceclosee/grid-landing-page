import { actions } from "astro:actions";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/solid-query";
import { Switch, Match, For } from "solid-js";
import type { JSX, Component } from "solid-js";
import { Plus, Sparkle, ArrowRight, TrendingUp } from "lucide-solid";

import { classList } from "@utils/class-list";

import Card from "./Card";

const queryClient = new QueryClient();

function StatsContent() {
	const query = useQuery(() => ({
		queryKey: ["stats"],
		queryFn: async () => {
			const { data, error } = await actions.getStats();
			if (error) {
				throw error;
			}
			return data;
		},
	}));

	// display stat number with compact notation
	function formatNumber(num: number) {
		return new Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 2,
		}).format(num);
	}

	// Icon mapping to render icon dynamically based on name
	const iconMapping: Record<
		string,
		Component<JSX.SvgSVGAttributes<SVGSVGElement>>
	> = {
		"Students reached": Sparkle,
		"Schools partnered": Plus,
		"Teachers trained": ArrowRight,
		"Graduation lift": TrendingUp,
	};

	return (
		<div
			class={classList(
				"grid inline-full max-inline-[26rem] mx-auto md:max-inline-[50rem]",
				query.isSuccess
					? "md:grid-cols-[1fr_1fr]"
					: "place-content-center py-8 border-border lg:border-e",
			)}>
			<Switch>
				<Match when={query.isPending}>
					<div class="loader"></div>
				</Match>
				<Match when={query.isError}>
					<div class="text-red-300">{query.error?.message}</div>
				</Match>
				<Match when={query.isSuccess}>
					<For each={query.data}>
						{(item) => (
							<Card
								icon={iconMapping[item.name]}
								stat={formatNumber(item.stat)}
								name={item.name}
								description={item.description}
								haveX={item.name === "Graduation lift"}
							/>
						)}
					</For>
				</Match>
			</Switch>
		</div>
	);
}

export default function Stats() {
	return (
		<QueryClientProvider client={queryClient}>
			<StatsContent />
		</QueryClientProvider>
	);
}
