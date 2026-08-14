import { actions } from "astro:actions";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/solid-query";
import { Switch, Match, For, Index } from "solid-js";
import type { JSX, Component } from "solid-js";
import { Plus, Sparkle, ArrowRight, TrendingUp } from "lucide-solid";

import { classList } from "@utils/class-list";

import Card from "./Card";
import CardSkeleton from "@components/loaders/CardSkeleton";

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
		refetchOnWindowFocus: false,
	}));

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
				"inline-full max-inline-[26rem] md:max-inline-[50rem] grid mx-auto",
				query.isError
					? "place-content-center py-8 border-border lg:border-e"
					: "md:grid-cols-[1fr_1fr]",
			)}>
			<Switch>
				<Match when={query.isPending}>
					<Index each={Array(4)}>{() => <CardSkeleton />}</Index>
				</Match>
				<Match when={query.isError}>
					<div class="text-red-300">{query.error?.message}</div>
				</Match>
				<Match when={query.isSuccess}>
					<For each={query.data}>
						{(item) => (
							<Card
								icon={iconMapping[item.name]}
								rawStat={item.stat}
								name={item.name}
								description={item.description}
								haveXSuffix={item.name === "Graduation lift"}
							/>
						)}
					</For>
				</Match>
			</Switch>
		</div>
	);
}

const queryClient = new QueryClient();

export default function Stats() {
	return (
		<QueryClientProvider client={queryClient}>
			<StatsContent />
		</QueryClientProvider>
	);
}
