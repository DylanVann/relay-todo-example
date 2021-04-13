// @flow
export interface Todo {
  +type: 'todo';
  +id: string;
  +text: string;
  +complete: boolean;
  +description: string;
}

export interface User {
  +type: 'user';
  +id: string;
}

// Mock authenticated ID
export const USER_ID = 'me'

// Mock user database table
const user: User = { type: 'user', id: USER_ID }
const usersById: Map<string, User> = new Map([[USER_ID, user]])

// Mock todo database table
const todosById: Map<string, Todo> = new Map()
const todoIdsByUser: Map<string, $ReadOnlyArray<string>> = new Map([
  [USER_ID, []],
])

// Seed initial data
let nextTodoId: number = 0
addTodo('Taste JavaScript', true)
addTodo('Buy a unicorn', false)

function getTodoIdsForUser(id: string): $ReadOnlyArray<string> {
  return todoIdsByUser.get(id) || []
}

export function addTodo(
  text: string,
  complete: boolean,
  description?: string,
): string {
  const todo: Todo = {
    type: 'todo',
    id: `${nextTodoId++}`,
    text,
    complete,
    description,
  }
  todosById.set(todo.id, todo)

  const todoIdsForUser = getTodoIdsForUser(USER_ID)
  todoIdsByUser.set(USER_ID, todoIdsForUser.concat(todo.id))

  return todo.id
}

export function changeTodoStatus(id: string, complete: boolean) {
  const todo = getTodoOrThrow(id)
  todosById.set(id, { ...todo, complete })
}

// Private, for strongest typing, only export `getTodoOrThrow`
function getTodo(id: string): ?Todo {
  return todosById.get(id)
}

export function getTodoOrThrow(id: string): Todo {
  const todo = getTodo(id)

  if (!todo) {
    throw new Error(`Invariant exception, Todo ${id} not found`)
  }

  return todo
}

export function getTodos(status: string = 'any'): $ReadOnlyArray<Todo> {
  const todoIdsForUser = getTodoIdsForUser(USER_ID)
  const todosForUser = todoIdsForUser.map(getTodoOrThrow)

  if (status === 'any') {
    return todosForUser
  }

  return todosForUser.filter(
    (todo: Todo): boolean => todo.complete === (status === 'completed'),
  )
}

// Private, for strongest typing, only export `getUserOrThrow`
function getUser(id: string): ?User {
  return usersById.get(id)
}

export function getUserOrThrow(id: string): User {
  const user = getUser(id)

  if (!user) {
    throw new Error(`Invariant exception, User ${id} not found`)
  }

  return user
}

export function markAllTodos(complete: boolean): $ReadOnlyArray<string> {
  const todosToChange = getTodos().filter(
    (todo: Todo): boolean => todo.complete !== complete,
  )

  todosToChange.forEach((todo: Todo): void =>
    changeTodoStatus(todo.id, complete),
  )

  return todosToChange.map((todo: Todo): string => todo.id)
}

export function removeTodo(id: string) {
  const todoIdsForUser = getTodoIdsForUser(USER_ID)

  // Remove from the users list
  todoIdsByUser.set(
    USER_ID,
    todoIdsForUser.filter((todoId: string): boolean => todoId !== id),
  )

  // And also from the total list of Todos
  todosById.delete(id)
}

export function removeCompletedTodos(): $ReadOnlyArray<string> {
  const todoIdsForUser = getTodoIdsForUser(USER_ID)

  const todoIdsToRemove = getTodos()
    .filter((todo: Todo): boolean => todo.complete)
    .map((todo: Todo): string => todo.id)

  // Remove from the users list
  todoIdsByUser.set(
    USER_ID,
    todoIdsForUser.filter(
      (todoId: string): boolean => !todoIdsToRemove.includes(todoId),
    ),
  )

  // And also from the total list of Todos
  todoIdsToRemove.forEach((id: string): boolean => todosById.delete(id))

  return todoIdsToRemove
}

export function changeTodoDescription(id: string, description: string) {
  const todo = getTodoOrThrow(id)
  todosById.set(id, { ...todo, description })
}

export function renameTodo(id: string, text: string) {
  const todo = getTodoOrThrow(id)
  todosById.set(id, { ...todo, text })
}
