import { TimerView } from './timer/TimerView';
import { useLocalStorage } from './timer/useLocalStorage';

const App = () => {
	const [start, setStart] = useLocalStorage('pomodoro-start', Date.now());

	return (
		<>
			<TimerView start={start} setStart={setStart} />
		</>
	);
};

export default App;
