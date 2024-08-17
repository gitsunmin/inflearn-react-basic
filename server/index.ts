import { match } from "ts-pattern";
import { getTodoList } from "./api/todo";

const CORS_HEADERS = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        "Content-Type": "application/json",
    },
};

const server = Bun.serve({
    port: 3200,
    async fetch(req) {
        const { url, method } = req;
        const { pathname } = new URL(url);

        return match([pathname, method])
            .with(["/api/todo/list", "GET"], () => {
                const todoList = getTodoList();

                console.log('GET /api/todo/list', todoList);
                return new Response(JSON.stringify(todoList), CORS_HEADERS);
            })
            .otherwise(() => {
                return new Response("404 Not Found", {
                    status: 404,
                });
            })
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);