import TodoList from '@/data/todo';
import { match, P } from 'ts-pattern';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const { checked } = await request.json() as { checked: boolean };

    console.log('PUT /api/todo/check', id, checked);

    return match([id, checked])
        .with([P.string, P.boolean], () => {
            const TodoIndex = TodoList.findIndex(item => item.id === id);

            if (TodoIndex === -1) throw new Error('Todo not found');

            const todo = TodoList[TodoIndex];

            todo.checked = checked;

            return new Response(JSON.stringify(todo));
        })
        .otherwise(() => new Response('Bad Request', {
            status: 400,
        }));
}