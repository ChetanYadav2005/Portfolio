document.addEventListener('DOMContentLoaded', () => {
    
    // ============================
    // 1. THEME TOGGLE LOGIC
    // ============================
    const themeBtn = document.getElementById('theme-btn');
    
    // Check if theme button exists before adding listener
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.body;
            const current = body.getAttribute('data-theme');
            if (current === 'light') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }

    // ============================
    // 2. TERMINAL LOGIC (FIXED)
    // ============================
    const input = document.getElementById('cmd-input');
    const historyBox = document.getElementById('terminal-history');
    const terminalBox = document.getElementById('terminal-wrapper');

    // Only run if terminal elements exist
    if (input && historyBox && terminalBox) {
        
        // Auto-focus input when clicking the terminal box
        terminalBox.addEventListener('click', () => {
            input.focus();
        });

        input.addEventListener('keydown', (e) => {
            // Check for Enter key
            if (e.key === 'Enter') {
                const cmd = input.value.toLowerCase().trim();
                let output = "";

                // Command Logic
                if (cmd === 'help') {
                    output = "Available commands: <br>- <span style='color:#fff'>about</span><br>- <span style='color:#fff'>skills</span><br>- <span style='color:#fff'>contact</span><br>- <span style='color:#fff'>clear</span>";
                } 
                else if (cmd === 'contact') {
                    output = "Email: <a href='mailto:chetan03yadav2005@gmail.com' style='color:var(--accent)'>chetan03yadav2005@gmail.com</a>";
                } 
                else if (cmd === 'skills') {
                    output = "Python, Java, MERN Stack, Linux, SQL, GenAI";
                } 
                else if (cmd === 'about') {
                    output = "CS Graduate, Trainee at TCS, Backend Enthusiast.";
                } 
                else if (cmd === 'clear') {
                    historyBox.innerHTML = '<div style="margin-bottom:10px; color:#666">Terminal cleared.</div>';
                    input.value = "";
                    return; // Stop here for clear
                } 
                else if (cmd === "") {
                    // Do nothing for empty enter
                    return;
                } 
                else {
                    output = `Command not found: '${cmd}'. Type 'help'.`;
                }

                // 1. Append User's Command to History
                const userLine = document.createElement('div');
                userLine.innerHTML = `<span style="color:var(--accent)">~/visitor $</span> <span style="color:#fff">${input.value}</span>`;
                historyBox.appendChild(userLine);

                // 2. Append System Response to History
                if (output) {
                    const sysLine = document.createElement('div');
                    sysLine.style.marginBottom = "10px";
                    sysLine.style.marginTop = "5px";
                    sysLine.style.color = "#ccc";
                    sysLine.innerHTML = output;
                    historyBox.appendChild(sysLine);
                }

                // 3. Reset Input & Scroll to Bottom
                input.value = "";
                terminalBox.scrollTop = terminalBox.scrollHeight;
            }
        });
    } else {
        console.error("Terminal elements not found! Check IDs in HTML.");
    }
});
