import { combineReducers, createStore, applyMiddleware } from 'redux';
import { todos as todosReducer } from './reducers/todos';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const reducer = combineReducers({
        todos: todosReducer
    });

    const middlewares = [ thunk ];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    );
    return store;
};