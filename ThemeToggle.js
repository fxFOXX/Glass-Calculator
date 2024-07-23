import React from 'react';

const ThemeToggle = ({ isNightMode, toggleTheme }) => {
    return (
        <label htmlFor="theme" className="theme">
            <span className="theme__toggle-wrap">
                <input
                    id="theme"
                    className="theme__toggle"
                    type="checkbox"
                    role="switch"
                    name="theme"
                    value="dark"
                    checked={isNightMode}
                    onChange={toggleTheme}
                />
                <span className="theme__fill"></span>
                <span className="theme__icon">
                    {[...Array(9)].map((_, index) => (
                        <span key={index} className="theme__icon-part"></span>
                    ))}
                </span>
            </span>
        </label>
    );
};

export default ThemeToggle;
