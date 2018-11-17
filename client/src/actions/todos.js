import { v4 } from 'node-uuid';

export const addTodoLocal = (value, id = v4(), completed = false) => ({
    type: 'ADD_TODO',
    id: id,
    value,
    completed: completed
});