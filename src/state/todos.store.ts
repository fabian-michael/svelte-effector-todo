import { createStore, createApi } from 'effector-logger';
import { produce, Draft } from 'immer';
import {v4 as uuid} from 'uuid';

// 1️⃣ Declare types 
// --------------------------------------------------------

export interface Todo {
    id: string,
    title: string;
    done: boolean;
}

type State = Todo[];
type DraftState = Draft<State>;

// 2️⃣ Create Effector store 
// --------------------------------------------------------

const initialState: State = [];
export const todos = createStore(initialState);

// 3️⃣ Create views (derived stores)
// --------------------------------------------------------

export const doneTodos = todos.map(todos => todos.filter(todo => todo.done));
export const openTodos = todos.map(todos => todos.filter(todo => !todo.done));

// 4️⃣ Create API
// --------------------------------------------------------

/** Add a new todo item */
const addTodo = produce((draft: DraftState, title: string) => {
    draft.push({
        id: uuid(),
        title,
        done: false
    })
});

/** Remove a todo by id */
const removeTodo =  produce((draft: DraftState, id: string) => {
    
});

/** Toggle done by id */
const toggleDone = produce((draft: DraftState, id: string) => {
    const todo = draft.find(todo => todo.id === id);
    if (todo) todo.done = !todo.done;
});

/** Set done by id */
const setDone = produce((draft: DraftState, { id, done }: {id: string, done: boolean}) => {
    const todo = draft.find(todo => todo.id === id);
    if (todo) todo.done = done;
});

/** Reset the store to inital state */
const reset = () => initialState;

export const todosApi = createApi(todos, {
    addTodo,
    removeTodo,
    toggleDone,
    setDone,
    reset
});