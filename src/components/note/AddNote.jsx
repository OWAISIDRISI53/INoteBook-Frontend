import React, { useContext, useState } from "react";
import noteContext from "../../context/note/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({ title: "", description: "" });
  };

  const changeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 mx-auto">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            aria-describedby="textHelp"
            onChange={changeHandler}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            cols="30"
            rows="5"
            onChange={changeHandler}
            required
            minLength={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
