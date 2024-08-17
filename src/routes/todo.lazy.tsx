import { createLazyFileRoute } from '@tanstack/react-router'
import { TodoList } from '../components/pages/TodoList'


export const Route = createLazyFileRoute('/todo')({
  component: () => <TodoList/>
})