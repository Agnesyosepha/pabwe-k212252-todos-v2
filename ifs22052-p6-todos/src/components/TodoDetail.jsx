import React, { useState } from "react";
import PropTypes from "prop-types";
import { todoItemShape } from "./TodoItem";
import { FaClock } from "react-icons/fa6";
import TodoEditForm from "./TodoEditForm";
import { postedAt } from "../utils/tools";

function TodoDetail({ todo, onUpdate, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  // Mengubah state ke mode edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Mengembalikan state saat update selesai
  const handleSave = (updatedTodo) => {
    setIsEditing(false);
    onUpdate(updatedTodo);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TodoEditForm todo={todo} onSave={handleSave} onCancel={handleCancel} />
    );
  }

  let badgeStatus, badgeLabel;
  if (todo.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h5>{todo.title}</h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
              <button className="btn btn-primary ms-2" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => onDeleteTodo(todo.id)}
              >
                Hapus
              </button>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(todo.created_at)}</span>
            </div>
          </div>
          <div className="col-12">
            <hr />
            {todo.description}
          </div>
        </div>
      </div>
    </div>
  );
}

TodoDetail.propTypes = {
  todo: PropTypes.shape(todoItemShape).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoDetail;
