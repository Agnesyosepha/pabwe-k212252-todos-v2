import React, { useState } from "react";

function TodoEditForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...todo,
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Judul</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Deskripsi</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <button type="submit" className="btn btn-success">
          Simpan
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Batal
        </button>
      </div>
    </form>
  );
}

export default TodoEditForm;
