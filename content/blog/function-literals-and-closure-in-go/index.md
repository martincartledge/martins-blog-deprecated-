---
title: Function Literals and Closure in Go
date: "2020-05-11T22:40:32.169Z"
description: "Learning Go - Week 7 - Function Literals and Closure"
featured: './mountain.jpg'
---

This is the seventh entry of my weekly series _Learning Go_. Last week I discussed _Function Declarations, Arguments, Parameters, and Anonymous Functions_. This week I will be talking about _Function Literals and Closure_.

## Function Literals (Function Expressions)

> Function Literals can be assigned to a variable or called (invoked) directly. They may refer to the variables defined in a surrounding function, making them a closure (we will talk more about this later in the post)

So, what is the difference between a _Function Declaration_ and a _Function Literal_?

A _Function Declaration_ _binds_ an _identifier_ (the function name) to a function. You can call this function by using its _identifier_.

A _Function Literal_ is a _closure_, meaning they can reference variables that have been defined in a surrounding function. These variables can be shared between the _function literal_ and the surrounding function. These variables persist as long as they are accessible.

Let's start with a basic example and work our way up in complexity.

```go
package main

import (
	"fmt"
)

func main() {
	f := func() {
		fmt.Println("I am a function literal!")
	}

	f()
	// I am a function literal!
}
```

- inside of `func` `main` we declare the variable `f` and assign to an _anonymous function_
- when this function is invoked, it uses the `fmt` package to print the `string` `I am a function literal!`
- we invoke this _function literal_ the same way we invoke _function declarations_: the _identifier_ followed by _arguments_ wrapped in parentheses `()`
- this _function literal_ expects no _parameters_; therefore, we do not pass any _arguments_
- once `f` is invoked, `I am a function literal` is printed and the program exits

Let's see an example when a _function literal_ has a _parameter_:

```go
package main

import (
	"fmt"
)

func main() {
	f := func(x int) {
		fmt.Println("my birth year is ", x)
	}

	f(1990)
	// my birth year is 1990
}
```

- inside of `func` `main` we declare the variable `f` and assign it to an _anonymous function_ that takes one parameter, `x`, of type `int`
- using the `fmt` package, we print the `string` `my birth year is` followed by the value of `x`
- notice when `f` is invoked we pass a single _argument_ `1990`
- `f` prints `my birth year is 1990` and the programs exits

Next, let's see how we can return a `function` from a _Function Literal_:

```go
package main

import (
	"fmt"
)

func main() {
	f := bar()
	fmt.Println(f())
	// 2020
}

func bar() func() int {
	return func() int {
		return 2020
	}
}
```

`bar`:

- below `func` `main`, using the `func` keyword, we create a _function declaration_ with an _identifier_ of `bar` with two _return types_: `func()` and `int`
- these _return types_ tell us that `bar` is expected to return a _function_ and an `int` inside of that _function_
- inside the _function body_ of `bar` we `return` an _anonymous function_ that has a _return type_ of `int`
- inside of this _anonymous function_, we return the _value_ `2020` of _type_ `int`

`main`:

- inside of `func` `main` we declare the variable `f` and assign it to _return value_ of the _function declaration_ `bar`
- note: `f` is assigned to the _return value_ because we are invoking `bar`; therefore, what `bar` _returns_ will be the value that `f` holds in memory. In this case, that _return value_ is a _function_
- `f` is invoked on the next line inside of the `Println` function from the `fmt` package
- `bar`'s _return value_ is a function that returns the _value_ `2020` of _type_ `int`: therefore, `f()` will print `2020`

As you can see from a few of these examples - _function literals_ can be very powerful and can be used very dynamically in your code. Remember a few things when you are thinking of using a _function literal_ instead of a _function declaration_:

- they are _anonymous functions_
- variables are shared between a _function literal_ and the surrounding function (closure)
- variables "survive" as long as they are still accessible

## Closure

> the way that an anonymous function references variables declared outside of the anonymous function itself

A bit of a brain bender, huh?

The concept of _closure_ can seem very abstract, which makes understanding how they work and the problems they solve difficult as well.

I am confident that seeing _closure_ in action is the best way to learn how they work:

```go
package main

import (
	"fmt"
)

func main() {
	a := incrementor()
	fmt.Println(a())
	// 1
	fmt.Println(a())
	// 2
	b := incrementor()
	fmt.Println(b())
	// 1
}

func incrementor() func() int {
	var x int
	return func() int {
		x++
		return x
	}
}
```

`incrementor`:

- first we create `incrementor`, this should look familiar to `bar` in the last section
- `incrementor` is a _function declaration_ that returns a _function_ and an `int` inside that _function_
- using the `var` keyword we declare the variable `x` of type `int`
- `x` is not assigned a value; therefore, it is given a `zero value` (`0`)
- next, we return an _anonymous function_ that is expected to `return` a _value_ of _type_ `int`
- notice, using the `++` operator, we are incrementing the value of `x` by `1` - how is this possible? the answer is _closure_
- after we increment `x`, we return `x`

`main`:

- inside of `func` `main` we create the variable `a` and assign it to the _return value_ of `incrementor()`
- on the next line, `a` is invoked inside of the `Println` function from the `fmt` package
- because the _return value_ of `a` is the _anonymous function_ inside `incrementor()`, we increment `x` by `1` and return the value `1`; therefore, `1` is printed
- we repeat this process by invoking `a` inside of the `Println` function again
- since we have already invoked `a` the value of `x` is `1`; therefore, when we increment `x` the value returned and printed will be `2`

Notice when we assign `incrementor()` to the variable `b` it does not return `3`, why is that?

Although `a` and `b` were assigned the same _return value_ of `incrementor`, `b` has only been invoked once; therefore, it holds it's _own unique value_ of `1`.

This is the power of _closure_, data isolation. Now, you can easily use common actions across multiple variables, and those variables can have their own, unique values.

## In Summary

I hope you have enjoyed learning about _Function Literals and Closure_. With the power of _closure_, you are equipped with another powerful feature of the Go programming language that can make your code more modular, readable, and scalable. Next, I will discuss _Recursion_ and how to apply those principles to your functions. Can't wait, see you then!
