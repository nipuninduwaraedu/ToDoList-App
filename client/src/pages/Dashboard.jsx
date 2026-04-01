import { useEffect, useState } from "react";
import API from "../api/axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const Dashboard = ({ search }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    try {
      const cleanTitle = title.trim();
      if (!cleanTitle) return;
      const { data } = await API.post("/todos", { title: cleanTitle });
      setTodos((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError(error.response?.data?.message || "Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const { data } = await API.patch(`/todos/${id}/toggle`);
      setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
      setError(error.response?.data?.message || "Failed to toggle todo");
    }
  };

  const updateTodo = async (id, title) => {
    try {
      const cleanTitle = title.trim();
      if (!cleanTitle) return;

      const { data } = await API.put(`/todos/${id}`, { title: cleanTitle });
      setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
      setError(error.response?.data?.message || "Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(error.response?.data?.message || "Failed to delete todo");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>My Todo Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <TodoForm onAdd={addTodo} />

      <div className="todo-list">
        {loading ? (
          <p>Loading...</p>
        ) : filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
