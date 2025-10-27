export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoContextType {
    todos: Todo[];
    filter: TodoFilter;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
    setFilter: (filter: TodoFilter) => void;
}
