const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketServer = require('socket.io');
const configureStore = require('./configureStore');
const todosActions = require('./actions/todos');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketServer(server);

server.listen(8000, () => console.log("Server running on port 8000"));

const store = configureStore();

io.on('connect', (socket) => {

    const initialState = store.getState();
    initialState.todos.forEach(todo =>
        socket.emit('RECEIVE_TODO', todo)
    );
    
    socket.on('ADD_TODO', (todo) => {

        /* Here's where I could use redux thunk to wrap
         * dispatch and actually save the data */
        const action = todosActions.addTodo(todo);
        store.dispatch(action);
        io.emit('RECEIVE_TODO', {
            id: action.id,
            value: action.value,
            completed: action.completed
        });
    });

    socket.on('TOGGLE_TODO', (id) => {
        store.dispatch(todosActions.toggleTodo(id));
        io.emit('TOGGLE_TODO', id);
    });

    socket.on('REMOVE_TODO', (id) => {
        store.dispatch(todosActions.removeTodo(id));
        io.emit('REMOVE_TODO', id);
    });
    
});
