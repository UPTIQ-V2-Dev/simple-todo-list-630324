import { type Todo, type TodoFilter } from '@/types/todo';

export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTodo = (text: string): Todo => ({
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date()
});

export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};

export const getActiveTodosCount = (todos: Todo[]): number => {
    return todos.filter(todo => !todo.completed).length;
};

export const getCompletedTodosCount = (todos: Todo[]): number => {
    return todos.filter(todo => todo.completed).length;
};
