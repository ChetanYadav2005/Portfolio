document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE LOGIC ---
    const themeBtn = document.getElementById('theme-btn');
    
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

    // Check saved theme on load
    if (localStorage.getItem('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }

    // --- 2. TERMINAL LOGIC ---
    const input = document.getElementById('cmd-input');
    const historyBox = document.getElementById('terminal-history');
    const terminalBox = document.getElementById('terminal-wrapper');

    // Auto-focus input when clicking terminal
    terminalBox.addEventListener('click', () => {
        input.focus();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            let output = "";

            if (cmd === 'help') {
                output = "Available commands: <br>- <span style='color:#fff'>about</span><br>- <span style='color:#fff'>skills</span><br>- <span style='color:#fff'>contact</span><br>- <span style='color:#fff'>clear</span>";
            } else if (cmd === 'contact') {
                output = "Email: <a href='mailto:chetan03yadav2005@gmail.com' style='color:var(--accent)'>chetan03yadav2005@gmail.com</a>";
            } else if (cmd === 'skills') {
                output = "Python, Java, MERN Stack, Linux, SQL";
            } else if (cmd === 'about') {
                output = "CS Graduate, Trainee at TCS, Backend Enthusiast.";
            } else if (cmd === 'clear') {
                historyBox.innerHTML = '<div>Terminal cleared.</div>';
                input.value = "";
                return;
            } else if (cmd !== "") {
                output = `Command not found: '${cmd}'. Type 'help'.`;
            }

            // Append User Command
            if (cmd !== "") {
                const userLine = document.createElement('div');
                userLine.innerHTML = `<span style="color:var(--accent)">~/visitor $</span> ${input.value}`;
                historyBox.appendChild(userLine);
            }

            // Append System Response
            if (output !== "") {
                const sysLine = document.createElement('div');
                sysLine.style.marginBottom = "10px";
                sysLine.style.color = "#ccc";
                sysLine.innerHTML = output;
                historyBox.appendChild(sysLine);
            }

            // Scroll to bottom
            input.value = "";
            terminalBox.scrollTop = terminalBox.scrollHeight;
        }
    });
});
