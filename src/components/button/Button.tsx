import clsx from 'clsx';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	const buttonClass =
		type === 'reset' ? clsx(styles.resetButton, styles.button) : styles.button;
	return (
		<button className={buttonClass} type={type} onClick={onClick}>
			{title}
		</button>
	);
};
