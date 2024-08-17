import { match, P } from "ts-pattern";
import { checkTodo, createTodo, deleteTodo, getTodoList, updateTodoTitle } from "./api/todo";

export const CORS_HEADERS = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
};

const server = Bun.serve({
    port: 3200,
    async fetch(req) {
        const { url, method } = req;
        const { pathname } = new URL(url);

        // OPTIONS 메서드에 대한 프리플라이트 요청 처리
        if (method === "OPTIONS") {
            return new Response(null, {
                status: 204, // No Content
                ...CORS_HEADERS
            });
        }

        return await match({ pathname, req })
            .with({ pathname: "/api/todo/list", req: { method: "GET" } }, getTodoList(CORS_HEADERS))
            .with({ pathname: '/api/todo/create', req: { method: "POST" } }, createTodo(CORS_HEADERS))
            .with({ pathname: P.string.startsWith('/api/todo/check'), req: { method: "PUT" } }, checkTodo(CORS_HEADERS))
            .with({ pathname: P.string.startsWith('/api/todo/delete'), req: { method: "DELETE" } }, deleteTodo(CORS_HEADERS))
            .with({ pathname: P.string.startsWith('/api/todo/update'), req: { method: "PUT" } }, updateTodoTitle(CORS_HEADERS))
            .otherwise(() => {
                return new Response("404 Not Found", {
                    status: 404,
                    ...CORS_HEADERS,
                },);
            })
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);