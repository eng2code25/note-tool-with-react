import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState(() => {
    const loadNotes = localStorage.getItem("note-app");
    return loadNotes ? JSON.parse(loadNotes) : [];
  });

  const [searchNotes, setSearchNotes] = useState("");

  const deleteNote = (targetDeleteIndex) => {
    const updatedNotes = savedNotes.filter(
      (_, index) => index !== targetDeleteIndex,
    );
    setSavedNotes(updatedNotes);
  };

  const editNote = (targetEditIndex) => {
    if (noteText.trim() !== "") {
      alert("Please save note before proceeding");
      return;
    }

    const targetNote = savedNotes[targetEditIndex];
    setIsEditorVisible(true);
    setNoteText(targetNote);
    deleteNote(targetEditIndex);
  };

  useEffect(() => {
    localStorage.setItem("note-app", JSON.stringify(savedNotes));
  }, [savedNotes]);

  return (
    <div className="app-container">
      <section className="notes-container">
        <h1>My Notes</h1>
        <button
          className="add-notes-button"
          onClick={() => setIsEditorVisible(!isEditorVisible)}
        >
          + Add Notes
        </button>
        {isEditorVisible && (
          <div className="note-editor">
            <textarea
              className="note-input"
              placeholder="write your notes here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <br />
            <button
              className="save-btn"
              onClick={() => {
                setSavedNotes([...savedNotes, noteText]);
                setNoteText("");
              }}
            >
              Save
            </button>
            <button className="delete-btn" onClick={() => setNoteText("")}>
              Delete
            </button>
          </div>
        )}
      </section>
      <section className="note-container">
        <h2>My Saved Notes</h2>
        <input
          placeholder="Search notes"
          value={searchNotes}
          onChange={(e) => setSearchNotes(e.target.value)}
        ></input>
        <button
          onClick={() => {
            setSearchNotes("");
          }}
        >
          Clear Notes
        </button>
        <div className="save-notes">
          {savedNotes
            .filter((note) =>
              note.toLowerCase().includes(searchNotes.toLowerCase()),
            )
            .map((note, index) => (
              <div key={index} className="single-note">
                <p>{note}</p>
                <button onClick={() => deleteNote(index)}>Delete</button>
                <button onClick={() => editNote(index)}>Edit</button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default App;
