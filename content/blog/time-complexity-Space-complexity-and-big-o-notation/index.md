---
title: Time Complexity, Space Complexity, and Big O Notation
date: "2020-08-19T22:40:32.169Z"
description: "Data Structures & Algorithms using JavaScript - Using Big O Notation"
---

This is the first post in my series Data Structures & Algorithms. As a boot camp grad, I found that once I started my professional career in software development, there was a gap in my fundamentals knowledge. Although I am not reversing a binary tree day-in-and-day-out, I do think it is important to learn these fundamentals simply because you will be a better developer by knowing they exist. This week I start things off by discussing Time and Space Complexity, and how you can use Big O notation to determine these metrics.

## Time Complexity

> A measurement of computing time that an algorithm takes to complete

What causes time complexity?

- Operations (`+`, `-`, `*`, `/`)
- Comparisons (`>`, `<`, `==`)
- Looping (for, while)
- Outside function calls (`function()`)

## Big O Notation

> The language and metric we use for talking about how long it takes for an algorithm to run

### O(1) Constant Time

> Not bound by the size of an input, only one operation is performed

- Direct query of data you are looking for
- No iterating (loops) are involved

If you know the precise location of data you want to pull out of an Object `{}` or Array `[]`, you can query for that item without having to iterate or perform any additional computation.

Most of the time, if you're using _Constant Time_, you are in good shape from a performance standpoint.

Let me show you an example in which I perform tasks that evaluate to _Constant Time_:

```js
const jedi = ["luke", "anakin", "obi wan", "mace windu", "yoda", "darth vader"];

function findAJedi(jediList) {
  console.log(jediList[1]); // O(1)
}

findAJedi(jedi); // O(1)
```

First, I use the `const` keyword to declare a new variable with the identifier `jedi` and give this variable a collection of `string` values

```js
const jedi = ["anakin", "luke", "obi wan", "mace windu", "yoda", "darth vader"];
```

Next, I use the `function` keyword to create a new function and give it the identifier `findAJedi`. This function will have a single parameter with an identifier of `jediList`

```js
function findAJedi(jediList) {
```

Using bracket notation `[]` I pull out the entry that is in index position `1`

```js
function findAJedi(jediList) {
  console.log(jediList[1]); // O(1)
}
```

Since we already know where the data we want is, and we do not have to loop to get there, this operation is `O(1)` or _Constant Time_

We call the `findAJedi` function with the variable `jediList` as the single argument and our `findAJedi` function prints `anakin`. He is the chosen one, right?

```js
findAJedi(jedi);
// anakin
```

### O(n) Linear Time

> Bound by the input, time increases linearly as input increases

- Involves iteration to find a value
  - `for` loops
  - `while` loops

Let me show you an example of an operation that evaluates to `O(n)` or _Linear Time_:

```js
const jedi = new Array(5).fill("luke");

function findLuke(jediList) {
  for (let i = 0; i < jediList.length; i++) {
    if (jediList[i] === "luke") {
      console.log("found luke");
    }
  }
}

findLuke(jedi);
```

First, we use the `const` keyword to create a new variable with the identifier `jedi` that is assigned the value of an `Array`. We use the `fill()` method to populate this `Array` with five `luke` values that are of type `string`

```js
const jedi = new Array(100).fill("luke");
```

Next, we use the `function` keyword to create a new function with an identifier `findLuke`. This function will have a single parameter with an identifier of `jediList`

```js
function findLuke(jediList) {
```

Inside of our `findLuke` function use the `for` keyword to create a `for` loop. We iterate through our `jediList` and use bracket notation `[]` to compare each entry to `luke`, when we find a match we `console.log` it

```js
for (let i = 0; i < jediList.length; i++) {
  if (jediList[i] === "luke") {
    console.log("found luke");
  }
}
```

Since we are iterating through the entire `Array`, our Big O would be `O(n)`. Right now our `jediList` only has five entries, but what if we had 10,000, or 1,000,000,000? These are good considerations to think about as you write code.

We call our `findLuke` function that takes a single argument `jedi` and since all of our entries are `luke`, we `console.log` `luke` five times

```js
findLuke(jedi);
// found luke
// found luke
// found luke
// found luke
// found luke
```

### O(n²) Quadratic Time

> Often thought of as "worst case", multiple nested iterations occur

- Involves two nested loops
- Each item in two collections need to be compared to each other

I am sure that you have been here before, I know I sure have. Nesting loops is never a good idea and there is a good reason for that. Speaking in terms of Big O, when you are iterating over a collection, and then iterating again inside of that first iteration that will produce a Big O of `O(n^2)`

Let me show you an example of a function that produces a Big O of `O(n^2)`:

```js
const jedi = ["mace windu", "yoda", "obi wan"];

function logJediDuos(jediList) {
  for (let i = 0; i < jediList.length; i++) {
    for (let j = 0; j < jediList.length; j++) {
      console.log(jediList[i], jediList[j]);
    }
  }
}

logJediDuos(jedi);
```

