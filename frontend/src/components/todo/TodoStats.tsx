import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TodoStatsProps {
    activeTodosCount: number;
    hasCompletedTodos: boolean;
    onClearCompleted: () => void;
}

export const TodoStats = ({ activeTodosCount, hasCompletedTodos, onClearCompleted }: TodoStatsProps) => {
    return (
        <div className='mt-6'>
            <Separator className='mb-4' />
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>Items left:</span>
                    <Badge variant='secondary'>{activeTodosCount}</Badge>
                </div>
                {hasCompletedTodos && (
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={onClearCompleted}
                    >
                        Clear completed
                    </Button>
                )}
            </div>
        </div>
    );
};
