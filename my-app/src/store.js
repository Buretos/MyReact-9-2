import { createStore, applyMiddleware, combineReducers, compose  } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer, controlPanelReducer } from './reducers';

 const rootReducer = combineReducers({
    todos: todosReducer,
	controlPanel: controlPanelReducer,
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

