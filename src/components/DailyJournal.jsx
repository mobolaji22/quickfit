import { useState } from "react";
// import "./DailyJournal.css";

const DailyJournal = () => {
  const [entry, setEntry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement journal entry logic here
  };

  return (
    <div className="daily-journal-container">
      <h2>Your Daily Journal</h2>
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
    </div>
  );
};

export default DailyJournal;
