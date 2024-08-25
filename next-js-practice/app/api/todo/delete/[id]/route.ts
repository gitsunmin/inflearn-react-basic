import TodoList from '@/data/todo';
import { match, P } from 'ts-pattern';

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    console.log('DELETE /api/todo/delete', id);

    return match(id)
        .with(P.string, () => {
            const TodoIndex = TodoList.findIndex(item => item.id === id);
            if (TodoIndex === -1) throw new Error('Todo not found');

            const [todo] = TodoList.splice(TodoIndex, 1);

            return new Response(JSON.stringify(todo));
        })
        .otherwise(() => new Response('Bad Request', {
            status: 400,
        }));
}