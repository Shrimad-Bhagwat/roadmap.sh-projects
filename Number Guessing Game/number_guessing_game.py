import random
import time

def number_guessing_game():
    print(
        """
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)
        """
    )

    choice = int(input("Enter your choice: "))
    while choice < 1 or choice > 3:
        print("Enter a valid choice!")
        choice = int(input())

    if choice == 1:
        print("\nGreat! You have selected the Easy difficulty level.")
        no_of_guesses = 10
    elif choice == 2:
        print("\nGreat! You have selected the Medium difficulty level.")
        no_of_guesses = 5
    else:
        print("\nGreat! You have selected the Hard difficulty level.")
        no_of_guesses = 3

    print("Let's start the game!")

    number = random.randint(1, 100)
    attempts = 0
    start_time = time.time()  

    while no_of_guesses:
        attempts += 1
        guess = int(input("\nEnter your guess: "))

        if guess == number:
            elapsed_time = time.time() - start_time  
            print(f"Congratulations! You guessed the correct number in {attempts} attempts and {elapsed_time:.2f} seconds.")
            return attempts
        else:
            if guess > number:
                print(f"Incorrect! The number is less than {guess}.")
            else:
                print(f"Incorrect! The number is greater than {guess}.")

            difference = abs(number - guess)
            if difference <= 10:
                print("Hint: You're very close!")
            elif difference <= 20:
                print("Hint: You're close!")

        no_of_guesses -= 1
        # print(f"Remaining chances: {no_of_guesses}")

    print(f"Sorry, you've run out of chances! The correct number was {number}.")
    return attempts

def main():
    high_score = float('inf')
    while True:
        score = number_guessing_game()
    
        if score < high_score: # in this case the fewest attempts
            high_score = score
            print(f"New High Score: {high_score} attempts!")

        play_again = input("\nDo you want to play again? (yes/no): ").lower()
        if play_again != 'yes':
            break

if __name__ == "__main__":
    main()
