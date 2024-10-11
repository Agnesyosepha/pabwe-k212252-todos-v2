import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoItem, { todoItemShape } from "./TodoItem";
import TodoDetail from "./TodoDetail";

function TodoList({ todos, onDeleteTodo }) {
  const [todoList, setTodoList] = useState(todos);

  // Fungsi untuk memperbarui todo
  const handleUpdateTodo = (updatedTodo) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodoList(updatedTodos); // Perbarui state todoList
  };

  return (
    <div>
      {todoList.map((todo) => (
        <TodoDetail
          key={todo.id}
          todo={todo}
          onUpdate={handleUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoItemShape)).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
