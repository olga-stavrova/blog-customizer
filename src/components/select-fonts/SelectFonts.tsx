import { Select } from 'components/select/Select';
import { useState } from 'react';

type FontProps = {
	/** Сам текст для вывода */
	title: string;
};

const SelectWithState = ({ title }: FontProps) => {
	const options = [
		{ title: '1 опция', value: '1 опция', className: '' },
		{ title: '2 опция', value: '2 опция', className: '' },
		{ title: '3 опция', value: '3 опция', className: '' },
		{ title: '4 опция', value: '4 опция', className: '' },
	];
	const [selected, setSelected] = useState(options[0]);

	return (
		<>
			<Select
				selected={selected}
				onChange={setSelected}
				options={options}
				title={title} //'Шрифты'
			/>
		</>
	);
};

export const SelectFont = ({ title }: FontProps) => {
	return <SelectWithState title={title} />;
};
