import { classList } from "@utils/class-list";

type Props = {
	class?: string;
	shape: "square" | "circle";
	width?: number;
	height: number;
};

export default function Skeleton(props: Props) {
	return (
		<div
			class={classList(
				props.class,
				"bg-linear-to-r from-gray-400/60 via-gray-500/60 to-gray-400/60 bg-size-[200%_100%] wave transition-all duration-75 transition-discrete starting:opacity-0",
				props.shape === "square" ? "rounded-lg squircle" : "rounded-full",
			)}
			style={{
				"inline-size": `${props.width}rem`,
				"block-size": `${props.height}rem`,
			}}
			aria-hidden="true"></div>
	);
}