First, we use the `const` keyword to create a new variable with the identifier `jedi` that is assigned to an `Array` of three `string` values

```js
const jedi = ["mace windu", "yoda", "obi wan"];
```

Next, we use the `function` keyword to create a new function with an identifier of `logJediDuos`. This function has a single parameter `jediList`

```js
function logJediDuos(jediList) {
```

Inside of `logJediDuos` we use the `for` keyword to create our first `for` loop. In our `for statement` we declare that we want to iterate through the length of `jediList` until that length is greater than the value of `i`. We increase the value of `i` after each iteration

```js
for (let i = 0; i < jediList.length; i++) {
```

Inside of the previous `for` loop, we create another `for` loop. Inside of our `for` statement we make sure to give our index variable an identifier of `j` to ensure we do not mutate the state of our `i` variable.

Using bracket notation `[]` we use our index variables `i` and `j` to `console.log` each pair inside of our `jediList`

```js
for (let i = 0; i < jediList.length; i++) {
  for (let j = 0; j < jediList.length; j++) {
    console.log(jediList[i], jediList[j]);
  }
}
```

When we invoke our `logJediDuos` function we get this result:

```js
logJediDuos(jedi);
// mace windu mace windu
// i = 0, j = 0
// mace windu yoda
// i = 0, j = 1
// mace windu obi wan
// i = 0, j = 2
// yoda mace windu
// i = 1, j = 0
// yoda yoda
// i = 1, j = 1
// yoda obi wan
// i = 1, j = 2
// obi wan mace windu
// i = 2, j = 0
// obi wan yoda
// i = 2, j = 1
// obi wan obi wan
// i = 2, j = 2
```

I am only covering a handful of common Big O times in this post. If you want to learn more about advanced Big O times you can do so by following the links provided below:

### O(n!) Factorial Time

> Adds a nested loop for every loop

