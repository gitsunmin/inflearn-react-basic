import { useEffect, useState } from 'react';
import { Todo } from '../todo';
import { MockAPI } from '../../utils/mock';


type TodoItem = {
    id: string;
    title: string;
    checked: boolean;
}

export const TodoList = () => {
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
    const [editModeTodo, setEditModeTodo] = useState<string | null>(null);

    useEffect(() => {
        MockAPI.getTodoList().then(data => {
            setTodoList(data);
        });
    }, [])

    const handleCreateTodo = (title: string) => {
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }

        MockAPI.createTodo(title).then(data => {
            setTodoList((todoList) => [...todoList, data]);
            setNewTodoTitle('');
        });
    }

    const handleCheck = (id: string) => (checked: boolean) => {
        MockAPI.checkTodo(id, checked).then(data => {
            setTodoList((todoList) => {
                return todoList.map(item => {
                    if (item.id === data.id) return data;
                    else return item;
                });
            });
        });
    };

    const handleDelete = (id: string) => () => {
        MockAPI.deleteTodo(id).then(data => {
            setTodoList((todoList) => todoList.filter(item => item.id !== data.id)
            )
        });
    };

    const handleEditTitle = (id: string) => (title: string) => {
        setEditModeTodo(null);
        MockAPI.updateTodoTitle(id, title).then(data => {
            setTodoList((todoList) => {
                return todoList.map(item => {
                    if (item.id === data.id) return data;
                    else return item;
                });
            });
        })
    };

    return (<div>
        <section className='flex gap-y-[12px] flex-col'>
            <h1 className='text-[white] text-2xl'>Todo List</h1>
            <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateTodo(newTodoTitle);
                }}
            />
            <button onClick={() => handleCreateTodo(newTodoTitle)}>Create</button>
            <hr />
            <ul>
                {
                    todoList.map((item, index) => <li key={index}>
                        <Todo
                            title={item.title}
                            checked={item.checked}
                            mode={editModeTodo === item.id ? 'edit' : 'read'}
                            onEdit={handleEditTitle(item.id)}
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