const uuid = require('node-uuid');

const database = {
    todos: [
        { id: uuid.v4(), value: "Buy some apples", completed: false },
        { id: uuid.v4(), value: "Get a flu shot", completed: true },
        { id: uuid.v4(), value: "Buy dog food", completed: false }
    ]
};

/* For the initial loading of todos into state */
/* Added delay to simulate real DB querying time */
const fetchAllTodos = () => 
    new Promise((resolve) => 
        setTimeout(
            () => resolve(database.todos),
            1500
        ));

module.exports = {
    fetchAllTodos
};