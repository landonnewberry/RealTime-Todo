export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [ ...state, {
                value: action.value,
                id: action.id,
                completed: action.completed
            }];
        default:
            return state;
    }
};