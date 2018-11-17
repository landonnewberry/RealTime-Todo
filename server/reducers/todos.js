const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [ ...state, {
                id: action.id,
                value: action.value,
                completed: action.completed
            }];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                return todo.id === action.id ? 
                    { ...todo, completed: !todo.completed } :
                    todo;
            });
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'LOAD_INITIAL_TODOS':
            return [ ...action.values ];
        default:
            return state;
    }
};

module.exports = todos;