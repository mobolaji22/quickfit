import { useState, useEffect } from "react";
import "../styles/DailyJournal.css";

const DailyJournal = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    // Load entries from local storage
    const savedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    // Save entries to local storage
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      const newEntry = {
        id: Date.now(),
        text: entry,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]); // Add new entry at the top
      setEntry(""); // Clear the textarea
    }
  };

  const handleEntryClick = (id) => {
    const entry = entries.find((e) => e.id === id);
    setSelectedEntry(entry);
  };

  const handleBackToList = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="daily-journal-container">
      <h2>Your Daily Journal</h2>
      {selectedEntry ? (
        <div className="entry-view">
          <button onClick={handleBackToList} className="journal-button">
            Back to List
          </button>
          <div className="journal-entry">
            <h3>Entry from {selectedEntry.date}</h3>
            <p>{selectedEntry.text}</p>
          </div>
        </div>
      ) : (
        <div className="journal-input">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your thoughts here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <button type="submit" className="journal-button">
              Save
            </button>
          </form>
          <div className="entries-container">
            <h3>Past Entries</h3>
            <div className="entries-list">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div className="entry-item" key={entry.id}>
                    <button onClick={() => handleEntryClick(entry.id)}>
                      {entry.date}
                    </button>
                  </div>
                ))
              ) : (
                <p>No entries yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyJournal;
