import { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { useTimer } from 'react-use-precision-timer';
import { Timer } from './Timer';
import { timerColors } from './timerColors';
import { TimerBlockSchema } from './type/TimerBlockSchema';
import { TimerSchema } from './type/TimerSchema';
import { useTimerInfo } from './useTimerInfo';
import { BlockEditor } from './BlockEditor';

interface TimerViewProps {
	setStart: (value: number) => void;
	start: number;
}

export const TimerView = ({ start, setStart }: TimerViewProps) => {
	const [timer, setTimer] = useState<TimerSchema>({
		id: '1',
		label: 'Test Timer',
		repeat: true,
		blocks: {
			'1': {
				id: '1',
				seconds: 60 * 25,
				label: 'Work',
				color: 'red'
			},
			'2': {
				id: '2',
				seconds: 60 * 5,
				label: 'Break',
				color: 'green'
			}
		}
	});

	const [block, setBlock] = useState<TimerBlockSchema | null>(null);
	const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

	const stopwatch = useTimer({ delay: 1000 / 5, fireOnStart: true }, () => {
		const [block, remainingSeconds] = useTimerInfo(
			stopwatch.getElapsedRunningTime() / 1000,
			timer
		);
		setBlock(block);
		setRemainingSeconds(remainingSeconds);
	});
	useEffect(() => stopwatch.start(start), [stopwatch]);

	const [selectedBlockId, selectBlock] = useState<string | null>(null);

	const selectedBlock = selectedBlockId ? timer.blocks[selectedBlockId] : null;

	return (
		<div className="flex flex-col justify-center min-h-[100lvh] gap-10">
			<div className="flex justify-center items-center gap-2">
				{block === null || remainingSeconds === null ? (
					<div>Timer complete!</div>
				) : (
					<Timer size={4} block={block} remainingSeconds={remainingSeconds} />
				)}
				<div className="flex flex-col justify-center items-center gap-2">
					{stopwatch.isPaused() ? (
						<button
							className="p-2 rounded-md text-white"
							style={{ backgroundColor: timerColors.green }}
							onClick={() => {
								stopwatch.resume();
								const adjustedStart =
									Date.now() - stopwatch.getElapsedRunningTime();
								setStart(adjustedStart);
								stopwatch.start(adjustedStart);
							}}
						>
							Resume
						</button>
					) : (
						<button
							className="p-2 rounded-md text-white"
							style={{ backgroundColor: timerColors.blue }}
							onClick={() => stopwatch.pause()}
						>
							Pause
						</button>
					)}

					<button
						className="p-2 rounded-md text-white"
						style={{ backgroundColor: timerColors.red }}
						onClick={() => {
							setStart(Date.now());
							stopwatch.start(Date.now());
						}}
					>
						Reset
					</button>
				</div>
			</div>

			<div className="flex flex-row gap-1 mt-6 mx-12">
				{Object.keys(timer.blocks).map((id) => {
					return (
						<button
							key={id}
							className={`rounded-md relative inline-flex justify-center items-center p-2 text-white ${
								id === selectedBlockId ? 'underline' : ''
							}`}
							style={{
								flexGrow: timer.blocks[id].seconds,
								backgroundColor: timerColors[timer.blocks[id].color]
							}}
							onClick={() => selectBlock(id)}
						>
							{timer.blocks[id].label}
							{block !== null && block.id === id ? (
								<FaArrowDown
									className="absolute top-[-50%] text-black"
									style={{
										right: `${
											(remainingSeconds! / timer.blocks[id].seconds) * 100
										}%`,
										transform: 'translate(50%, 0)'
									}}
								/>
							) : null}
						</button>
					);
				})}
			</div>

			{selectedBlock !== null ? (
				<BlockEditor
					block={selectedBlock}
					onChange={(block) => {
						if (block === null) {
							setTimer((timer) => ({
								...timer,
								blocks: Object.fromEntries(
									Object.entries(timer.blocks).filter(
										([id]) => id !== selectedBlockId
									)
								)
							}));
						} else {
							setTimer((timer) => ({
								...timer,
								blocks: {
									...timer.blocks,
									[block.id]: block
								}
							}));
						}
					}}
				/>
			) : null}
		</div>
	);
};
