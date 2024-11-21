const shapeMap = {
    'A': '▲', 'B': '●', 'C': '■', 'D': '◇', 'E': '★',
    'F': '▽', 'G': '▷', 'H': '▪', 'I': 'X', 'J': '◆',
    'K': '↑', 'L': '↪', 'M': '≡', 'N': '≣', 'O': '○',
    'P': '□', 'Q': '◇', 'R': '⊐', 'S': '⚡', 'T': '⊓',
    'U': '◎', 'V': '☾', 'W': '⊠', 'X': '✖', 'Y': '☈',
    'Z': '⚙'
};

let isEncryptMode = true;

// Mode Switch
document.getElementById("encryptMode").onclick = () => toggleMode(true);
document.getElementById("decryptMode").onclick = () => toggleMode(false);

function toggleMode(encrypt) {
    isEncryptMode = encrypt;
    document.getElementById("encryptMode").classList.toggle("active", encrypt);
    document.getElementById("decryptMode").classList.toggle("active", !encrypt);
    document.getElementById("actionButton").textContent = encrypt ? "Encrypt" : "Decrypt";
}

document.getElementById("darkModeToggle").onclick = () => {
    const body = document.body;
    const icon = document.getElementById("modeIcon");
    
    body.classList.toggle("dark-mode");

    // Switch between moon and sun icons
    if (body.classList.contains("dark-mode")) {
        icon.textContent = "☀️"; // Moon icon for dark mode
    } else {
        icon.textContent = "🌙"; // Sun icon for light mode
    }
};

// Encryption/Decryption
document.getElementById("actionButton").onclick = () => {
    const input = document.getElementById("inputText").value.toUpperCase();
    const shiftKey = 3; // Shift by 3 as an example
    let result = '';

    if (isEncryptMode) {
        for (const char of input) {
            result += shapeMap[char] || char;
        }
    } else {
        for (const char of input) {
            const original = Object.keys(shapeMap).find(key => shapeMap[key] === char);
            result += original || char;
        }
    }

    document.getElementById("outputText").value = result;
};

// Reset
document.getElementById("resetButton").onclick = () => {
    document.getElementById("inputText").value = '';
    document.getElementById("outputText").value = '';
};

// Copy to Clipboard
document.getElementById("copyButton").onclick = () => {
    navigator.clipboard.writeText(document.getElementById("outputText").value);
    alert("Copied to clipboard!");
};

// Voice Command
document.getElementById("voiceButton").onclick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        document.getElementById("inputText").value = event.results[0][0].transcript;
    };
};
