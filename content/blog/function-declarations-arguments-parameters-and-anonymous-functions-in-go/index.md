---
title: Function Declarations, Arguments, Parameters, and Anonymous Functions in Go
date: "2020-05-03T22:40:32.169Z"
description: "Learning Go - Week 6"
---

This is the sixth entry of my weekly series _Learning Go_. Last week I covered the `Struct` and `Interface` types. This week I will be talking about _Function Declarations, Arguments, Parameters, and Anonymous Functions_.

## Overview

The role that functions play in Go, or in any programming language, is the same. They exist to perform computation, data fetching, aggregation, and many other utilities. A few notes on functions before we jump into a few examples:

- keep functions _small_ and _modular_
- _parameters_ are the _values_ the function expects
- _arguments_ are the _values_ that are passed when a function is _executed_
- everything in Go is passed by _value_

## Function Declaration

There are several ways to create a function. The first one I will cover, is probably the most _traditional_; however, it is not exclusive to how we declare functions.

Before we jump into an example, let me break down the four pieces of a _Function Declaration_:

- _receiver_ - specifies the _type_ of parameters that the function receives
- _identifier_ - the name of the function
- _parameters_ - the values that the function expects when it is invoked (_executed_)
- _return types_ - the _type_ of _value_ that the function will return

Quick note: a _receiver_ is _not required_. These are used in _receiver functions_ which we will cover later. Another thing to keep in mind, _parameters and return types are optional_.

If your function does not expect to get any values when it is called, you can leave the parameters empty.

Likewise, if your function does not return a value, you do not need a return type.

Let's look at a basic example of a function declaration, first, without a receiver type, parameters, or a return type.

```go
package main

import (
	"fmt"
)

func main() {
	sayHello()
	// hello!
}

func sayHello() {
	fmt.Println("hello!")
}
```

below the `func` `main` we _declare_ a new function using the `func` keyword

next, we give this function the _identifier_ `sayHello`

in between the parentheses `()` is where your parameters go. We do not have any in this example; however, you still need to have them

we _execute_ this function inside of `main` simply by writing the function identifier with a set of parentheses `()`

## Arguments and Parameters

Why do we need parentheses immediately following our identifier? This is how you would _pass_ values into your function. These values are called _arguments_. If we do not have any values to pass, we still have to write a set of parentheses, this lets the compiler know that we want to _execute_ this function and that it has no arguments.

Let's create a function that uses _arguments_ and _parameters_.

```go
package main

import (
	"fmt"
)

func main() {
	myName("martin")
	// hello martin
}

func myName(s string) {
	fmt.Println("hello", s)
}
```

much like the first example, we create a new function using the `func` keyword with the identifier `myName`

immediately following our function identifier `myName`, you will see we put `s string` between parentheses

the `s` is the _value_ we will receive from this function and `string` tells us that `s` will be of _type_ `string`

inside of `main`we write our function identifier, `myName`

immediately following we put the _value_ `"martin"` of _type_ `string` inside of the parentheses, this is the function's _argument_

`myName` is then _executed_ and it prints `"hello martin"`

## Return Values

We have seen a few very basic ideas of the role that functions can play in your programs; however, I am confident that you will not use functions just to print values. Let's see an example of a function that returns a _value_:

```go
package main

import (
	"fmt"
)

func main() {
	n := sayHello("martin")
	fmt.Println(n)
	// hello from martin
}

func sayHello(s string) string {
	return fmt.Sprint("hello from ", s)
}
```

From a code organization standpoint, there will come a time that you need to assign a _variable_ to the _returned value_ of a function in order to do something else useful with it.

below `func` `main`, we declare a function using the `func` keyword

give an _identifier_ of `sayHello`

write a single _parameter_ `s` of _type_ `string` between parentheses

then write a _return type_ of `string`

using the `return` keyword, we `return` the value of `s` from this _function_

inside of `func` `main` we declare a new variable `n` that is equal to the _returned value_ of the `sayHello` function

after the function executes, we print the value of `n`

## Multiple Return Values

In Go, it is possible to have more than one _value_ returned from a function. Let's see how that works in an example below:

```go
package main

import (
	"fmt"
)

func main() {
	x, y := isAJedi("obi wan", "kenobi")
	fmt.Println(x, y)
	// obi wan kenobi true
}

func isAJedi(s1, s2 string) (string, bool) {
	a := fmt.Sprint(s1, " ", s2)
	b := true
	return a, b
}
```

we declare a new function using the `func` keyword

give an _identifier_ of `isAJedi`

between the first set of parentheses, we write two parameters: `s1` and `s2`, both of type `string`

in the next set of parentheses we have our _return types_: `string` and `bool`

on the first line, we declare a variable `a` and assign it to the _value_ of a `string` that includes the values of `s1` and `s2`

next, we declare a variable `b` and assign it to the value `true` of _type_ `bool`

after the `return` keyword we write the variables `a` and `b`

our return types are `string` and `bool`, order matters; therefore, we can not return a `bool` value and then a `string` value

inside of `func` `main` we declare `x` and `y` as variables that will be assigned the _value_ of each _returned value_ from `isAJedi`

when we print we see that the _value_ of `x` is `obi wan kenobi` and the _value_ of `y` is `true`

## Anonymous Functions

As we have already seen, there are many ways you can create and use a function. An _anonymous function_ is used for when you don't need a function with an identifier:

```go
package main

import (
	"fmt"
)

func main() {
	func() {
		fmt.Println("I'm anonymous!")
	}()
	// I'm anonymous!
}
```

inside `func` `main` we use the `func` keyword with

since we do not have any _parameters_, we write empty parentheses `()`

to let the compiler know to look inside this function, the _function body_ we write an open bracket `{`

inside the _function body_, using the `fmt` package, we print the `string` `I'm anonymous!`

to signify our _function body_ is closed we write a closing bracket `}` on the next line

following the closing bracket `}` you will notice we have a set of empty parentheses `()`, as mentioned previously, this is how we tell the compiler to _execute_ this function

since we have no _arguments_ these parentheses are empty `()`

## In Summary

I hope you have enjoyed learning about _Function Declarations, Arguments, Parameters, and Anonymous Functions_. There is so much more to learn about functions in Go, and I am excited to share more with you in the coming weeks. Next week we will dive into _Function Expressions and Closure_. Can't wait, see you then!
