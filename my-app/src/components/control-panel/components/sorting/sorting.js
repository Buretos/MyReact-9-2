import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAlphabetSortingAction } from '../../../../actions/actions';
import { Button } from '../../../button/button';
import styles from './sorting.module.css';

export const Sorting = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const dispatch = useDispatch();

	const onChange = ({ target }) => {
		setIsEnabled(target.checked);
		dispatch(setIsAlphabetSortingAction(target.checked));
	};

	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isEnabled}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
