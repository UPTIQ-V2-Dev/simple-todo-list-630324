# Todo List App - Technical Implementation Plan

## Project Overview

Single-page todo list application built with React 19, Vite, shadcn/ui, and Tailwind CSS v4.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **State Management**: React useState/useContext
- **Data Persistence**: localStorage
- **Form Handling**: react-hook-form + zod validation
- **Icons**: lucide-react

## Single Page Implementation Plan

### Main Page: Todo List Application (`/`)

#### Core Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Filter todos (All, Active, Completed)
- Clear all completed todos
- Persist data to localStorage

#### Components to Build

**1. Layout Components**

- `TodoApp` (main container component)
- `Header` (app title and theme toggle)

**2. Todo Components**

- `TodoInput` (input form for new todos)
- `TodoList` (container for todo items)
- `TodoItem` (individual todo with checkbox, text, delete button)
- `TodoFilters` (All/Active/Completed filter buttons)
- `TodoStats` (count of active items)

**3. UI Components (existing shadcn components to use)**

- `Button` (for actions)
- `Input` (for todo text input)
- `Checkbox` (for marking complete)
- `Card` (for todo item containers)
- `Badge` (for todo count)
- `Separator` (visual dividers)

#### Types to Create

**File**: `src/types/todo.ts`

```typescript
interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

type TodoFilter = 'all' | 'active' | 'completed';
```

#### Hooks to Create

**File**: `src/hooks/useTodos.ts`

- Custom hook for todo CRUD operations
- localStorage persistence
- Filter logic

**File**: `src/hooks/useLocalStorage.ts`

- Generic localStorage hook for data persistence

#### Utils to Create

**File**: `src/utils/todoUtils.ts`

- Todo filtering functions
- ID generation utility
- Data validation helpers

#### Context/State Management

**File**: `src/contexts/TodoContext.tsx`

- Todo state management
- Actions (add, toggle, delete, clear completed)
- Filter state

#### Styling

**Files**:

- Use existing Tailwind classes with shadcn theme system
- Custom CSS variables in `src/styles/index.css` for todo-specific styling
- Responsive design for mobile/desktop

#### API Structure (if needed for future expansion)

- Currently using localStorage, but structure for potential API endpoints:
    - `GET /api/todos` - fetch all todos
    - `POST /api/todos` - create new todo
    - `PUT /api/todos/:id` - update todo
    - `DELETE /api/todos/:id` - delete todo

#### File Structure for Implementation

```
src/
├── components/
│   ├── todo/
│   │   ├── TodoApp.tsx
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoFilters.tsx
│   │   └── TodoStats.tsx
│   └── layout/
│       └── Header.tsx
├── hooks/
│   ├── useTodos.ts
│   └── useLocalStorage.ts
├── types/
│   └── todo.ts
├── utils/
│   └── todoUtils.ts
├── contexts/
│   └── TodoContext.tsx
└── App.tsx (updated)
```

#### Implementation Order

1. **Types & Utils**: Define todo types and utility functions
2. **Hooks**: Create localStorage and todo management hooks
3. **Context**: Setup todo context for state management
4. **Components**: Build UI components from bottom-up
    - TodoItem → TodoList → TodoInput → TodoFilters → TodoStats
5. **Layout**: Create Header and main TodoApp container
6. **Integration**: Wire everything together in App.tsx
7. **Styling**: Apply responsive design and polish UI
8. **Testing**: Add basic functionality tests

#### Key Features Implementation

- **Persistence**: Auto-save to localStorage on every change
- **Validation**: Use zod schema for todo text validation
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Theme Support**: Light/dark theme toggle using existing theme system

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm eslint` - Run linting
- `pnpm prettier` - Format code

## Future Enhancements (out of scope)

- Due dates for todos
- Categories/tags
- Search functionality
- Export/import todos
- API backend integration
- User authentication
