import TodoList from '@/data/todo';

export async function POST(
    request: Request,
) {
    const { title } = await request.json() as { title: string };

    console.log('POST /api/todo/create', title);

    const todo = {
        id: Math.random().toString(36).slice(2),
        title: title || 'New Todo',
        checked: false,
    }

    TodoList.push(todo);

    return new Response(JSON.stringify(todo));
}