let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let themeToggler = document.getElementById('theme-toggler');
let body = document.body;
let title = document.querySelector('.title');
let string = '';

// Load the click sound 
const clickSound = document.getElementById('click-sound');
clickSound.volume = 0.5; // Set volume to a reasonable level
clickSound.preload = 'auto'; // Preload the audio to reduce delay

//  function to update the display
function updateDisplay(value) {
    inputBox.value = value;
}

//  function to format results to avoid excessive decimals
function formatResult(result) {
    return parseFloat(result).toFixed(4).replace(/(\.0+|(?<=\.\d)0+)$/, '');
}

// Function to handle percentage conversion
function convertPercentages(expression) {
    return expression.replace(/(\d+)%/g, (match, p1) => `(${p1} / 100)`);
}

// Event listener for button clicks
buttons.forEach(element => {
    element.addEventListener('click', (b) => {
        let buttonText = b.target.innerText;

        if (buttonText === '=') {
            try {
                // Convert percentages to decimals
                string = convertPercentages(string);
                // Evaluate and format the result
                let result = eval(string);
                result = formatResult(result);
                // Set result for further calculations
                updateDisplay(result);
                string = result;
            } catch (error) {
                updateDisplay("Error (Press AC)");
                string = ''; // Clear the string after an error
            }
        } else if (buttonText === 'AC') {
            string = '';
            updateDisplay('0');
        } else if (buttonText === 'DEL') {
            if (string === '0') {
                string = '';
            } else if (string.length > 0) {
                // Remove last character
                string = string.slice(0, -1);
                if (string === '') {
                    updateDisplay('0');
                } else {
                    updateDisplay(string);
                }
            }
        } else if (buttonText === '%') {
            if (string !== '' && !isNaN(string.slice(-1))) {
                // Handle cases where a percentage might be added to a number
                if (string.slice(-1) !== '%') {

                    if (!isNaN(string.slice(-1))) {
                        string += '%';
                        updateDisplay(string);
                    }
                }
            }
        } else {
            // Reset if the last calculation was done
            if (inputBox.value === '0' || inputBox.value.includes('Error')) {
                string = '';
            }
            string += buttonText;
            updateDisplay(string);
        }

        // Play the click sound
        playClickSound();
    });
});

// Function to play the click sound
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(error => {
        console.error('Error playing click sound:', error);
    });
}

// Event listener for theme toggler
themeToggler.addEventListener('click', () => {
    body.classList.toggle('light');
    inputBox.classList.toggle('light');
    buttons.forEach(button => {
        button.classList.toggle('light');
    });
    title.classList.toggle('light');
});
