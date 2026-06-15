import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://taskmanager-fastapi-varsha.onrender.com";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [assignedTo, setAssignedTo] = useState("Frontend Team");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role") || "ADMIN";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/tasks`
      );

      setTasks(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);
      setTasks([]);

    }
  };

  const addTask = async () => {

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        `${API_URL}/tasks`,
        {
          title,
          description,
          status,
          assignedTo
        }
      );

      alert("Task Added Successfully");

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setAssignedTo("Frontend Team");

      fetchTasks();

    } catch (error) {

      console.log(error);
      alert("Failed to Add Task");

    }
  };

  const updateTask = async () => {

    try {

      await axios.put(
        `${API_URL}/tasks/${editId}`,
        {
          title,
          description,
          status,
          assignedTo
        }
      );

      alert("Task Updated Successfully");

      setEditId(null);

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setAssignedTo("Frontend Team");

      fetchTasks();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }
  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }
  };

  const editTask = (task) => {

    setEditId(task.id);

    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setAssignedTo(task.assignedTo);

  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(task =>
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    task => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "30px"
      }}
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="text-white">
          Task Management Dashboard
        </h1>

        <span className="badge bg-success p-2">
          {role}
        </span>

      </div>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Tasks</h5>
              <h2>{totalTasks}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white shadow">
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h2>{pendingTasks}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white shadow">
            <div className="card-body text-center">
              <h5>In Progress</h5>
              <h2>{progressTasks}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Completed</h5>
              <h2>{completedTasks}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow p-4 mb-4">

        <h3 className="mb-3">
          {editId ? "Update Task" : "Add New Task"}
        </h3>

        <div className="row">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option>Frontend Team</option>
              <option>Backend Team</option>
              <option>QA Team</option>
            </select>
          </div>

          <div className="col-md-2">

            {role === "ADMIN" && (

              editId ? (

                <button
                  className="btn btn-success w-100"
                  onClick={updateTask}
                >
                  Update Task
                </button>

              ) : (

                <button
                  className="btn btn-primary w-100"
                  onClick={addTask}
                >
                  Add Task
                </button>

              )

            )}

          </div>

        </div>

      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-striped">

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

                  <td>
                    <span
                      className={
                        task.status === "Completed"
                          ? "badge bg-success"
                          : task.status === "In Progress"
                          ? "badge bg-info"
                          : "badge bg-warning"
                      }
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>{task.assignedTo}</td>

                  <td>

                    {role === "ADMIN" && (

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
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

                      </div>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
