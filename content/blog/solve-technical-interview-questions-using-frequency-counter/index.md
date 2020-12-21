---
title: Problem Solving Patterns for Technical Interviews - the Frequency Counter Pattern Explained
date: "2020-12-21T22:40:32.169Z"
description: "Interview Insights Pt 3 - Problem Solving Patterns - Frequency Counter"
---

In my last article, I shared my thoughts on [prepare for a software developer interview](https://www.martincartledge.io/prepare-for-software-developer-interview/).

In this article, I am going to switch gears a bit and talk about common patterns you can use to solve problems in technical interviews. We'll discuss the _frequency counter_ pattern in depth to help you tackle it effectively.

### What is the "Frequency Counter" pattern?

The Frequency Counter pattern uses an object or set to collect values and the frequency of those values.

This pattern is often used with an `array` or a `string`, and allows you to avoid nested loops (quadratic time complexity (`O(n^2)`)).

### When should I use the Frequency Counter pattern?

The Frequency Counter pattern is most helpful when you have multiple pieces of data that you want to compare with one another. Let me walk you through an example to see the Frequency Counter in action.

#### The "sameSquared" exercise

- Write a function called `sameSquared` which accepts two arrays
- The function should return `true` if _every_ value in the first array has it's corresponding value squared in the second array
- The frequency of the values must be the same

#### What is the optimal outcome?

After our function is written, we should expect our `sameSquared` function to return these values.

```js
sameSquared([1, 2, 3], [4, 1, 9]); // true
```

```js
sameSquared([1, 2, 3], [1, 9]); // false
```

```js
sameSquared([1, 2, 1], [4, 4, 1]); // false
```

```js
sameSquared([2, 3, 6, 8, 8], [64, 36, 4, 9, 64]); // true
```

#### Getting started

First, using the `function` keyword, we create a function with the identifier `sameSquared`:

```js
function sameSquared() {
```

Our function `sameSquared` needs two parameters, a first array and a second array. In this example, we are passing these values `[1, 2, 3]` and `[4, 1, 9]`.

```js
function sameSquared(firstArr, secondArr) {
```

#### Check edge cases

Inside of our function block, we want to address a few edge cases. First, we need to check that both parameters have truthy values i.e. _not_ `null`, `undefined`, and so on.

We can check for a falsy value by using the `!` operator. If `firstArr` or `secondArr` is falsy, we return `false`.

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
```

The next edge case we want to account for is to ensure that the length of both arrays are the same. If they are different, we know that they can _not_ contain an equal amount of shared values.

By checking the `length` property on both parameters, we can determine if they are the same. If they are not, we return `false`

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
  if (firstArr.length !== secondArr.length) return false;
```

#### Build a "dictionary" to avoid nested loops

We need to keep track of all values in at least one of the arrays. To do this, and to avoid a nested loop, we can store these values in a hash table (object). I'll call mine `lookup`.

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
  if (firstArr.length !== secondArr.length) return false;

  const lookup = {};
```

Using a `for of` loop, we iterate through the `firstArr`. Inside of the `for of` block, we assign the key to the result of `value * value`.

The value in this key/value pair will be a _frequency counter_ that reflects how many times a specific value is "seen" in the `firstArr`.

First, we check if `lookup` contains an entry for `value * value`, if it does, we add `1` to it. If it does not, we assign the value to `0` and then add `1`.

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
  if (firstArr.length !== secondArr.length) return false;

  const lookup = {};

  for (value of firstArr) {
    lookup[value * value] = (lookup[value * value] || 0) + 1;
  }
```

Once the `firstArr` is finished looping, the `lookup` should contain these values:

```
{
  1: 1,
  4: 1,
  9: 1
}
```

#### Compare array values

Now that we have iterated through all of the values in the `firstArr` and stored them as their respective _squared_ value, we want to compare those values to the values in the `secondArr`.

We start by creating another `for of` loop. On the first line inside of our new `for of` block, we write a conditional statement to check if the current value from our `secondArr` is _not_ inside of our `lookup`. If it is not, we stop looping and return `false`.

If the value from the `secondArr` is in our `lookup`, we want to decrement the value of that entry. We can do so by using the `-=` assignment operator.

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
  if (firstArr.length !== secondArr.length) return false;

  const lookup = {};
  for (value of firstArr) {
    lookup[value * value] = (lookup[value * value] || 0) + 1;
  }
  for (secondValue of secondArr) {
    if (!lookup[secondValue]) return false;
      lookup[secondValue] -= 1;
    }
```

After we are finished looping through the `secondArr`, our `lookup` should have these values:

```
{
  1: 0,
  4: 0,
  9: 0
}
```

#### Wrapping up our "sameSquared" function

If we finish iterating through the `secondArr` without returning `false`, that means that our `firstArr` contains all values that are in a squared state in the `secondArr`; therefore, we return `true` outside of `for of` loop.

```js
function sameSquared(firstArr, secondArr) {
  if (!firstArr || !secondArr) return false;
  if (firstArr.length !== secondArr.length) return false;

  const lookup = {};
  for (value of firstArr) {
    lookup[value * value] = (lookup[value * value] || 0) + 1;
  }
  for (secondValue of secondArr) {
    if (!lookup[secondValue]) return false;
    lookup[secondValue] -= 1;
  }
  return true;
}
```

Let me show you another example, this one is used very commonly in coding assessments (so you might've seen this problem before).

#### The "isAnagram" exercise

- Write a function called `isAnagram` which accepts two strings
- The function should return `true` if the two strings parameters are [anagrams](https://en.wikipedia.org/wiki/Anagram) of each other

#### What is the optimal outcome?

After our function is written, we should expect our `isAnagram` function to return these values.

```js
isAnagram("silent", "listen"); // true
```

```js
isAnagram("martin", "nitram"); // true
```

```js
isAnagram("cat", "tag"); // false
```

```js
isAnagram("rat", "tar"); // true
```

#### Getting started

First, using the `function` keyword, we create a function with the identifier `isAnagram`:

```js
function isAnagram() {
```

Our function `isAnagram` needs two parameters, a first `string` and a second `string`. In this example, we are passing these values `silent` and `listen`.

```js
function isAnagram(firstStr, secondStr) {
```

#### Check edge cases

On the first few lines of our function block, we want to address a few edge cases, just like in the first example.

Similar to `sameSquared`, we need to check that both parameters have truthy values i.e. _not_ `null`, `undefined`, etc. We can check for a falsy value by using the `!` operator. If `firstStr` or `secondStr` is falsy, we return `false`.

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
```

The next edge case we want to account for is to ensure that the length of both arrays are the same. If they are different, we know that they can _not_ contain an equal amount of shared values.

By checking the `length` property on both parameters, we can determine if they are the same. If they are not, we return `false`

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
  if (firstStr.length !== secondStr.length) return false;
```

#### Build a "dictionary" to avoid nested loops

Remember, we are using the frequency counter pattern and we need to keep track of all values in at least one of the arrays. Now we know that the best way to handle this is to store these values in a hash table (object). To keep things consistent, I'll call mine `lookup` again.

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
  if (firstStr.length !== secondStr.length) return false;

  const lookup = {};
```

Using a `for of` loop, we iterate through the `firstStr`. Inside of the `for of` block, we assign the key to the result of the expression `value * value`.

The value in this key/value pair will be a _frequency counter_ that reflects how many times a specific value is "seen" in the `firstStr`.

Using a ternary operator, we check if `lookup` contains an entry for `value * value`, if it does, we use the `+=` assignment operator to increment the value by `1`. If it does not, we simply assign the value to `1`.

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
  if (firstStr.length !== secondStr.length) return false;

  const lookup = {};

  for (first of firstStr) {
    lookup[first] ? (lookup[first] += 1) : (lookup[first] = 1);
  }
```

Once the `firstStr` is finished looping, the `lookup` should contain these values:

```
{
  s: 1,
  i: 1,
  l: 1,
  e: 1,
  n: 1,
  t: 1
}
```

#### Compare array values

Now that we have iterated through all of the values in the `firstStr` and stored their value, we want to compare those values to the values in the `secondStr`.

We start by creating another `for of` loop. On the first line inside of our new `for of` block, we write a conditional statement to check if the current value from our `secondStr` is not inside of our `lookup`. If it is not, we want to stop iteration and return `false`.

Otherwise, if the value from the `secondStr` _is_ in our `lookup`, we want to decrement the value of that entry. We can do so by using the `-=` assignment operator.

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
  if (firstStr.length !== secondStr.length) return false;

  const lookup = {};

  for (first of firstStr) {
    lookup[first] ? (lookup[first] += 1) : (lookup[first] = 1);
  }

  for (second of secondStr) {
    if (!lookup[second]) return false;
    lookup[second] -= 1;
  }
```

After we are finished looping through the `secondStr`, our `lookup` should have these values:

```
{
  s: 0,
  i: 0,
  l: 0,
  e: 0,
  n: 0,
  t: 0
}
```

#### Wrapping up our "isAnagram" function

If we finish iterating through the `secondStr` without returning `false`, that means that our `firstStr` contains all values that are in the `secondStr`. Therefore, we return `true` outside of `for of` loop.

```js
function isAnagram(firstStr, secondStr) {
  if (!firstStr || !secondStr) return false;
  if (firstStr.length !== secondStr.length) return false;

  const lookup = {};

  for (first of firstStr) {
    lookup[first] ? (lookup[first] += 1) : (lookup[first] = 1);
  }

  for (second of secondStr) {
    if (!lookup[second]) return false;
    lookup[second] -= 1;
  }
  return true;
}
```

## In Summary

I hope this in-depth overview of the Frequency Counter pattern was helpful. Now that you know how the pattern works, I am confident that you will be able to impress your interviewer by showcasing your skills at an even higher level.

In my next article, I will be discussing another common problem-solving pattern called the Sliding Window. Thanks for reading, and happy interviewing!
