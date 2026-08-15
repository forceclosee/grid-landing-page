import { actions } from "astro:actions";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/solid-query";
import { For, Index, ErrorBoundary, Suspense } from "solid-js";
import type { JSX, Component } from "solid-js";
import { Plus, Sparkle, ArrowRight, TrendingUp } from "lucide-solid";

import { classList } from "@utils/class-list";

import Card from "./Card";
import CardSkeleton from "@components/loaders/CardSkeleton";

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
		refetchOnWindowFocus: false,
		throwOnError: true,
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
			<ErrorBoundary
				// fallback on error state
				fallback={(err, reset) => (
					<div class="justify-items-center gap-8 grid">
						<p class="text-red-200">{err.message}</p>
						<button
							type="button"
							class="inline-block bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg active:scale-95 transition-[scale] duration-200 cursor-pointer squircle"
							onClick={() => {
								queryClient.resetQueries({ queryKey: ["stats"] });
								setTimeout(() => {
									reset();
								}, 0);
							}}>
							Try again
						</button>
					</div>
				)}>
				<Suspense
					// fallback on pending state
					fallback={<Index each={Array(4)}>{() => <CardSkeleton />}</Index>}>
					{/* render stats data on succes state */}
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
				</Suspense>
			</ErrorBoundary>
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
