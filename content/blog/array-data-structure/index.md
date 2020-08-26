---
title: The Array Data Structure
date: "2020-08-26T22:40:32.169Z"
description: "Data Structures and Algorithms using JavaScript - Arrays"
---

This is the second post in my series _Data Structures and Algorithms using JavaScript_. Last week, I discussed [_Time Complexity, Space Complexity, and Big O Notation_](https://www.martincartledge.io/time-complexity-Space-complexity-and-big-o-notation/). This week I am going to talk about a very popular data structure that most programmers use on a daily basis, the _Array_. In this post, I will cover the Big O of common `Array` actions (`push`, `pop`, etc) and we will also walk through the process of creating our very own _Array_ data structure! Let's get started.

## What is an Array?

> A collection of multiple values that can be stored using a single variable

- The length can not be fixed
- The types of values can not be fixed
- Can not use strings as an index to an element, must use an integer

## Static vs Dynamic Arrays

### Static

> Fixed in size

### Dynamic

> Copy and rebuild `Array` in new location with more memory, expands as you add elements

## Common Array actions

### Push O(1)

> Appends a new value at the end of an `Array` and returns the new length

- Relies on the `length` property to know where to insert new values
- If `length` does not exist or can not be converted to a number, `0` is used

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];

jediCouncil.push("anakin");

console.log(jediCouncil);

// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi', 'anakin'
```

First, we use the `const` keyword to create a new variable with the identifier `jediCouncil`. The value assigned to `jediCouncil` is an `Array` of values that are of type `string`.

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];
```

Next, we call the `push` method on the `jediCouncil` `Array` with a single argument `anakin`.

```js
jediCouncil.push("anakin");
```

When we log our `jediCouncil` on the next line, we see that the value `anakin` is now the last value in our `jediCouncil` `Array`.

```js
console.log(jediCouncil);
// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi', 'anakin'
```

Since there is only one action taken and we don't have to iterate through our `Array` for this operation the Big O of the `push` method is `O(1)`.

### Pop O(1)

> Removes the last value in `Array` and returns that value

- If you call on an empty `Array`, `pop` returns `undefined`

For this example, we want `anakin` out of the `jediCouncil`, we can use the `pop` method for that:

```js
const jediCouncil = [
  "yoda",
  "mace windu",
  "plo koon",
  "ki-adi-mundi",
  "anakin",
];

jediCouncil.pop();

console.log(jediCouncil);

// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi'
```

First, we use the `const` keyword to create a new variable with the identifier `jediCouncil`. The value assigned to `jediCouncil` is an `Array` of values that are of type `string`.

```js
const jediCouncil = [
  "yoda",
  "mace windu",
  "plo koon",
  "ki-adi-mundi",
  "anakin",
];
```

Next, we call the `pop` method on the `jediCouncil` `Array`, we do not need an argument when calling this method.

```js
jediCouncil.pop();
```

Now, when we log our `jediCouncil` on the next line, we should see that the value `anakin` is no longer in our `jediCouncil` `Array`

```js
console.log(jediCouncil);
// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi'
```

Later, `anakin` 👋🏻

Using `pop` makes removing the last item from your `Array` very quick and painless. Since this is the only operation that is performed, the Big O of the `pop` method is `O(1)`.

### Shift O(n)

> Removes the first value in `Array` and returns that value

- Shifts the values and their indexes consecutively

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];

jediCouncil.shift();

console.log(jediCouncil);

// 'mace windu', 'plo koon', 'ki-adi-mundi'
```

First, we use the `const` keyword to declare a new variable with the identifier `jediCouncil`. The value assigned to `jediCouncil` is an `Array` of values that are of type `string`.

> Note: I am noting the index position of each value, this will help illustrate what `shift` does under the hood later

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];
//index: 0 //index: 1    //index: 2  //index: 3
```

Next, I call the `shift` method on our `jediCouncil` variable.

```js
jediCouncil.shift();
```

On the next line, I use `console.log` to log the new value of `jediCouncil`. Notice how the index positions have changed. Why is that?

When `shift` is called on our `jediCouncil` `Array`, the value `yoda` is removed. Since this value was in index position `0`, we have to iterate through the `Array` and update each value's index position. This is why the `shift` method has a Big O of `O(n)`.

```js
console.log(jediCouncil);
// 'mace windu', 'plo koon', 'ki-adi-mundi'
// index: 0       index: 1     index: 2
```

Now we can see that `yoda` has been removed and all of the other values in `jediCouncil` have been _shifted_ over to `1` less index position.

### Splice O(n)

> Remove, replace, or add new values to an `Array`

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];

jediCouncil.splice(4, 0, "obi wan");

console.log(jediCouncil);

// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi', 'obi wan'
```

First, we use the `const` keyword to create a new variable with the identifier `jediCouncil`. The value assigned to `jediCouncil` is an `Array` of values that are of type `string`.

```js
const jediCouncil = ["yoda", "mace windu", "plo koon", "ki-adi-mundi"];
```

Next, we call the `splice` method on the `jediCouncil` `Array`.

> Note: the `splice` method takes 3 arguments:

> `start` - this is the index you would like to start changing the `Array`
>
> `deleteCount` - this is the number of values you would like to remove from the `Array` (starting from the `start` argument)
>
> `items` - this is the values you would like to add to the `Array`, starting from the `start` argument
>
> If the `items` argument is empty, the `spice` method will only remove items

We pass 3 arguments to `splice`:

- `5`: we want to start changing the `jediCouncil` `Array` at index position `5`
- `0`: we do not want to delete anything from `jediCouncil`; therefore, this value is `0`
- `"obi wan"`: this is the value we would like to add to index position `5`

```js
jediCouncil.splice(5, 0, "obi wan");
```

When we log our `jediCouncil` on the next line, we can see that `obi wan` has been added to `jediCouncil` in index position `5`; which, in this case, is the last position.

```js
console.log(jediCouncil);
// 'yoda', 'mace windu', 'plo koon', 'ki-adi-mundi', 'obi wan'
```

Welcome aboard, `obi wan` 👍🏻, I think you will fit in nicely

Although we did not `shift` any values or their index positions, we always take the worst case when determining Big O; therefore, the Big O of `splice` is `O(n)`

## Let's Create an Array Data Structure

This section assumes you have some knowledge of how classes work for JavaScript. If classes are new for you, fear not! I will be writing a post on those in the near future. In the meantime, you can read more about them [right here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

We know how the core pieces of an `Array` work, so let's build our own `Array` data structure!

```js
class MyOwnArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  get(index) {
    return this.data[index];
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
}

const myOwnArray = new MyOwnArray();

myOwnArray.push("phantom menace");

myOwnArray.get(0);

myOwnArray.pop();
```

We start by using the `class` keyword to create a new JavaScript class. We give our new `class` the identifier `MyOwnArray`.

```js
class MyOwnArray {
```

### Constructor

Inside of our `MyOwnArray` `class` we write our `constructor` function. The `constructor` is a method that is responsible for creating an object for that `class`.

We use the `this` keyword to create and bind two fields to the scope of our `MyOwnArray` class:

- `length`: a `number` that is initialized with the value of `0`
- `data`: an `object` that is initialized with the value of an empty object `{}`

```js
constructor() {
  this.length = 0;
  this.data = {};
}
```

### Push

We create a method with the identifier `push` that has a single parameter, `item`. Keep in mind, this `item` parameter can be any value that we want to append to our `Array`. In our example, we are calling the `push` method with the value `'phantom menace'` as the only argument (`myOwnArray.push('phantom menace')`).

```js
push(item) { // item = 'phantom menace'
```

Inside of our `push` method, we assign a key-value pair for our `data` field.

To assign the key value, we use the `length` field value inside of bracket notation `[]`.

Next, we assign our value to `item`

```js
this.data[this.length] = item;
// { 0: 'phantom menace' }
```

We increment the value of our `length` field by `1` and `return` the value of `length`

```js
this.length++;
// length = 1
return this.length;
```

> Note: Did you notice that I incremented the `length` field in this `MyOwnArray` class? This explains why the last index position and your length always have a difference of `1`

Let me show you an example:

```js
const starWarsMovies = [
  "phantom menace",
  "attack of the clones",
  "revenge of the sith",
  "a new hope",
  "empire strikes back",
  "return of the jedi",
];

console.log(starWarsMovies.length);
// 6

console.log(starWarsMovies[6]);
// undefined

console.log(starWarsMovies[5]);
// return of the jedi
```

As you can see, we the `starWarsMovies` `Array` with 6 items. When we `console.log` the length it returns `6` as we would expect. What happens when we try to retrieve the value at the 6th index position? We get `undefined`. This is because we always increment our `length` after we add an item to an `Array`.

### Get

Next, we create a method with an identifier of `get`. This method will be responsible for returning a value from our `data` field.

Our `get` method has a single parameter, `index`. Inside of our `get` method, we use the `index` parameter and bracket notation `[]` to `return` that value from the `data` field.

In our example, we want to retrieve the value that is index position `0` (`myOwnArray.get(0)`)

```js
get(index) { // index = 0
  return this.data[index];
  // 'phantom menace'
}
```

### Pop

Next, we create a method with the identifier `pop`. As you might suspect, this method will be responsible for removing the _last item_ in an `Array`. This method takes no arguments.

```js
pop() {
```

Inside of our `pop` method we use the `const` keyword to create a new variable with the identifier `lastItem`. You can probably guess what we will use this for. We use bracket notation `[]` and the value of our `length` field (decremented by one) to pull off the value of our last item in the `data` field.

```js
const lastItem = this.data[this.length - 1];
```

Since `data` is an object, we can use the `delete` operator, followed by the property of the last item in our `data` object to remove it.

We want to make sure we decrement the value of our `length` field by `1`, and then we return the value of `lastItem`.

```js
delete this.data[this.length - 1];
this.length--;
return lastItem;
```

## In Summary

I hope you found diving into how `Array`s work in regards to their methods, Big O, and under the hood to be as illuminating as I did. Now we have a much stronger grasp on how we can harness the power of these important data structures. Next week I will be talking about Hash Tables. Can't wait, see you then!
