let randomNumber = Math.floor(Math.random() * 100) + 1;
        let numGuess = 1;
        let playGame = true;

        const submitBtn = document.querySelector('#subt');
        const userInput = document.querySelector('#guessField');
        const guessSlot = document.querySelector('.guesses');
        const remaining = document.querySelector('.lastResult');
        const lowOrHi = document.querySelector('.lowOrHi');
        const startOver = document.querySelector('.resultParas');
        
        const newGameContainer = document.createElement('div');

        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!playGame) return;
            
            const guess = parseInt(userInput.value, 10);
            validateGuess(guess);
        });

        function validateGuess(guess) {
            if (isNaN(guess)) {
                alert('Please enter a valid number');
            } else if (guess < 1 || guess > 100) {
                alert('Please enter a whole number between 1 and 100');
            } else {
                if(numGuess === 1) {
                    guessSlot.innerHTML = '';
                }
                displayGuess(guess);
                checkGuess(guess);
            }
        }

        function checkGuess(guess) {
            if (guess === randomNumber) {
                displayMessage('🎉 You guessed it right! Brilliant!');
                endGame();
            } else {
                if (numGuess > 10) {
                    displayMessage(`💥 Game Over! The number was ${randomNumber}`);
                    endGame();
                } else {
                    if (guess < randomNumber) {
                        displayMessage('📉 Too low! Try a higher number.');
                    } else if (guess > randomNumber) {
                        displayMessage('📈 Too high! Try a lower number.');
                    }
                }
            }
        }

        function displayGuess(guess) {
            userInput.value = '';
            guessSlot.innerHTML += `${guess} `;
            numGuess++;
            remaining.innerHTML = `${Math.max(0, 11 - numGuess)}`;
        }

        function displayMessage(message) {
            lowOrHi.innerHTML = `<h2>${message}</h2>`;
        }

        function endGame() {
            userInput.value = '';
            userInput.setAttribute('disabled', '');
            submitBtn.setAttribute('disabled', '');
            submitBtn.style.opacity = '0.3';
            submitBtn.style.cursor = 'not-allowed';
            
            newGameContainer.innerHTML = `<button id="newGame" class="restart-btn">Start New Game</button>`;
            startOver.appendChild(newGameContainer);
            playGame = false;
            setupNewGame();
        }

        function setupNewGame() {
            const newGameButton = document.querySelector('#newGame');
            newGameButton.addEventListener('click', function () {
                randomNumber = Math.floor(Math.random() * 100) + 1;
                numGuess = 1;
                guessSlot.innerHTML = 'None';
                remaining.innerHTML = '10';
                lowOrHi.innerHTML = '';
                
                userInput.removeAttribute('disabled');
                submitBtn.removeAttribute('disabled');
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
           startOver.removeChild(newGameContainer);
           playGame = true;
           userInput.focus();
            });
        }