import { Button } from '@/components/ui/button';
import { type TodoFilter } from '@/types/todo';

interface TodoFiltersProps {
    currentFilter: TodoFilter;
    onFilterChange: (filter: TodoFilter) => void;
}

export const TodoFilters = ({ currentFilter, onFilterChange }: TodoFiltersProps) => {
    const filters: { key: TodoFilter; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'completed', label: 'Completed' }
    ];

    return (
        <div className='flex gap-1 justify-center mb-4'>
            {filters.map(({ key, label }) => (
                <Button
                    key={key}
                    variant={currentFilter === key ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => onFilterChange(key)}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
};
