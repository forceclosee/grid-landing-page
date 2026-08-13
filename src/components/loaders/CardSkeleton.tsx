import Skeleton from "./Skeleton";

export default function CardSkeleton() {
	return (
		<div class="min-block-[20.5rem] grid grid-cols-[1fr_auto] grid-rows-[1fr_auto_auto] px-6 py-6 border-border border-x md:odd:border-e-0 md:nth-3:border-be-0 lg:odd:border-s-0 not-last-of-type:border-be">
			<Skeleton shape="circle" width={2} height={2} />
			<Skeleton shape="square" width={5} height={2.5} />
			<Skeleton class="col-span-2" shape="square" width={10} height={1.2} />
			<Skeleton class="col-span-2 mbs-1.5" shape="square" height={1.1} />
		</div>
	);
}
