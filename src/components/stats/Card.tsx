import {
	splitProps,
	type JSX,
	type Component,
	onMount,
	onCleanup,
} from "solid-js";
import { Dynamic } from "solid-js/web";

import { gsap, ScrollTrigger } from "@utils/gsap";

type Props = {
	icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
	rawStat: number;
	name: string;
	description: string;
	haveXSuffix?: boolean;
};

export default function Card(props: Props) {
	const [coreProps, restProps] = splitProps(props, [
		"icon",
		"rawStat",
		"name",
		"description",
		"haveXSuffix",
	]);

	let statRef: HTMLSpanElement | undefined;
	let cardRef: HTMLDivElement | undefined;

	// change raw number into string with compact notation
	function formatNumber(num: number) {
		return new Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 2,
		}).format(num);
	}

	onMount(() => {
		if (statRef) {
			const mm = gsap.matchMedia();

			// stat animation: no preference - number animating from 0 to final value
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				const stat = { val: 0 };
				statRef.textContent = String(stat.val);

				const countUpAnimation = ScrollTrigger.create({
					trigger: statRef,
					start: "top 60%",
					once: true,
					onEnter: () => {
						const isInteger = coreProps.rawStat % 1 === 0;

						gsap.to(stat, {
							val: coreProps.rawStat,
							duration: 4,
							ease: "power4.out",
							onUpdate() {
								const currentVal = isInteger ? Math.floor(stat.val) : stat.val;

								statRef.textContent = formatNumber(currentVal);
							},
						});
					},
				});

				onCleanup(() => countUpAnimation.kill());
			});

			// stat animation: reduce - only fade in animations
			mm.add("(prefers-reduced-motion: reduce)", () => {
				statRef.textContent = formatNumber(coreProps.rawStat);

				const countUpAnimation = gsap.from(statRef, {
					opacity: 0,
					duration: 1.5,
					ease: "power3.out",
					scrollTrigger: {
						trigger: statRef,
						start: "top 60%",
					},
				});

				onCleanup(() => countUpAnimation.kill());
			});
		}

		// card animation : fade in
		if (cardRef) {
			const fadeAnimation = gsap.from(cardRef, {
				opacity: 0,
				duration: 1.5,
				ease: "power3.out",
				scrollTrigger: {
					trigger: cardRef,
					start: "top 60%",
				},
			});

			onCleanup(() => fadeAnimation.kill());
		}
	});

	return (
		<div
			class="min-block-[20.5rem] grid grid-cols-[1fr_auto] grid-rows-[1fr_auto_auto] hover:bg-white/5 px-6 py-6 border-border border-x md:odd:border-e-0 md:nth-3:border-be-0 lg:odd:border-s-0 not-last-of-type:border-be transition-all duration-200 cursor-pointer"
			ref={cardRef}
			{...restProps}>
			<Dynamic component={coreProps.icon} class="block-auto inline-7" />
			<p class="text-4xl">
				<span ref={statRef}>{formatNumber(coreProps.rawStat)}</span>
				{coreProps.haveXSuffix && <span>×</span>}
			</p>
			<p class="col-span-2">{coreProps.name}</p>
			<p class="col-span-2 text-sm">{coreProps.description}</p>
		</div>
	);
}