[Read more here](https://en.wikipedia.org/wiki/Time_complexity#Factorial_time)

### O(log N) Logarithmic

> Involves searching algorithms if sorted

[Read more here](https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time)

### O(2^N) Exponential

> Recursive algorithms that solve a problem of size N

[Read more here](https://en.wikipedia.org/wiki/Time_complexity#Exponential_time)

## Simplifying Big O

- Always assume worst-case scenario
- Remove constants
- Different terms for inputs
- Drop non-dominants

### Always assume worst-case scenario

It is a very common practice to iterate through a list of data in your program, and lists can vary greatly in size. When I say to _always assume worst-case scenario_ I mean that in a few different ways.

- If you query for data, assume it is the last item in the list

- Assume the list you're iterating through will get bigger

- Assume some machines will run your algorithm slower than on your machine

### Remove constants

When we are determining the Big O of an algorithm it helps to remove repeated measurements (constants). This allows us to get a more clear read on the speed of the algorithm by removing unneeded calculation.

Let me show you an example where we remove constants:

```js
function printJedi(jediList) {
  jediList.forEach((jedi) => {
    console.log(jedi)
  }
  // O(n)

  jediList.forEach((jedi) => {
    console.log(jedi)
  }
  // O(n)
}

printJedi(['anakin', 'obi wan', 'yoda'])

// O(n) + O(n) = O(2n)
```

First, we create a new `function` with the identifier `printJedi`, this function has a single parameter (`jediList`)

```js
function printJedi(jediList) {
```

Inside of our `printJedi` function we call the `forEach()` method on `jediList` two separate times

```js
jediList.forEach((jedi) => {
  console.log(jedi)
}
// O(n)

jediList.forEach((jedi) => {
  console.log(jedi)
}
// O(n)
```

Since we are iterating through the entire `jediList` array, each operation is `O(n)`. At the end of our function, we add up our Big O (`O(n) + O(n)`) which results in `O(2n)`. We can simplify this by _removing the constants_ which in this case is `2`. After this, we are left with Big O of `O(n)`.

### Different terms for inputs

In cases that you iterate through different pieces of data, the Big O calculation will reflect that. Since each collection of data will most likely be different sizes, the consideration of its time complexity comes into play.

Let me show you an example of calculating Big O while using multiple collections of data:

```js
function printJediAndSith(jediList, sithList) {
  jediList.forEach(jedi => console.log(jedi));

  sithList.forEach(sith => console.log(sith));
}

printJediAndSith(["anakin", "obi wan"], ["vader", "sidious"]);

// O(a + b)
```

Above, we create a new `function` with the identifier `printJediAndSith`, this function has two parameters: `jediList` and `sithList`

```js
function printJediAndSith(jediList, sithList) {
```

Inside of `printJediAndSith` we call the `forEach()` method on the `jediList` array and the `sithList` array

```js
jediList.forEach(jedi => console.log(jedi));

sithList.forEach(sith => console.log(sith));
```

Now, what do you think the Big O is of the `printJediAndSith` function? Since we iterate through a collection of data it should be `O(n)`, right? Not in this case.

Remember, these parameters will likely have different lengths. It is because of this that we determine the Big O of `printJediAndSith` to be `O(a + b)`.

### Drop non-dominants

Inside of functions a lot of different things can happen. This includes the range of time complexity as well. When determining the Big O of an algorithm, for the sake of simplifying, it is common practice to _drop non-dominants_. In short, this means to remove or _drop_ any smaller time complexity items from your Big O calculation.

Let me show you an example of _dropping non-dominants_:

```js
function printAndSumJediAttendance(jediList) {
  jediList.forEach(list => console.log(list));

  jediList.forEach(firstList => {
    jediList.forEach(secondList => {
      console.log(firstList + secondList);
    });
  });
}

printAndSumJediAttendance([1983, 66, 1138, 94, 1977]);
```

First, we create a new `function` with the identifier `printAndSumJediAttendance`, this function has a single parameter `jediList`

```js
function printAndSumJediAttendance(jediList) {
```

Inside of `printAndSumJediAttendance` we call the `forEach()` method on the `jediList` parameter. Because we are iterating through a collection of data this Big O evaluates to `O(n)`.

```js
jediList.forEach(list => console.log(list));
```

On the next line, we call the `forEach()` method on our `jediList` parameter. Inside of this `forEach` block, we call `forEach` on `jediList` again. Because we are iterating through nested loops, our Big O evaluates to `O(n^2)`

```js
jediList.forEach(firstList => {
  jediList.forEach(secondList => {
    console.log(firstList + secondList);
  });
});
```

Let me break this Big O calculation down a bit:

```js
function printAndSumJediAttendance(jediList) {
  // O(n)
  jediList.forEach(list => console.log(list));

  // O(n^2)
  jediList.forEach(firstList => {
    jediList.forEach(secondList => {
      console.log(firstList + secondList);
    });
  });
}
// O(n + n^2) -> simplified -> O(n^2)
```

As you can see, if we add up the Big O calculations from this function, we are left with a result of `O(n + n^2)`.

If we analyze this, we see that the part of our calculation with the largest Big O is `n^2` - because of this, we drop the `n`. We do this because `n^2` is more _dominant_ than `n`. Once we have refactored our calculation, we are left with this result: `O(n^2)`.

## Space Complexity

> Parallel to time complexity, space complexity is the measurement of memory (space) that an algorithm needs

### What causes Space Complexity?

- Variables
- Data structures
- Function calls
- Allocations

Let me show you an example of how we would calculate the space complexity:

```js
function buildALightsaber(pieces) {
  let totalPieces = 0; // O(1)
  totalPieces = 4; // O(1)

  for (let i = 0; i < pieces.length; i++) {
    // O(n)
    addCrystals(); // O(n)
    const hasTheForce = true; // O(n)
    totalPieces++; // O(n)
  }
  return totalPieces; // O(1)
}

// O(3 + 4n) -> simplified -> O(n)
```

First, we create a new `function` with the identifier `buildALightsaber` that has a single parameter `pieces`

```js
function buildALightsaber(pieces) {
```

Inside of `buildALightsaber`, we use the `let` keyword to create a new variable with the identifier `totalPieces` that is assigned to the value `0`. On the following line, we reassign the variable `totalPieces` to the value of `4`

Creating and assigning values to variables is `O(n)` (constant time); therefore, these two steps are both `O(1)`

```js
let totalPieces = 0; <-- // O(1)
totalPieces = 4; <-- // O(1)
```

Next, we create a `for` loop and iterate through `pieces`

Since we are going to be iterating through a collection of data, the Big O of this operation will evaluate to `O(n)`

```js
for (let i = 0; i < pieces.length; i++) { <-- // O(n)
```

Inside of our `for` loop, we call a function with an identifier `addCrystals()`. Next, we use the `const` keyword to create a variable with the identifier `hasTheForce` and assign it the value `true`. Last, we increment our `totalPieces` by one.

In terms of evaluating space complexity while calling functions, creating variables, and updating the values of variables inside of an iteration (`for` or `while` loops), you have to be mindful of the fact that these actions will occur for each iteration. It is because of this that _all_ actions mentioned will be `O(n)`

```js
addCrystals(); <-- // O(n)
const hasTheForce = true; <-- // O(n)
totalPieces++; <-- // O(n)
```

After we finish iterating through `pieces` we return the value of `totalPieces`

Since this is a single action, the Big O is evaluated to `O(1)` or _constant time_

```js
return totalPieces; <-- // O(1)
```

If we calculate the Big O of this function we originally get `(3 + 4n)`. After we apply our principles of simplifying Big O, we know that we can _remove constants_ which will make our final result `O(n)`

## In Summary

I hope after reading this you have a solidified idea of how time and space complexity work, what their importance is in the functions/algorithms we write, and how we can calculate these complexities using Big O notation.

Next week I will begin to take a deep dive into arguably the most popular data structure JavaScript developers use, the Array. See you then!
