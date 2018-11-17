import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addTodoLocal } from '../actions/todos';

class RootComponent extends Component {

    componentDidMount() {
        this.props.socket.on('RECEIVE_TODO', (todo) => {
            this.props.addTodoLocal(todo.value, todo.id, todo.completed);
        });
    }
    
    render() {
        let input;
        return (
            <div>
                <h1>Realtime-Todo</h1>
                <ul>
                    { this.props.todos.map(todo => (
                        <li key={ todo.id }>{ todo.value }</li>
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
        addTodoGlobal: (socket) => (value) => socket.emit('ADD_TODO', value)
    }),
    dispatch => ({
        addTodoLocal: (value, id, completed) => dispatch(addTodoLocal(value, id, completed))
    })
)(RootComponent);