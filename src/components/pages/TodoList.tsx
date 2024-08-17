import { useEffect, useState } from 'react';
import { Todo } from '../todo';


type TodoItem = {
    id: string;
    title: string;
    checked: boolean;
}

export const TodoList = () => {
    const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
    const [editModeTodo, setEditModeTodo] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3200/api/todo/list')
            .then(res => res.json())
            .then(data => {
                console.log('data: ', data);
                setTodoList(data);
            });
    }, [])

    const handleCheck = (id: string) => (checked: boolean) => setTodoList((todoList) => todoList.map(item => {
        if (item.id === id) {
            return {
                ...item,
                checked: checked,
            };
        } else return item;
    }));

    const handleDelete = (id: string) => () => setTodoList((todoList) => todoList.filter(item => item.id !== id));

    const handleEditTitme = (id: string) => (title: string) => setTodoList((todoList) => todoList.map(item => {
        setEditModeTodo(null);
        if (item.id === id) {
            return {
                ...item,
                title: title,
            };
        } else return item;
    }));

    return (<div>
        <section className='flex gap-y-[12px] flex-col'>
            <h1 className='text-[white] text-2xl'>Todo List</h1>
            <ul>
                {
                    todoList.map((item, index) => <li key={index}>
                        <Todo
                            title={item.title}
                            checked={item.checked}
                            mode={editModeTodo === item.id ? 'edit' : 'read'}
                            onEdit={handleEditTitme(item.id)}
                            onChangeMode={() => setEditModeTodo(item.id)}
                            onCheck={handleCheck(item.id)}
                            onDelete={handleDelete(item.id)}
                        />
                    </li>)
                }
            </ul>
        </section>
    </div>
    );
}