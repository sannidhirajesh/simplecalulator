# Basic Calculator Program

print("Welcome to Simple Calculator")

while True:
    print("\nChoose operation:")
    print("1 - Add")
    print("2 - Subtract")
    print("3 - Multiply")
    print("4 - Divide")
    print("5 - Square of a number")
    print("6 - Exit")

    choice = input("Enter option: ")

    if choice == "6":
        print("Hope you got your solution.Program ended.")
        break

    if choice == "1" or choice == "2" or choice == "3" or choice == "4":

        a = float(input("Enter first number: "))
        b = float(input("Enter second number: "))

        if choice == "1":
            answer = a + b
            print("Answer is:", answer)

        if choice == "2":
            answer = a - b
            print("Answer is:", answer)

        if choice == "3":
            answer = a * b
            print("Answer is:", answer)

        if choice == "4":
            if b == 0:
                print("Cannot divide by zero")
            else:
                answer = a / b
                print("Answer is:", answer)
    elif choice == "5" :
         n= float(input("Enter number: "))
         print("Square is: ",n*n)

    else:
        print("Wrong choice, try again")