import React, { useState } from 'react';
import styles from './TodoApp.module.css';

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}
const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim() === '') {
            return;
        }
        const newTodoItem: TodoItem = {
            id: Date.now().toString(),
            text: newTodo,
            completed: false
        }
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    }

    const removeTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    const setCompleted = (id: string) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    return (
        <>
           <main className="container">
                <h1>Simple Todo App</h1>
                <form>
                    <div className="grid">
                        <div className='col-8'>
                            <input type="text" 
                                name="new-todo" 
                                placeholder="New Todo" 
                                aria-label="New Todo" 
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <button type='button' onClick={addTodo}>Add</button>
                        </div>
                    </div>

                    {todos && todos.length > 0 ? (
                        <ul>
                            {todos.map((todo) => (
                                <li key={todo.id}>
                                    <input type="checkbox" checked={todo.completed} onChange={() => setCompleted(todo.id)} />
                                    <span>{todo.text} </span>
                                    <button type='button' className={styles.danger} onClick={() => removeTodo(todo.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No Todos</p>
                    )}

                </form>
           </main>
        </>
    )
}

export default TodoApp;