import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ControlPanel, Todo } from './components';
import { setTodosAction, createTodo, readTodos, updateTodo, deleteTodo } from './actions';
import { addTodoInTodos, findTodo, removeTodoInTodos, setTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';
import styles from './app.module.css';

export const App = () => {
	const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
	const searchPhrase = useSelector(state => state.controlPanel.searchPhrase);
    const isAlphabetSorting = useSelector(state => state.controlPanel.isAlphabetSorting);

	const onTodoAdd = () => {
		dispatch(setTodosAction(addTodoInTodos(todos)));
	};

	const onTodoSave = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {};

		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed }).then((todo) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, todo);
				dispatch(setTodosAction(updatedTodos));
			});
		} else {
			updateTodo({ id: todoId, title }).then(() => {
				dispatch(setTodosAction(setTodoInTodos(todos, { id: todoId, isEditing: false })));
			});
		}
	};

	const onTodoEdit = (id) => {
		dispatch(setTodosAction(setTodoInTodos(todos, { id, isEditing: true })));
	};

	const onTodoTitleChange = (id, newTitle) => {
		dispatch(setTodosAction(setTodoInTodos(todos, { id, title: newTitle })));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			dispatch(setTodosAction(setTodoInTodos(todos, { id, completed: newCompleted })));
		});
	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => dispatch(setTodosAction(removeTodoInTodos(todos, id))));
	};

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
			dispatch(setTodosAction(loadedTodos)),
		);
	}, [dispatch, searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
			/>
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
						onCompletedChange={(newCompleted) =>
							onTodoCompletedChange(id, newCompleted)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
