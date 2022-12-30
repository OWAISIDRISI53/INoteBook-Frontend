import noteContext from "./noteContext";
import React, { useState } from 'react'

function NoteState(props) {
    const host = "http://localhost:8080";
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial)

    const getNotes = async () => {
        // Api call
        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()
        console.log(json);
        setNotes(json)
    }

    // add a Note
    const addNote = async (title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // delete note
    const deleteNote = async (id) => {
        // api call
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
        })
        const json = await response.json()
        const newNote = notes.filter(note => note._id !== id)
        setNotes(newNote)
    }

    // edit a Note
    const editNote = async (id, title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json()
        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break
            }
        }

        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
