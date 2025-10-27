import { Header } from '@/components/layout/Header';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { TodoFilters } from './TodoFilters';
import { TodoStats } from './TodoStats';
import { useTodos } from '@/hooks/useTodos';
import { getCompletedTodosCount } from '@/utils/todoUtils';

export const TodoApp = () => {
    const { todos, allTodos, filter, activeTodosCount, addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter } =
        useTodos();

    const completedTodosCount = getCompletedTodosCount(allTodos);
    const hasCompletedTodos = completedTodosCount > 0;

    return (
        <div className='min-h-screen bg-background'>
            <div className='container max-w-2xl mx-auto px-4 py-8'>
                <Header />
                <div className='space-y-6'>
                    <TodoInput onAddTodo={addTodo} />

                    {allTodos.length > 0 && (
                        <>
                            <TodoFilters
                                currentFilter={filter}
                                onFilterChange={setFilter}
                            />
                            <TodoList
                                todos={todos}
                                onToggleTodo={toggleTodo}
                                onDeleteTodo={deleteTodo}
                            />
                            <TodoStats
                                activeTodosCount={activeTodosCount}
                                hasCompletedTodos={hasCompletedTodos}
                                onClearCompleted={clearCompleted}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
