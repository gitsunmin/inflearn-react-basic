
const BASE_URL = 'http://localhost:3000';

export const MockAPI = {
    getTodoList: () => fetch(`${BASE_URL}/api/todo/list`, {
        method: 'GET',
    }).then(res => res.json()),
    checkTodo: (id: string, checked: boolean) => fetch(`${BASE_URL}/api/todo/check/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ checked }),
    }).then(res => res.json()),
    deleteTodo: (id: string) => fetch(`${BASE_URL}/api/todo/delete/${id}`, {
        method: 'DELETE',
    }).then(res => res.json()),
    createTodo: (title: string) => fetch(`${BASE_URL}/api/todo/create`, {
        method: 'POST',
        body: JSON.stringify({ title }),
    }).then(res => res.json()),
    updateTodoTitle: (id: string, title: string) => fetch(`${BASE_URL}/api/todo/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title }),
    }).then(res => res.json()),
}