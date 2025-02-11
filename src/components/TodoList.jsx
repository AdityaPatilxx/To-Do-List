import { useEffect, useState } from "react";
import { Check, Trash } from "lucide-react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Minimalist To-Do
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <span
                className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(index)}
                  className="p-2 text-white rounded-lg"
                >
                  <Check className="w-4 h-4 text-green-500" />
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="p-2 text-white rounded-lg"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
