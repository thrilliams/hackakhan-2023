import { useEffect, useState } from 'react';
import { TimerBlockSchema } from './type/TimerBlockSchema';
import { timerColors } from './timerColors';

interface BlockEditorProps {
	block: TimerBlockSchema;
	onChange: (block: TimerBlockSchema | null) => void;
}

export const BlockEditor = ({ block, onChange }: BlockEditorProps) => {
	const [color, setColor] = useState<keyof typeof timerColors>(block.color);
	const [label, setLabel] = useState(block.label);
	const [minutes, setMinutes] = useState(block.seconds / 60);

	useEffect(() => {
		setColor(block.color);
		setLabel(block.label);
		setMinutes(block.seconds / 60);
	}, [block]);

	return (
		<div className="flex flex-col gap-2">
			<div className="text-center">
				<input
					type="text"
					className="underline w-12"
					value={label}
					onChange={(e) => setLabel(e.target.value)}
				/>{' '}
				for{' '}
				<input
					type="text"
					className="underline w-12"
					value={minutes}
					onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
				/>{' '}
				minutes.
			</div>
			<div className="flex gap-2 justify-center">
				<select
					value={color}
					onChange={(e) => setColor(e.target.value as keyof typeof timerColors)}
				>
					{Object.keys(timerColors).map((key) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>
				<button
					className="border-2 px-1 rounded"
					onClick={() => onChange({ ...block, color, label, seconds: minutes * 60 })}
				>
					Save
				</button>
				<button className="border-2 px-1 rounded" onClick={() => onChange(null)}>
					Delete
				</button>
			</div>
		</div>
	);
};
