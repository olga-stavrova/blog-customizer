import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
/* Функция для обработки открытия/закрытия формы */

//export type OnClick = () => void;
type ArrowButtonProps = {
	handleClick?: () => void;
	collapsed?: boolean;
};

export const ArrowButton = ({ handleClick, collapsed }: ArrowButtonProps) => {
	let containerClasses = clsx(styles.container);
	if (!collapsed) {
		containerClasses = clsx(styles.container, styles.container_open);
	}
	/*styles.container + ' ' + (collapsed ? '' : styles.container_open);*/
	//const containerClasses = styles.container;
	let arrowClasses = clsx(styles.arrow);
	if (!collapsed) {
		arrowClasses = clsx(styles.arrow, styles.arrow_open);
	}
		/*styles.arrow + ' ' + (collapsed ? '' : styles.arrow_open);*/
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={handleClick}
			className={containerClasses}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClasses} />
		</div>
	);
};
