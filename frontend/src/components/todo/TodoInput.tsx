import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

export const TodoInput = ({ onAddTodo }: TodoInputProps) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = () => {
        if (inputText.trim()) {
            onAddTodo(inputText.trim());
            setInputText('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Card className='p-4 mb-6'>
            <div className='flex gap-2'>
                <Input
                    type='text'
                    placeholder='What needs to be done?'
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='flex-1'
                />
                <Button
                    onClick={handleSubmit}
                    size='icon'
                >
                    <Plus className='h-4 w-4' />
                </Button>
            </div>
        </Card>
    );
};
