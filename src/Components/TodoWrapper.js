import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import { EditTodoForm } from './EditTodo';
uuidv4();

const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
        console.log(todos)
    }
    const toggleComplete = id => {
        setTodos(
            todos.map(todo => {
                if(todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }
                return todo
            })
        )
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing} : todo))
    }
    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    }
  return (
    <div className='TodoWrapper'>
    <h1>My To do List!</h1>
    <TodoForm addTodo={addTodo} />
    {todos.map((todo, index) => (
        todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo}/>
        ) : (
        <Todo task = {todo} key={index} toggleComplete={toggleComplete} deleteTodo ={deleteTodo} editTodo={editTodo}/>
    )
))}
    </div>
  )
}

export default TodoWrapper