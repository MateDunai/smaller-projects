const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

const patterns = [
    { regex: /^\s*#\s(.*?)$/gm, replace: '<h1>$1</h1>' },
    { regex: /^\s*##\s(.*?)$/gm, replace: '<h2>$1</h2>' },
    { regex: /^\s*###\s(.*?)$/gm, replace: '<h3>$1</h3>' },
    { regex: /^\s*>\s(.*?)$/gm, replace: '<blockquote>$1</blockquote>' },
    { regex: /(\*\*|__)(.*?)\1/g, replace: '<strong>$2</strong>' },
    { regex: /(\*|_)(.*?)\1/g, replace: '<em>$2</em>' },
    { regex: /!\[(.*?)\]\((.*?)\)/g, replace: '<img alt="$1" src="$2">' },
    { regex: /\[(.*?)\]\((.*?)\)/g, replace: '<a href="$2">$1</a>' },
];

function convertMarkdown() {
    let html = markdownInput.value;
    patterns.forEach(({ regex, replace }) => {
        html = html.replace(regex, replace);
    });
    htmlOutput.textContent = html;  
    preview.innerHTML = html;      
    
    return html; 
}

markdownInput.addEventListener('input', convertMarkdown);
