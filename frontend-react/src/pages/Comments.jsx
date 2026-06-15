import { useEffect, useState } from "react";

export default function Comments() {

  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {

    setComments([
      {
        _id: "62adac86d3d6dcc882b2cb58",
        username: "varsha",
        comment: "review completed"
      },
      {
        _id: "62ff4ee3822fd52570b6f7b",
        username: "harshitha",
        comment: "review completed"
      }
    ]);

  };

  const addComment = () => {

    if (!username || !comment) {
      alert("Please fill all fields");
      return;
    }

    const newComment = {
      _id: Date.now().toString(),
      username,
      comment
    };

    setComments([...comments, newComment]);

    setUsername("");
    setComment("");

    alert("Comment Added Successfully");
  };

  const deleteComment = (id) => {

    setComments(
      comments.filter(c => c._id !== id)
    );

    alert("Comment Deleted Successfully");
  };

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Comments Module
      </h1>

      <input
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <textarea
        className="form-control mb-3"
        placeholder="Comment"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
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
