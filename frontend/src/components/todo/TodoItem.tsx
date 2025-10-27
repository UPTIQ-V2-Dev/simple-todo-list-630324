import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { type Todo } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <Card className='p-4 mb-2'>
            <div className='flex items-center gap-3'>
                <Checkbox
                    id={todo.id}
                    checked={todo.completed}
                    onCheckedChange={() => onToggle(todo.id)}
                    className='min-w-fit'
                />
                <label
                    htmlFor={todo.id}
                    className={cn(
                        'flex-1 text-sm cursor-pointer select-none',
                        todo.completed && 'line-through text-muted-foreground'
                    )}
                >
                    {todo.text}
                </label>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onDelete(todo.id)}
                    className='h-8 w-8 text-muted-foreground hover:text-destructive'
                >
                    <Trash2 className='h-4 w-4' />
                </Button>
            </div>
        </Card>
    );
};
