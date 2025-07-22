import inquirer from 'inquirer';

let difficultyLevels = [
    { name: 'Easy (10 chances)', value: { label: 'Easy', chances: 10 } },
    { name: 'Medium (5 chances)', value: { label: 'Medium', chances: 5 } },
    { name: 'Hard (3 chances)', value: { label: 'Hard', chances: 3 } }
];

console.clear();
async function startGame() {
    const { difficulty } = await inquirer.prompt({
        type: 'list',
        name: 'difficulty',
        message: `Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
Please select the difficulty level:`,
        choices: difficultyLevels
    });

    let randomNum = Math.floor(Math.random() * 101) + 1;
    let attempts = 0;
    const maxAttempts = difficulty.chances;
    console.log(`Great! You have selected the ${difficulty.label} difficulty level. You have ${maxAttempts} chances.\n`);

    while (attempts < maxAttempts) {
        const { guess } = await inquirer.prompt({
            name: 'guess',
            message: `Enter your guess (attempt ${attempts + 1}/${maxAttempts})`,
            validate: input => !isNaN(input) && Number(input) >= 1 && Number(input) <= 100
                ? true
                : 'Please enter a valid number between 1 and 100.'
        });
        let numGuess = Number(guess);
        attempts++;

        if (numGuess === randomNum) {
            console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
            return askPlayAgain();
        }

        if (numGuess > randomNum) {
            console.log(`Incorrect! The number is less than ${guess}`);
        } else if (numGuess < randomNum) {
            console.log(`Incorrect! The number is greater than ${guess}.`);
        }
    }

    console.log(`Game over! The number was ${randomNum}`);
    return askPlayAgain();
}

async function askPlayAgain() {
    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: "confirm",
        message: "Do you want to play again?"
    })
    if (!confirm) return console.log("See you!");
    console.clear();
    await startGame();
}

startGame();