document.getElementById('generateButton').addEventListener('click', () => {
            const inputStr = document.getElementById('inputString').value;
            const permutations = permuteString(inputStr);
            const permutationsList = document.getElementById('permutationsList');
            permutationsList.innerHTML = '';

            if (permutations.length === 0 && inputStr.length > 0) {
                permutationsList.innerHTML = '<li>No permutations found (input might be empty or invalid).</li>';
            } else if (permutations.length === 0 && inputStr.length === 0) {
                permutationsList.innerHTML = '<li>Please enter a string to generate permutations.</li>';
            } else {
                permutations.forEach(perm => {
                    const listItem = document.createElement('li');
                    listItem.textContent = perm;
                    permutationsList.appendChild(listItem);
                });
            }
        });

function permuteString(str) {
    const results = [];

    function backtrack(currentStr, prefix) {
        if (currentStr.length === 0) {
        results.push(prefix);
        return;
    }

    for (let i = 0; i < currentStr.length; i++) {
        const char = currentStr[i];
        const remaining = currentStr.slice(0, i) + currentStr.slice(i + 1);
        backtrack(remaining, prefix + char);
    }
    }

    backtrack(str, "");

    return [...new Set(results)];
}