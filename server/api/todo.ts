const TodoList = [
    {
        id: 'Todo_1',
        title: '첫 번째 할 일',
        checked: false,
    },
    {
        id: 'Todo_2',
        title: '두 번째 할 일',
        checked: true,
    },
    {
        id: 'Todo_3',
        title: '세 번째 할 일',
        checked: false,
    }
]

export const getTodoList = () => TodoList;

export const createTodo = (title: string) => {
    const Todo = {
        id: Math.random().toString(36).slice(2),
        title,
        checked: false,
    }
    TodoList.push(Todo);
    return Todo;
}

export const updateTodoTitle = (id: string, title: string) => {
    const TodoIndex = TodoList.findIndex(item => item.id === id);
    if (TodoIndex === -1) throw new Error('Todo not found');

    TodoList[TodoIndex].title = title;

    return TodoList[TodoIndex];
}

export const checkTodo = (id: string, checked: boolean) => {
    const TodoIndex = TodoList.findIndex(item => item.id === id);
    if (TodoIndex === -1) throw new Error('Todo not found');

    TodoList[TodoIndex].checked = checked;

    return TodoList[TodoIndex];
}

export const deleteTodo = (id: string) => {
    const TodoIndex = TodoList.findIndex(item => item.id === id);
    if (TodoIndex === -1) throw new Error('Todo not found');

    TodoList.splice(TodoIndex, 1);

    return TodoList;
}