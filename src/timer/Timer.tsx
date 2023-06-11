import { timerColors } from './timerColors';
import { TimerBlockSchema } from './type/TimerBlockSchema';

interface TimerProps {
	size: number;
	block: TimerBlockSchema;
	remainingSeconds: number;
}

export const Timer = ({ size, block, remainingSeconds }: TimerProps) => {
	const secondsPart = Math.floor(remainingSeconds % 60);
	const minutesPart = Math.floor((remainingSeconds / 60) % 60);
	const hoursPart = Math.floor(remainingSeconds / (60 * 60));

	const color = timerColors[block.color];

	return (
		<div
			className="rounded-md inline-block"
			style={{
				backgroundColor: color,
				gap: `${size / 8}rem`,
				padding: `${size}rem`,
				fontSize: `${size}rem`,
				borderRadius: `${size * (3 / 8)}rem`,
				fontVariantNumeric: 'tabular-nums'
			}}
		>
			<div className="flex justify-center items-center font-bold text-white">
				{/* only display hours part if the block is longer than an hour */}
				{block.seconds >= 60 * 60 ? (
					<>
						<span>{hoursPart.toString().padStart(2, '0')}</span>:
					</>
				) : null}
				<span>{minutesPart.toString().padStart(2, '0')}</span>:
				<span>{secondsPart.toString().padStart(2, '0')}</span>
			</div>
		</div>
	);
};
