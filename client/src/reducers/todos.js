export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [ ...state, {
                value: action.value,
                id: action.id,
                completed: action.completed
            }];
        case 'TOGGLE_TODO':
            return state.map(todo => 
                todo.id !== action.id ? todo : {
                    ...todo,
                    completed: !todo.completed
                }
            );
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
};