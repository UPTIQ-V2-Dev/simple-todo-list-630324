import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export const Header = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className='flex items-center justify-between mb-8'>
            <h1 className='text-4xl font-bold text-primary'>Todo List</h1>
            <Button
                variant='ghost'
                size='icon'
                onClick={toggleTheme}
                className='h-10 w-10'
            >
                {theme === 'light' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
            </Button>
        </header>
    );
};
