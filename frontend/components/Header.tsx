import React from "react";

interface HeaderProps {
  onNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask }) => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          {/* Checkmark icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div>
          <h1>TaskFlow</h1>
          <p>Full-stack task manager</p>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onNewTask}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Task
      </button>
    </header>
  );
};

export default Header;
