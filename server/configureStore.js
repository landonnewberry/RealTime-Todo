const redux = require('redux');
const todosReducer = require('./reducers/todos');
const database = require('./database');
const todosActions = require('./actions/todos');

const configureStore = () => {
    const reducer = redux.combineReducers({
        todos: todosReducer
    });
    const store = redux.createStore(reducer);

    /* Could easily be replaced with a real DB query */
    database.fetchAllTodos().then(todos => {
        store.dispatch(todosActions.loadInitialTodos(todos));
    });

    return store;
}

module.exports = configureStore;