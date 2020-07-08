---
title: How to write a Recursive Function in Go
date: "2020-07-08T22:40:32.169Z"
description: "Learning Go - Week 8 - Recursion"
---

I don't know about you, but when I started programming the term _Recursion_ made me quiver a bit. I think this is a natural response honestly. New things can be scary! I also did not understand the importance or the potential impact that using Recursion in your code could have. If you don't have a solid grasp on Recursion, you are in luck! I am going to discuss how you can harness the power of Recursion and use it in your Go programs.

## So, What is Recursion?

> the repeated application of a procedure or definition

A common use of Recursion in programming is calling a function, inside of the same function. Let me show you an example:

```go
package main
import (
	"fmt"
)

func main() {
	n := factorial(4)
	fmt.Println(n)
}

func factorial(n int) int {
	if n == 0 {
		return 1
	}
	return n * factorial(n-1)
}
// 4 * 3 * 2 * 1
```

`main`:

```go
func main() {
	n := factorial(4)
	fmt.Println(n)
}
```

- Inside of `func` `main` we declare the variable `n` and assign `n` to the return value of the `factorial` function
- The `factorial` function has a single argument, `4` of type `int`
- On the next line of execution, using the `fmt` package, we print out the value of `n`

> Quick note: in every Recursive function, there needs to be a "base case".
> The base case is most commonly an if statement that when evaluated to "true"
> will stop calling the function within the function (stop recursion)
> and will allow the program to return out of the function

`factorial`:

```go
func factorial(n int) int {
	if n == 0 {
		return 1
	}
	return n * factorial(n-1)
}
```

- Below the `main` function, we declare a function with an identifier of `factorial`
- The function `factorial` has a single parameter, `n` of type `int`
- The function `factorial` returns a value of type `int`
- In this example, our _base case_ in `factorial` is an `if` statement that checks if the value of `n` is `0`
- Because our argument `n` is `4`, this evaluates to `false` and we continue to the next line of execution
- Our next line is a `return` statement that has the expression `n * factorial(n-1)` what does this mean?

`n * factorial(n-1)`:

```go
func factorial(n int) int {
  // n = 4
	if n == 0 {
		return 1
  }
	return n * factorial(n-1)
}
```

- in the first iteration, the value of `n` is `4` so we can write this expression like this: `4 * factorial(4-1)`
- we can do the subtraction for the argument for `factorial`, when we do the expression looks like this: `4 * factorial(3)`
- now, we know that we have the value of `4`; however, we invoke `factorial` again with the argument `3`
- because we invoke `factorial`, we jump to the first line of execution in the function

```go
func factorial(n int) int {
  // n = 3
	if n == 0 {
		return 1
  }
	return n * factorial(n-1)
}
```

- we know that the value of `n` is now `3`; therefore, our _base case_ still evaluates to `false`
- now that the value of `n` is `3`, our `return` statement now looks like this: `4 * 3 * factorial(3-1)`
- simplified: `4 * 3 * factorial(2)`
- we invoke `factorial` again with the argument being the value `2` of type `int`

```go
func factorial(n int) int {
  // n = 2
	if n == 0 {
		return 1
  }
	return n * factorial(n-1)
}
```

- our _base case_ still evaluates to `false` because `2` is not equal to `0`
- our `return` statement now looks something like this: `4 * 3 * 2 * factorial(2-1)`
- simplified: `4 * 3 * 2 * factorial(1)`
- we invoke `factorial` again with the argument being the value `1` of type `int`

```go
func factorial(n int) int {
  // n = 1
	if n == 0 {
		return 1
  }
	return n * factorial(n-1)
}
```

- our _base case_ still evaluates to `false` because `1` is not equal to `0`
- our `return` statement now looks something like this: `4 * 3 * 2 * 1 * factorial(1-1)`
- simplified: `4 * 3 * 2 * 1 * factorial(0)`

```go
func factorial(n int) int {
  // n = 0
	if n == 0 {
    // true, return 1
		return 1
  }
  return n * factorial(n-1)
}
```

- this time, our _base case_ still evaluates to `true` because `0` _is equal_ to `0`
- inside of our _base case_ we return the value `1` of type `int`
- now that our Recursion is done, our final `return` statement will look like this: `return 4 * 3 * 2 * 1` which evaluates to the value `24` of type `int`

`main`:

```go
func main() {
  n := factorial(4)
  fmt.Println(n)
  // 24
}
```

- now that all execution is complete, the value of `n` is evaluated to `24`, this value is printed out on the next line

## In Summary

I hope you have enjoyed learning about _Recursion_. Although, this example is not overly complex, I hope that you can walk away after reading this post with a better understanding of the principles of _Recursion_ and apply them in your workflow. I will say, there should be a level of caution when writing recursive functions. If your _base case_ is not sound, you could find yourself in a position where your function can continually call itself and inevitably cause a stack overflow. However, when done right, _Recursion_ allows us to write clean, DRY, and efficient code.

Next week I will be discussing _Pointers, JSON Marshalling, and JSON Unmarshalling_. See you then!
