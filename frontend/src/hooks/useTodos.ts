import { useState } from 'react';
import { type Todo, type TodoFilter } from '@/types/todo';
import { useLocalStorage } from './useLocalStorage';
import { createTodo, filterTodos, getActiveTodosCount } from '@/utils/todoUtils';

export const useTodos = () => {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
    const [filter, setFilter] = useState<TodoFilter>('all');

    const addTodo = (text: string) => {
        if (!text.trim()) return;
        const newTodo = createTodo(text);
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    };

    const filteredTodos = filterTodos(todos, filter);
    const activeTodosCount = getActiveTodosCount(todos);

    return {
        todos: filteredTodos,
        allTodos: todos,
        filter,
        activeTodosCount,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        setFilter
    };
};
