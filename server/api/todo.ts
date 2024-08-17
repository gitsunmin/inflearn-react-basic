const TodoList = [
    {
        id: Math.random().toString(36).slice(2),
        title: '첫 번째 할 일',
        checked: false,
    },
    {
        id: Math.random().toString(36).slice(2),
        title: '두 번째 할 일',
        checked: true,
    },
    {
        id: Math.random().toString(36).slice(2),
        title: '세 번째 할 일',
        checked: false,
    }
]

type Payload = {
    pathname: string;
    req: Request;
}

export const getTodoList = (option: ResponseInit) => () => {
    console.log('GET /api/todo/list');

    return new Response(JSON.stringify(TodoList), option);
};

export const createTodo = (option: ResponseInit) => async (payload: Payload) => {
    const { req } = payload;
    const { title } = await req.json() as { title: string };

    console.log('POST /api/todo/create', title);

    const todo = {
        id: Math.random().toString(36).slice(2),
        title,
        checked: false,
    }
    TodoList.push(todo);
    return new Response(JSON.stringify(todo), option);
}

export const updateTodoTitle = (option: ResponseInit) => async (payload: Payload) => {
    const { pathname, req } = payload;
    const id = pathname.split('/').pop();
    const { title } = await req.json() as { title: string };

    console.log('PUT /api/todo/update', id, title);

    if (id) {
        const TodoIndex = TodoList.findIndex(item => item.id === id);
        if (TodoIndex === -1) throw new Error('Todo not found');

        const todo = TodoList[TodoIndex];
        todo.title = title;

        return new Response(JSON.stringify(todo), option);
    } else {
        return new Response("400 Bad Request", {
            status: 400,
            ...option,
        });
    }
}

export const checkTodo = (option: ResponseInit) => async (payload: Payload) => {
    const { pathname, req } = payload;
    const id = pathname.split('/').pop();

    const { checked } = await req.json() as { checked: boolean };

    console.log('PUT /api/todo/check', id, checked);

    if (id) {
        const TodoIndex = TodoList.findIndex(item => item.id === id);

        if (TodoIndex === -1) throw new Error('Todo not found');

        const todo = TodoList[TodoIndex];

        todo.checked = checked;

        return new Response(JSON.stringify(todo), option);
    } else {
        return new Response("400 Bad Request", {
            status: 400,
            ...option,
        });
    }
}

export const deleteTodo = (option: ResponseInit) => (payload: Payload) => {
    const { pathname } = payload;
    const id = pathname.split('/').pop();

    console.log('DELETE /api/todo/delete', id);

    if (id) {
        const TodoIndex = TodoList.findIndex(item => item.id === id);
        if (TodoIndex === -1) throw new Error('Todo not found');

        const [todo] = TodoList.splice(TodoIndex, 1);

        return new Response(JSON.stringify(todo), option);
    } else {
        return new Response("400 Bad Request", {
            status: 400,
            ...option,
        });
    }
}