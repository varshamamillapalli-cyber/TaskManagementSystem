import { useEffect, useState } from "react";
import axios from "axios";

export default function Comments() {

  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {

    const response =
      await axios.get(
        "http://localhost:5000/comments"
      );

    setComments(response.data);
  };

  const addComment = async () => {

    await axios.post(
      "http://localhost:5000/comments",
      {
        username,
        comment
      }
    );

    setUsername("");
    setComment("");

    fetchComments();
  };

  const deleteComment = async (id) => {

    await axios.delete(
      `http://localhost:5000/comments/${id}`
    );

    fetchComments();
  };

  return (
    <div className="container mt-5">

      <h1>Comments Module</h1>

      <input
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Comment"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
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

          {comments.map(c => (

            <tr key={c._id}>

              <td>{c.username}</td>

              <td>{c.comment}</td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteComment(c._id)
                  }
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