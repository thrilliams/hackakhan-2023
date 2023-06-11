import { useEffect, useState } from 'react';
import { FaArrowDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useTimer } from 'react-use-precision-timer';
import { Timer } from './Timer';
import { timerColors } from './timerColors';
import { TimerBlockSchema } from './type/TimerBlockSchema';
import { TimerSchema } from './type/TimerSchema';
import { useTimerInfo } from './useTimerInfo';
import { BlockEditor } from './BlockEditor';
import { nanoid } from 'nanoid';
import { useLocalStorage } from './useLocalStorage';

interface TimerViewProps {
	setStart: (value: number) => void;
	start: number;
}

export const TimerView = ({ start, setStart }: TimerViewProps) => {
	const [presets, setPresets] = useLocalStorage<TimerSchema[]>('presets', [
		{
			id: '1',
			label: 'Classic Pomodoro',
			repeat: true,
			blocks: {
				'1': {
					id: '1',
					seconds: 60 * 25,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'2': {
					id: '2',
					seconds: 60 * 5,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				}
			}
		},
		{
			id: '2',
			label: '50-40-30-20-10',
			repeat: false,
			blocks: {
				'1': {
					id: '1',
					seconds: 60 * 50,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'2': {
					id: '2',
					seconds: 60 * 10,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				},
				'3': {
					id: '1',
					seconds: 60 * 40,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'4': {
					id: '2',
					seconds: 60 * 10,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				},
				'5': {
					id: '1',
					seconds: 60 * 30,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'6': {
					id: '2',
					seconds: 60 * 10,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				},
				'7': {
					id: '1',
					seconds: 60 * 20,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'8': {
					id: '2',
					seconds: 60 * 10,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				},
				'9': {
					id: '1',
					seconds: 60 * 10,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				}
			}
		},
		{
			id: '3',
			label: 'Hour On, Hour Off',
			repeat: true,
			blocks: {
				'1': {
					id: '1',
					seconds: 60 * 60,
					label: 'Work',
					actionLabel: 'working',
					color: 'red'
				},
				'2': {
					id: '2',
					seconds: 60 * 60,
					label: 'Break',
					actionLabel: 'on break',
					color: 'green'
				}
			}
		}
	]);

	const [timer, setTimer] = useLocalStorage<TimerSchema>('timer', presets[0]);

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
	const selectedBlock = timer.blocks[selectedBlockId!];

	const setPreset = (preset: TimerSchema) => {
		const proceed = confirm('This will overwrite your current timer. Are you sure?');
		if (!proceed) return;

		setTimer(preset);
		setStart(Date.now());
		stopwatch.start(Date.now());
		setTimeout(() => stopwatch.pause(), 0);
	};

	return (
		<div className="grid min-h-[100lvh] grid-cols-[max-content_1fr]">
			<div className="flex flex-col gap-4 pt-10 px-4 bg-[#705fab] text-white items-start w-60">
				<h3 className="text-xl font-semibold text-center w-full">Timer Presets</h3>
				{presets.map((preset) => (
					<div className="flex gap-2 w-full" key={preset.id}>
						<button
							className="p-1 px-2 border-2 rounded bg-[#705fab] hover:brightness-90 flex-grow"
							onClick={() => setPreset(preset)}
						>
							{preset.label}
						</button>
						<button
							className="p-1 border-2 rounded bg-[#705fab] hover:brightness-90"
							disabled={presets.length <= 1}
							onClick={() => {
								const proceed = confirm(
									'Deleted presets cannot be restored. Are you sure?'
								);
								if (!proceed) return;

								const deleteIndex = presets.findIndex((p) => p.id === preset.id);
								presets.splice(deleteIndex, 1);
								setPresets(presets);
							}}
						>
							<FaTrash />
						</button>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-10 pt-10 px-4">
				{block === null || remainingSeconds === null ? (
					<h1 className="text-center">Timer complete!</h1>
				) : (
					<div className="flex flex-col justify-center items-center gap-2">
						<input
							type="text"
							className="text-xl text-center mb-5 underline"
							value={timer.label}
							onChange={(e) =>
								setTimer({
									...timer,
									label: e.target.value
								})
							}
						/>
						<h2 className="text-lg text-center">You are {block.actionLabel} for</h2>
						<div className="flex gap-2">
							<Timer size={3} block={block} remainingSeconds={remainingSeconds} />
							<div className="flex flex-col justify-center items-center gap-2">
								{stopwatch.isPaused() ? (
									<button
										className="p-2 rounded-md text-white hover:brightness-90"
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
										className="p-2 rounded-md text-white hover:brightness-90"
										style={{ backgroundColor: timerColors.blue }}
										onClick={() => stopwatch.pause()}
									>
										Pause
									</button>
								)}

								<button
									className="p-2 rounded-md text-white hover:brightness-90"
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
						<h2 className="text-lg text-center">more minutes.</h2>
					</div>
				)}

				<div className="flex flex-row gap-1 mt-6 mx-12">
					{Object.keys(timer.blocks).map((id) => {
						return (
							<button
								key={id}
								className={`rounded-md relative inline-flex justify-center items-center p-2 hover:brightness-90 text-white ${
									id === selectedBlockId ? 'underline' : ''
								}`}
								style={{
									flexGrow: timer.blocks[id].seconds,
									backgroundColor: timerColors[timer.blocks[id].color]
								}}
								onClick={() => {
									if (selectedBlockId !== id) selectBlock(id);
									else selectBlock(null);
								}}
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
					<button
						className="rounded-md inline-flex justify-center items-center p-2 text-white bg-black aspect-square"
						onClick={() => {
							const id = nanoid();
							setTimer({
								...timer,
								blocks: {
									...timer.blocks,
									[id]: {
										id,
										seconds: 60,
										label: 'New Block',
										actionLabel: 'verbing',
										color: 'purple'
									}
								}
							});
							selectBlock(id);
						}}
					>
						<FaPlus />
					</button>
				</div>

				{selectedBlock !== undefined ? (
					<BlockEditor
						block={selectedBlock}
						onChange={(block) => {
							if (block === null) {
								setTimer({
									...timer,
									blocks: Object.fromEntries(
										Object.entries(timer.blocks).filter(
											([id]) => id !== selectedBlockId
										)
									)
								});
							} else {
								setTimer({
									...timer,
									blocks: {
										...timer.blocks,
										[block.id]: block
									}
								});
							}
						}}
					/>
				) : null}

				<button
					className="mx-auto w-fit rounded-md inline-flex justify-center items-center p-2 border-2 bg-white hover:brightness-95"
					onClick={() => {
						if (presets.find((preset) => preset.label === timer.label)) {
							alert('Please choose a new name.');
							return;
						}

						setPresets([...presets, { ...timer, id: nanoid() }]);
					}}
				>
					Save as new preset
				</button>
			</div>
		</div>
	);
};
