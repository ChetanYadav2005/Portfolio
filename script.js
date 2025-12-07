// --- THEME LOGIC ---
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    
    if (current === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Check local storage on load
if (localStorage.getItem('theme') === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

// --- TERMINAL LOGIC ---
const input = document.getElementById('cmd-input');
const box = document.getElementById('terminal-box');

// Focus on input when clicking anywhere in the terminal box
box.addEventListener('click', () => {
    input.focus();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        let output = "Command not found. Type 'help'.";

        if(cmd === 'help') output = "Try: contact, skills, about, clear";
        else if(cmd === 'contact') output = "Email: chetan03yadav2005@gmail.com";
        else if(cmd === 'skills') output = "Python, Java, MERN, Linux";
        else if(cmd === 'about') output = "CS Graduate, Trainee at TCS.";
        
        // Create the old command line
        const oldLine = document.createElement('div');
        oldLine.className = 'cmd-line';
        oldLine.innerHTML = `<span style="color:var(--accent)">~/visitor $</span> ${input.value}`;
        
        // Insert before the current input line
        box.insertBefore(oldLine, input.parentElement);

        if(cmd !== 'clear') {
            const res = document.createElement('div');
            res.style.marginBottom = "8px";
            res.style.color = "#ccc";
            res.innerText = output;
            box.insertBefore(res, input.parentElement);
        } else {
            // Reset terminal content
            box.innerHTML = `
                <div style="margin-bottom: 10px;">Welcome v1.0. Type 'help'.</div>
                <div class="cmd-line">
                    <span class="cmd-prompt">~/visitor $</span>
                    <input type="text" class="cmd-input" id="cmd-input" autocomplete="off">
                </div>`;
            
            // Re-bind the input variable and event listener after clearing HTML
            const newInput = document.getElementById('cmd-input');
            newInput.addEventListener('keydown', arguments.callee);
            newInput.focus();
            return;
        }
        
        // Clear input and scroll to bottom
        input.value = "";
        input.scrollIntoView();
    }
});
