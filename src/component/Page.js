import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, setEdit, updatePost } from '../Redux/Feature/PostSlice';
import Spinner from './Spinner';
function Page() {
  const [id, setId] = useState("");
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();

  // dispatch and selector
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({ ...state.app }))

  //useEffect hook
  useEffect(() => {
    if (body) {
      setTextBody(body)
    }
  }, [body])


  //function Call
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please provide Post ID")
    } else {
      console.log(dispatch(getPost({ id })))
      setId("");
    }
  }
  //handleDelete Function
  const handleDelete = (id) => {
    dispatch(deletePost({ id: post[0].id }))
    window.location.reload()
    window.alert("Post is Deleted")
  }

  return (
    <>

      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"> <h1 >SEARCH BY ID</h1></label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="form-control"
                id="email" />
            </div>
            <button type="submit" onClick={handleFetchData} className="btn btn-info">Fetch Post</button>
            <button type="button" onClick={() => navigate('/create')} className="btn btn-warning ms-4" >Create Post</button>
          </form>
        </div>
      </div>
      <div className="container">
        {
          loading ? <Spinner /> : (
            <div>
              {post.length > 0 && (
                <div>
                  <div className="card mt-4">
                    <div className="card-body">
                      <h5 className="card-title">{post[0].title}</h5>
                      {edit ? (<>
                        <textarea
                          className="form-control"
                          value={textBody}
                          onChange={e => setTextBody(e.target.value)}
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button type="button" className="btn btn-primary mt-2"
                            onClick={() => {
                              dispatch(updatePost({
                                id: post[0].id,
                                title: post[0].title,
                                body: textBody
                              }))
                              dispatch(setEdit({ edit: false, body: "" }))
                            }}>Save</button>
                          <button type="button" className="btn btn-danger ms-4"
                            onClick={() => dispatch(setEdit({ edit: false, body: "" }))}
                          >Cancel</button>
                        </div>
                      </>) : (
                        <>
                          <p className="card-text">{post[0].body}</p>
                        </>
                      )}
                      {!edit && (
                        <div className="d-flex align-items-end justify-content-end">
                          <button type="button" className="btn btn-primary" onClick={() => dispatch(setEdit({ edit: true, body: post[0].body }))}>Edit</button>
                          <button type="button" className="btn btn-danger ms-4" onClick={handleDelete}>Delete</button>
                        </div>
                      )

                      }

                    </div>
                  </div>
                </div>
              )}
            </div>

          )
        }
      </div>
    </>
  )
}

export default Page