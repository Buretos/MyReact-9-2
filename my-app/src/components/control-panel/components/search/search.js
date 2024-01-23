import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchPhraseAction } from '../../../../actions/actions';
import styles from './search.module.css';

export const Search = () => {

	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	const onChange = ({ target }) => {
		setValue(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(setSearchPhraseAction(value));
	};

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				value={value}
				placeholder="Поиск..."
				onChange={onChange}
			/>
		</form>
	);
};
