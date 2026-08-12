import type { JSX, Component } from "solid-js";
import { Dynamic } from "solid-js/web";

type Props = {
	icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
	stat: string;
	name: string;
	description: string;
	haveX?: boolean;
};

export default function Card(props: Props) {
	return (
		<div class="min-block-[20.5rem] grid grid-cols-[1fr_auto] grid-rows-[1fr_auto_auto] hover:bg-white/5 px-6 py-6 border-border border-x md:odd:border-e-0 md:nth-3:border-be-0 lg:odd:border-s-0 not-last-of-type:border-be transition-all duration-200 cursor-pointer">
			<Dynamic component={props.icon} class="block-auto inline-7" />
			<p class="text-4xl">
				{props.stat}
				{props.haveX && <span>×</span>}
			</p>
			<p class="col-span-2">{props.name}</p>
			<p class="col-span-2 text-sm">{props.description}</p>
		</div>
	);
}
