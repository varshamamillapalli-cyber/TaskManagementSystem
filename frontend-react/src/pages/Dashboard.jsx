import { useState } from "react";

export default function Dashboard() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Frontend UI",
      description: "Create Login Page",
      status: "Pending",
      assignedTo: "Frontend Team"
    },
    {
      id: 2,
      title: "Backend API",
      description: "Create CRUD APIs",
      status: "In Progress",
      assignedTo: "Backend Team"
    },
    {
      id: 3,
      title: "Testing",
      description: "Verify APIs",
      status: "Completed",
      assignedTo: "QA Team"
    }
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assignedTo, setAssignedTo] = useState("Frontend Team");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const role = "ADMIN";

  const addTask = () => {

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      status,
      assignedTo
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setAssignedTo("Frontend Team");

    alert("Task Added Successfully");
  };

  const updateTask = () => {

    setTasks(
      tasks.map(task =>
        task.id === editId
          ? {
              ...task,
              title,
              description,
              status,
              assignedTo
            }
          : task
      )
    );

    setEditId(null);

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setAssignedTo("Frontend Team");

    alert("Task Updated Successfully");
  };

  const deleteTask = (id) => {

    setTasks(tasks.filter(task => task.id !== id));

    alert("Task Deleted Successfully");
  };

  const editTask = (task) => {

    setEditId(task.id);

    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setAssignedTo(task.assignedTo);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h1>Task Management Dashboard</h1>

      <div className="card p-3 mb-3">

        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={editId ? updateTask : addTask}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Team</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredTasks.map(task => (

            <tr key={task.id}>

              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
