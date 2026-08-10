import type { JSX, Component } from "solid-js";

type Props = {
	icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
	stat: string;
	name: string;
	description: string;
};

export default function Card(props: Props) {
	return (
		<div class="min-block-[20.5rem] grid grid-cols-[1fr_auto] grid-rows-[1fr_auto_auto] px-6 py-6 border-border lg:border-e lg:nth-3:border-be-0 not-last-of-type:border-be">
			<props.icon class="block-auto inline-7" />
			<p class="text-4xl">{props.stat}</p>
			<p class="col-span-2">{props.name}</p>
			<p class="col-span-2 text-sm">{props.description}</p>
		</div>
	);
}
