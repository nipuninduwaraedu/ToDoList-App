import { useState } from "react";

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle || cleanTitle === todo.title) {
      setIsEditing(false);
      setTitle(todo.title);
      return;
    }

    onUpdate(todo._id, cleanTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          className="todo-edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUpdate();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
        />
      ) : (
        <span
          className={todo.completed ? "completed" : ""}
          onClick={() => onToggle(todo._id)}
        >
          {todo.title}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;