/**
 * Represents a person with a name and age.
 */
 interface Person {
  /** The full name of the person */
  name: string;

  /** The age of the person in years */
  age: number;
}

/**
 * Greets a person by name.
 * @param person - The person to greet.
 * @returns A personalized greeting string.
 */
function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

/**
 * Example usage of the greet function.
 */
const user: Person = {
  name: "AJ",
  age: 21
};

console.log(greet(user));