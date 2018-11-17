const uuid = require('node-uuid');

const addTodo = (value) => ({
    type: 'ADD_TODO',
    id: uuid.v4(),
    value: value,
    completed: false
});

const loadInitialTodos = (values) => ({
    type: 'LOAD_INITIAL_TODOS',
    values
});

const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

module.exports = {
    addTodo,
    loadInitialTodos
};