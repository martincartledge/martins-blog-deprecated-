---
title: Concurrency in Go - Using Goroutines and Wait Groups
date: "2020-07-29T22:40:32.169Z"
description: "Learning Go - Week 11"
---

This is the eleventh entry of my weekly series _Learning Go_. Last week I talked about [Sorting Data in Go](https://www.martincartledge.io/sorting-data-in-go/). This week I will be talking about how Concurrency works in Go. Before I really dive into the topic of Concurrency, I feel that I need to make some differences between Concurrency and Parallelism since they often times are confused with each other. I will also explain a few pieces of the Go language that allows us to use Concurrency. These pieces are Go Routines and Go Statements.

## Concurrency vs. Parallelism

## Concurrency

> the ability for various parts of a program to run (executed) out-of-order, or in partial order without affecting the final result

- Designed to _handle more_ than one task at once
- Able to make progress on more than one task at a time, but _not_ simultaneously
- Can work with 1-core CPU; however, the system decides when to start each task
- Concurrency is made difficult by the subtleties required to implement correctly across shared variables

## Parallelism

> the ability to perform several computations at the same time (simultaneously)

- Designed to _do more_ than one task at once
- Able to execute multiple tasks in a multi-core CPU
- Must have multi-core CPU

## Concurrency in Go

- Shared values are passed around on [Channels](https://gobyexample.com/channels)
- Never shared on separate threads of execution
- Does not communicate by sharing memory, share memory by communicating

## Go Routines

- [Multiplexed](https://en.wikipedia.org/wiki/Multiplexing)
- Used with functions or methods
- Used with the `go` keyword

## Go Statements

- Starts with the execution of a function call as an independent concurrent thread of control or Go routine within the same address space
- Must be a function or a method call
- If the function has return values they are discarded when the function completes

Before we jump into how to use _Concurrency_ in Go, I think we should discuss a few of the pillars around writing _Concurrent_ code in Go. A few of these pillars are _Goroutines_ and _Channels_

## Goroutines

> a lightweight thread of execution

So, what is a _Goroutine_ and why should I care about them? Here are a few things to consider:

- Goroutines are non-blocking (_asynchronous_)
- Due to being asynchronous, multiple goroutines can run _concurrently_ (multiple pieces ran at the same time without affecting the final result)
- If you wish to wait for your _Goroutine_ to finish before you continue, you can use a _WaitGroup_ (we will cover this later in the post)

Let's take a look at an example of using a traditional function (blocking) with a few _Goroutines_ (non-blocking) to better illustrate their place in our Go code

```go
package main

import (
	"fmt"
	"time"
)

func countToFive(wasCalledBy string) {
	for i := 0; i < 5; i++ {
		fmt.Println(wasCalledBy, i)
	}
}

func countToThree(wasCalledBy string) {
	for i := 0; i < 3; i++ {
		fmt.Println(wasCalledBy, i)
	}
}

func main() {
	countToFive("direct - blocking")

	go countToFive("I am a goroutine!")

	go countToThree("I am another goroutine!")

	time.Sleep(time.Second)
	fmt.Println("exit program")
}
// direct - blocking 0
// direct - blocking 1
// direct - blocking 2
// direct - blocking 3
// direct - blocking 4
// using another goroutine! 0
// using a goroutine 0
// using a goroutine 1
// using a goroutine 2
// using a goroutine 3
// using a goroutine 4
// using another goroutine! 1
// using another goroutine! 2
```

Let's walk through what is happening:

> Quick note: we are importing the `time` package because we need to _wait_ for a second in order to allow our _goroutines_ to finish. Remember, they are not blocking (synchronous); therefore, we need to wait for them to finish their computations.

We import the `time` package that we will use in this example just to wait for our _Goroutines_ to finish. I have found it is much more common to use a _WaitGroup_, we will discuss these later in the post

```go
import (
	"fmt"
	"time"
)
```

Next, we create two functions, `countToFive` and `countToThree`, both of these expect a single parameter `wasCalledBy` which is of type `string`.

```go
func countToFive(wasCalledBy string) {
	for i := 0; i < 5; i++ {
		fmt.Println(wasCalledBy, i)
	}
}

func countToThree(wasCalledBy string) {
	for i := 0; i < 3; i++ {
		fmt.Println(wasCalledBy, i)
	}
}
```

Calling our _Goroutine_ with the `wasCalledBy` argument will help illustrate how Go executes these _Goroutines_

Inside of `func` `main` I call the `countToFive` function directly, without making use of a _Goroutine_

```go
func main() {
	countToFive("direct - blocking")
```

As the argument says, I am not using the `go` keyword and creating a _Goroutine_; therefore, this code will be synchronous and block our thread of execution

On the next line, I create a _Goroutine_. I do so very easily by calling the same function and placing the `go` keyword in front of the function identifier

```go
go countToFive("I am a goroutine!")
```

Next, I fire off another _goroutine_ by placing the `go` keyword in front of the function identifier.

```go
go countToThree("I am another goroutine!")
```

In order to ensure that our _Goroutines_ finish, we are using the `time` package in order for us to _sleep_ for one second.

```go
time.Sleep(time.Second)
```

What do you expect to see in our logs? What order do you expect these _Goroutines_ to run in?

The output might surprise you, however, I hope it will illuminate some of the power that _Goroutines_ can give you.

```go
// direct - blocking 0
// direct - blocking 1
// direct - blocking 2
// direct - blocking 3
// direct - blocking 4
// using another goroutine! 0
// using a goroutine 0
// using a goroutine 1
// using a goroutine 2
// using a goroutine 3
// using a goroutine 4
// using another goroutine! 1
// using another goroutine! 2
```

The first 5 lines should not surprise you, we are calling a function without using a _Goroutine_; therefore, it runs in a synchronous (blocking) manner.

The next few lines should raise some eyebrows, however. Do you notice that our `countToThree` function logged an item before `countToFive` did?

This is the power of _Goroutines_. The Go runtime allows us to write code that can be executed in a concurrent way.

## WaitGroups

Using _WaitGroups_ to wait for multiple _goroutines_ to finish is common practice when using Go. _WaitGroup_ is a _type_ which is a part of the `sync` package.

There are a few functions that come with _WaitGroups_ that you will use often. The most important of these are `Add` and `Done`. Let me walk you through how to use these.

```go
package main

import (
	"fmt"
	"sync"
)

func countRoutine(upTo int, wg *sync.WaitGroup) {
	for i := 0; i < upTo; i++ {
		fmt.Println("count routine: ", i)
	}
	wg.Done()
}

func count(upTo int) {
	for i := 0; i < upTo; i++ {
		fmt.Println("count: ", i)
	}
}

func main() {
	var wg sync.WaitGroup

	wg.Add(1)

	go countRoutine(10, &wg)

	count(5)

	wg.Wait()
}
```

Let's walk through what is happening, line-by-line:

As I mentioned earlier, since the _WaitGroup_ is called from the `sync` package, we need to make sure we import it

```go
import (
	"fmt"
	"sort"
)
```

Next, we create a function with the identifier `countRoutine` which has two parameters: `upTo` of type `string` and `wg` which is a pointer to `sync.WaitGroup`

> Note: _WaitGroups_ can only be passed to functions as a pointer

Inside of this function, we create a for loop and iterate until we reach the `upTo` value that we pass into the function. In order for _WaitGroup_ to know that a _goroutine_ is complete, we run the `Done()` function

```go
func countRoutine(upTo int, wg *sync.WaitGroup) {
	for i := 0; i < upTo; i++ {
		fmt.Println("count routine: ", i)
	}
	wg.Done()
}
```

We then create a function with the identifier `count` with a single parameter `upTo` of type `int`. We have the same for loop inside of this function, the only difference is we are not using a _WaitGroup_ because this is _not_ a _Goroutine_

```go
func count(upTo int) {
	for i := 0; i < upTo; i++ {
		fmt.Println("count: ", i)
	}
}
```

Inside of the `main` function, we create a variable using the `var` keyword and give this variable the identifier `wg` of type `sync.WaitGroup`

```go
var wg sync.WaitGroup
```

In order to tell the Go runtime about our _WaitGroup_ we have to add one. We can do this easily by using the `Add()` function that takes an argument of type `int` that signifies how many _WaitGroups_ you would like to add. For this example we only have one _Goroutine_, so we will just add one:

```go
wg.Add(1)
```

Next, we use the `go` keyword to launch `countRoutine` as a _Goroutine_ and pass `10` as our `upTo` argument and a _WaitGroup_ pointer (`&wg`) as our `wg` argument

```go
go countRoutine(10, &wg)
```

We call the `count` function which will be a synchronous, blocking function

```go
count(5)
```

This might be one of the most important pieces to remember. As you see we are calling a `Wait()` function on the last line inside of `main`. This function lets the Go runtime know that we have _Goroutines_ that is not complete yet and to keep our program running.

```go
wg.Wait()
```

As I mentioned earlier, the way we let the Go runtime know that our _Goroutine_ is complete is by calling the `Done()` function at the end of our _Goroutine_. Once we do this, the Go runtime knows it can exit the program.

```go
wg.Done()
```

## In Summary

By using the power of _Goroutines_ paired with the help of _WaitGroups_, we can write _concurrent_ code in Go. Pretty cool, huh? I have broken up this topic into two pieces because I have a lot more to show you about writing _concurrent_ Go code and the tools that Go gives us to use. Next week I will be talking about _Channels, Mutex, and Race Conditions_. See you then!
