import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../Redux/Feature/PostSlice";
import Spinner from "./Spinner";

const CreatePage = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  //showCreatePost function
  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <h1>Create Post </h1>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
      <form >
        <div className="mb-3">
          <input type="text" value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Enter Post Title"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea className="form-control "  value={body} 
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button  className="btn btn-danger ms-4"  type="submit" onClick={handleSubmit} >
            submit
          </button>
        </div>
      </form>
      </div>
      </div>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
  );
};

export default CreatePage;