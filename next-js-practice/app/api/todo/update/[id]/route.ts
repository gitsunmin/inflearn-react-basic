import TodoList from '@/data/todo';
import { match, P } from 'ts-pattern';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { title } = await request.json() as { title: string };
    const { id } = params;

    console.log('PUT /api/todo/update', id, title);

    return match([id, title])
        .with([P.string, P.string], () => {
            const TodoIndex = TodoList.findIndex(item => item.id === id);
            if (TodoIndex === -1) throw new Error('Todo not found');

            const todo = TodoList[TodoIndex];
            todo.title = title;

            return new Response(JSON.stringify(todo));
        })
        .otherwise(() => new Response('Bad Request', {
            status: 400,
        }));
}