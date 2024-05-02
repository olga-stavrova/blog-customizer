import { useState, RefObject, useEffect, useRef } from 'react';
import { RadioGroup } from 'components/radio-group';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from '../arrow-button';
import { Separator } from '../separator';

const useOutsideClick = (
	ref: RefObject<HTMLElement>,
	callback: () => void
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};

type ArticleParamsProps = {
	visible: boolean;
	handleClick: () => void;
	overlayClick: () => void;
	updateOptions: (articleOptions: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	visible,
	handleClick,
	overlayClick,
	updateOptions,
	articleState,
}: ArticleParamsProps) => {
	const optionsRef = useRef<HTMLDivElement>(null);

	useOutsideClick(optionsRef, overlayClick);

	const [selectedFont, setSelectedFont] = useState(
		articleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		articleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		articleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		articleState.contentWidth
	);
	const containerClasses =
		styles.container + ' ' + (!visible ? '' : styles.container_open);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (updateOptions) {
			updateOptions({
				fontFamilyOption: selectedFont,
				fontSizeOption: selectedFontSize,
				fontColor: selectedFontColor,
				backgroundColor: selectedBackgroundColor,
				contentWidth: selectedContentWidth,
			});
		}
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (updateOptions) {
			updateOptions(defaultArticleState);
		}
	};

	return (
		<div ref={optionsRef} className='options'>
			<ArrowButton collapsed={!visible} handleClick={handleClick} />
			<aside className={containerClasses}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='Шрифты'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
