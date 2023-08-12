// JavaScript for Text Encryption/Decryption Tool

function binaryToText(binaryStr) {
    const binaryList = binaryStr.split(' ');
    let text = '';
    binaryList.forEach(binary => {
      text += String.fromCharCode(parseInt(binary, 2));
    });
    return text;
  }
  
  function asciiToText(asciiStr) {
    const asciiList = asciiStr.split(' ');
    let text = '';
    asciiList.forEach(ascii => {
      text += String.fromCharCode(parseInt(ascii));
    });
    return text;
  }
  
  function textToAscii(textStr) {
    let asciiNums = '';
    for (let i = 0; i < textStr.length; i++) {
      const charCode = textStr.charCodeAt(i);
      asciiNums += charCode + ' ';
    }
    return asciiNums.trim();
  }
  
  function utf8ToText(utf8Str) {
    let text = '';
    try {
      text = decodeURIComponent(escape(utf8Str));
    } catch (e) {
      text = 'Invalid UTF-8 input';
    }
    return text;
  }
  
  function textToUtf8(textStr) {
    let utf8Str = '';
    try {
      utf8Str = unescape(encodeURIComponent(textStr));
    } catch (e) {
      utf8Str = 'Invalid text input';
    }
    return utf8Str;
  }
  
  function caesarCipher(text, shift) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {
        const shiftAmount = shift % 26;
        let charCode = char.charCodeAt(0);
        if (char.match(/[A-Z]/)) {
          charCode = ((charCode - 65 + shiftAmount) % 26) + 65;
        } else {
          charCode = ((charCode - 97 + shiftAmount) % 26) + 97;
        }
        encryptedText += String.fromCharCode(charCode);
      } else {
        encryptedText += char;
      }
    }
    return encryptedText;
  }
  
  function atbashCipher(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[A-Za-z]/)) {
        let charCode = char.charCodeAt(0);
        if (char.match(/[A-Z]/)) {
          charCode = 90 - (charCode - 65);
        } else {
          charCode = 122 - (charCode - 97);
        }
        encryptedText += String.fromCharCode(charCode);
      } else {
        encryptedText += char;
      }
    }
    return encryptedText;
  }
  
  function railFenceCipher(text, rails) {
    const encryptedText = Array(rails).fill('').map(() => []);
    let currentRail = 0;
    let direction = 1;
  
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[A-Za-z]/)) {
        encryptedText[currentRail].push(char);
        currentRail += direction;
        if (currentRail === rails || currentRail === -1) {
          direction *= -1;
          currentRail += 2 * direction;
        }
      } else {
        encryptedText[currentRail].push(char);
      }
    }
  
    let result = '';
    for (let rail = 0; rail < rails; rail++) {
      result += encryptedText[rail].join('');
    }
    return result;
  }
  
  function encryptDecrypt() {
    const selectedOption = document.getElementById('encryptionType').value;
    const inputText = document.getElementById('inputText').value.trim();
    const action = document.querySelector('input[name="action"]:checked').value;
    const shift = parseInt(document.getElementById('shift').value);
    const rails = parseInt(document.getElementById('rails').value);
  
    let result = '';
    if (selectedOption === 'binary') {
      if (action === 'encrypt') {
        result = inputText.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
      } else {
        result = binaryToText(inputText);
      }
    } else if (selectedOption === 'ascii') {
      if (action === 'encrypt') {
        result = textToAscii(inputText);
      } else {
        result = asciiToText(inputText);
      }
    } else if (selectedOption === 'utf8') {
      if (action === 'encrypt') {
        result = textToUtf8(inputText);
      } else {
        result = utf8ToText(inputText);
      }
    } else if (selectedOption === 'caesar') {
      if (action === 'encrypt') {
        result = caesarCipher(inputText, shift);
      } else {
        result = caesarCipher(inputText, -shift);
      }
    } else if (selectedOption === 'atbash') {
      if (action === 'encrypt') {
        result = atbashCipher(inputText);
      } else {
        result = atbashCipher(inputText);
      }
    } else { // Rail Fence
      if (action === 'encrypt') {
        result = railFenceCipher(inputText, rails);
      } else {
        result = railFenceCipher(inputText, rails);
      }
    }
  
    document.getElementById('outputText').value = result;
  }
  