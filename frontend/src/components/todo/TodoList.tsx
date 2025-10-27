import { TodoItem } from './TodoItem';
import { type Todo } from '@/types/todo';

interface TodoListProps {
    todos: Todo[];
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className='text-center py-8 text-muted-foreground'>
                <p>No todos yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className='space-y-0'>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggleTodo}
                    onDelete={onDeleteTodo}
                />
            ))}
        </div>
    );
};
