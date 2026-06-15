import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://taskmanagementsystem-gszt.onrender.com";

export default function Comments() {

  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/comments`
      );

      setComments(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load comments");
    }
  };

  const addComment = async () => {

    if (!username || !comment) {
      alert("Please enter username and comment");
      return;
    }

    try {

      await axios.post(
        `${API_URL}/comments`,
        {
          username,
          comment
        }
      );

      setUsername("");
      setComment("");

      fetchComments();

    } catch (error) {

      console.log(error);

      alert("Failed to add comment");
    }
  };

  const deleteComment = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/comments/${id}`
      );

      fetchComments();

    } catch (error) {

      console.log(error);

      alert("Failed to delete comment");
    }
  };

  return (
    <div className="container mt-5">

      <h1>Comments Module</h1>

      <input
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="btn btn-success mb-4"
        onClick={addComment}
      >
        Add Comment
      </button>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>User</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {comments.map((c) => (

            <tr key={c._id}>

              <td>{c.username}</td>

              <td>{c.comment}</td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteComment(c._id)}
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
