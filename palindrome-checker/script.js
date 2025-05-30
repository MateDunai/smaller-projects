const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener('click', () => {
    if (textInput.value === "")
        return alert('Please input a value');
    const resultText = palindromeChecker(textInput.value);
    result.innerHTML = `<p><strong>${textInput.value}</strong> ${resultText}</p>`;
    textInput.value = "";
});

function palindromeChecker(text) {
    const normalizedInput = text.toLowerCase().replace(/[^a-z0-9]/gi, "");
    if (normalizedInput === normalizedInput.split("").reverse().join(""))
        return `is a palindrome`;
    else 
    return `is not a palindrome`;
}