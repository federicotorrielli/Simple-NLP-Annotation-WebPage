import {useEffect, useState} from "react";

function DarkMode() {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const toggleDarkMode = () => {
        if (isDarkModeEnabled) {
            document.documentElement.classList.remove('dark-mode');
            setIsDarkModeEnabled(false);
            // Add "dark-mode-input" property to every input element
            const inputs = document.getElementsByTagName('input');
            for (const element of inputs) {
                element.classList.remove('dark-mode-input');
            }
        } else {
            document.documentElement.classList.add('dark-mode');
            setIsDarkModeEnabled(true);
            // Add "dark-mode-input" property to every input element
            const inputs = document.getElementsByTagName('input');
            for (const element of inputs) {
                element.classList.add('dark-mode-input');
            }
        }
    }

    useEffect(() => {
        const onScroll = () => {
            setSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className={`sticky-button ${isSticky ? 'sticky' : ''}`}>
            <label className="switch">
                <input type="checkbox" onClick={toggleDarkMode}/>
                <div className="slider round"></div>
            </label>
        </div>
    )
}

export default DarkMode;