import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addTodoLocal, toggleTodoLocal, removeTodoLocal } from '../actions/todos';
import { registerBindings } from '../utils';


class RootComponent extends Component {

    componentDidMount() {
        const { addTodoLocal, toggleTodoLocal, removeTodoLocal } = this.props;
        const bindings = {
            'RECEIVE_TODO': (t) => addTodoLocal(t.value, t.id, t.completed),
            'TOGGLE_TODO': (id) => toggleTodoLocal(id),
            'REMOVE_TODO': (id) => removeTodoLocal(id)
        };
        registerBindings(this.props.socket)(bindings);
    }
    
    render() {
        let input;
        return (
            <div>
                <h1>Realtime-Todo</h1>
                <ul>
                    { this.props.todos.map(todo => (
                        <li 
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}
                            onClick={
                                () => this.props.toggleTodoGlobal(this.props.socket)(todo.id)
                            }
                            key={ todo.id }>
                            { todo.value }
                            <button onClick={ () => this.props.removeTodoGlobal(this.props.socket)(todo.id) }>X</button>
                        </li>
                    )) }
                </ul>
                <input type="text" ref={ node => input = node } />
                <button 
                    onClick={ () => {
                        this.props.addTodoGlobal(this.props.socket)(input.value);
                        input.value = '';
                    } }>
                    Add Todo
                </button>
            </div>
        );
    }
}



export const Root = connect(
    state => ({
        todos: state.todos,
        socket: io.connect('http://localhost:8000'),
        addTodoGlobal: (socket) => (value) => socket.emit('ADD_TODO', value),
        toggleTodoGlobal: (socket) => (id) => socket.emit('TOGGLE_TODO', id),
        removeTodoGlobal: (socket) => (id) => socket.emit('REMOVE_TODO', id)
    }),
    dispatch => ({
        addTodoLocal: (value, id, completed) => dispatch(addTodoLocal(value, id, completed)),
        toggleTodoLocal: (id) => dispatch(toggleTodoLocal(id)),
        removeTodoLocal: (id) => dispatch(removeTodoLocal(id))
    })
)(RootComponent);