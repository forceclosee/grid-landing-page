import { actions } from "astro:actions";
import type { stats } from "@db/schema";

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/solid-query";
import { For, Index, Switch, Match } from "solid-js";
import type { JSX, Component } from "solid-js";
import { Plus, Sparkle, ArrowRight, TrendingUp } from "lucide-solid";

import { classList } from "@utils/class-list";

import Card from "./Card";
import CardSkeleton from "@components/loaders/CardSkeleton";

const queryClient = new QueryClient();

type StatItem = typeof stats.$inferSelect;

type StatsContentProps = {
	initialStatsData?: StatItem[];
};

function StatsContent(props: StatsContentProps) {
	const query = useQuery(() => ({
		queryKey: ["stats"],
		queryFn: async () => {
			const { data, error } = await actions.getStats();
			if (error) {
				throw error;
			}
			return data;
		},
		initialData: props.initialStatsData,
		/* set staleTime to 0 if prefetch failed to instantly trigger refetch on page load */
		staleTime: props.initialStatsData ? Infinity : 0,
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
				{/* PENDING STATE */}
				<Match when={query.isPending}>
					<Index each={Array(4)}>{() => <CardSkeleton />}</Index>
				</Match>

				{/* ERROR STATE */}
				<Match when={query.isError}>
					<div class="justify-items-center gap-8 grid">
						<p class="text-red-200">{query.error?.message}</p>
						<button
							type="button"
							class="inline-block bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg active:scale-95 transition-[scale] duration-200 cursor-pointer squircle"
							onClick={() => {
								queryClient.resetQueries({ queryKey: ["stats"] });
							}}>
							Try again
						</button>
					</div>
				</Match>

				{/* SUCCESS STATE */}
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

type StatsProps = {
	data?: StatItem[];
};

export default function Stats(props: StatsProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<StatsContent initialStatsData={props.data} />
		</QueryClientProvider>
	);
}
