---
title: Learning Go Week 1
date: "2020-03-29T22:40:32.169Z"
description: "History of Go, variables, and types"
---

This is the beginning of a blog series I am going to be releasing on a weekly basis. I'll be writing about my experiences and findings as I learn to use the Go programming language. I am learning using a handful of forms of media: video, books, and lectures. For this week, I will be discussing what I have learned having completed ~ 25 video segments of [Todd McLeod's](https://twitter.com/todd_mcleod?lang=en) course.

## Why Go?

Besides my passion for programming and computer science, I'll be completely honest - I do not have a compelling answer for this one. Here are a few thoughts on why I was interested initially:

- Created by and used heavily at Google
- I have heard it is _very efficient_
- It is fairly in demand in the tech industry
- It is used by a lot of companies
- The community remains innovative and engaged

## History

Go, or _Golang_ was created by Rob Pike, Robert Griesemer, and Ken Thompson in 2009. Those names might not mean much to you; however, they have all contributed heavily to the software development industry.

Rob Pike - Member of the core Unix team and created the UTF-8 coding scheme

Robert Griesemer - Worked closely with Niklaus Wirth, the creator of the programming language, Pascal

Ken Thompson - Designed and implemented the original Unix system as well as helped invent the C programming language

It is compiled, concurrent, garbage-collected, and statically typed.

## Why should you care?

Great question. I found what Todd McLeod said to be very insightful:

- Efficient compilation
- Efficient execution
- Ease of programming

Short and sweet. Efficiency paired with ease? Good deal.

In the first week of learning Go I can already speak to how enjoyable it has been. I am so excited to dive into more.

## What can you use Go for?

I have found that Go can be used for a lot of various applications, a few of those include:

- Command-line tools
- Cryptography
- Image Processing
- Http / UDP / TCP
- [Concurrency](<https://en.wikipedia.org/wiki/Concurrency_(computer_science)>) (excited to learn more about this one!)

## Type is king

Go is a [statically typed](https://en.wikipedia.org/wiki/Type_system#Static_type_checking) language - types matter, and up until this point, I have primarily used Javascript, a dynamically typed language. Honesty time: I _rarely_ think in terms of type; however, I know that using a statically typed language _will_ make me a better developer.

## Thinking idiomatically

Before taking this course I could not have told you what "idiomatic" meant. I heard the phrase "Idiomatic Go" and a moment of panic came over me - am I in over my head? That sounds way too smart for me. _Idiomatic_ comes from the word _Idiom_, and that word is far less intimidating:

> id-i-om
>
> a group of words established by usage as having a meaning not deducible from those of individual words

Essentially, "Idiomatic Go" is an agreed upon style and method of writing in the language that is _blessed_ by the creators.

## Smaller things to build bigger things

A Go application is comprised of packages. I am used to thinking of applications in terms of files and their respective folders. Go is much more clean and stripped down in comparison.

One of the first pieces of Go I was exposed to was the traditional "Hello world" program. I know at times it is easy to deem these examples "overly trivial" but, I find them helpful. You have to walk before you run, right?

```go
package main

import (
	"fmt"
)

func main() {
    fmt.Println("Hello world")
}
```

Pretty simple right? Let me walk you through what is going on. First and foremost,_every Go application_ must have a `main` package. These are commonly found in the `main.go` file in the `ROOT` of your application. A lot packages, including `fmt`, are from what is called the `Standard Library` of Go, they are lightweight and fast.

The entry point for _all_ Go applications is the `main` function. This is where all of your code for your application is run. When this function is done executing code, your program is finished.

## Thinking in terms of packages

Go is designed for you to think in terms of _packages_ when you are creating your application. A package is quite simply a source file containing a piece of functionality. Unix was obviously a large influence on the creation of Go, and because of that they share the same idealogy - _smaller things to build bigger things_.

Small, concise, and bite-sized.

### Variables

Go has some really cool built in behavior with variables. The one I enjoy the most is: you _can not declare a variable and not use it_. This circles back to one of the principals and goals of Go - performance. By enforcing all declarations to be used you are helping preserve memory efficiency.

Another cool feature of variables is the ability to "throw away" return values. This can be done like this:

```go
package main

import (
	"fmt"
)

func main() {
    id, _ := ReturnId()
}
```

Inside of the `main` function I am expected to receive 2 return values from the `ReturnId` function; however, in this case I only care about the value of `id`. By using `_` I am "throwing away" that 2nd return value.

### Short declaration operator

So far I have learned about two common ways to declare variables in Go, and although they are fairly similar, a notable difference is their _scope_.

_*Short Declaration Operator*_

`:=` <---- short declaration operator (looks like a gopher)

This method of declaring variables seems to be the most common when writing Go programs. I believe a primary reason is due to it being at a `function scope`. Keeping your variables as close to the work you are performing on them reduces risk of side effects or changes to your variable.

- has to be declared inside of a function body
- can not be declared with a type

## the var keyword

The other common way to declare a variable is to use the `var` keyword. A few notes on the differences of the `var` keyword is:

- can be declared outside of a function body
- can be declared with a type (`int`, `string`, `map`, etc)

Just to reiterate: it is best practice to use the short declaration operator whenever possible.

## Types

I have not dove too deep into types in Go yet, but I do know of these types:

- Primitive data types: booleans, numeric (float, int, etc), and strings
- Composite data types: array, struct, pointer, function, interface, slice, map, and channels

## Zero value

A cool thing I learned about using the `var` keyword is that when you declare a variable without an initial value, the Go compiler automatically assigns what is called a `zero value`. Below are the zero values of common data types:

```go
var y string
// ""
var z int
// 0
var z bool
// false

// nil for pointers, functions, interfaces,
// slices, channels, maps
```

## Creating your own types

Besides using Interfaces in Typescript, I did not have much experience in creating my own types. I found that Go makes this really easy.

```go
package main

import (
	"fmt"
)

var a int = 42

type midichlorian int

var b midichlorian

func main() {
    fmt.Print.ln(a)
    // 42
    fmt.Printf("%T\n", a)
    // int

    b = 43
    fmt.Print.ln(b)
    // 43
    fmt.Printf("%T\n", b)
    // main.midichlorian
}
```

As you can see above, I declare a variable with the name `a` of the type `int`. Next, I use the `type` keyword to define a new `int` type with the name `midichlorian`. Something to note here is that although I declared a new type called `midichlorian`, it's _underlying_ type is `int`.

## "Convert" not "Cast"

It would only make sense that due to Go's strong, statically typed ethos that converting values would be a completely deliberate action. In JavaScript this is referred to as _type casting_, and is not completely reliable. Go takes a different approach - you _convert_ a value's type, you do not _cast a type_. I will demonstrate below.

```go
package main

import (
	"fmt"
)

var a int = 42

type midichlorian int

var b midichlorian

func main() {
	a = 42
	fmt.Println(a)
	// 42
	fmt.Printf("%T\n", a)
	// int

	b = 43
	fmt.Println(b)
	// 43
	fmt.Printf("%T\n", b)
	// main.midichlorian

	// CONVERSION <<<<<<
	a = int(b)
	fmt.Println(a)
	// 43
	fmt.Printf("%T\n", a)
	// int
}
```

As you see, we declare the variable `b` with the value of `43` with the type `midichlorian`. We then reassign the variable `a` with the return value of the `int()` conversion function on the `b` variable. Pretty cool, huh? With Go there is no uncertainty with the types you are working with.

## In summary

This first week of learning was a blur - there is so much to learn, and so much I have already learned. I am so excited to continue diving deeper into Go. Thanks to Go's static type nature paired with it's powerful standard library package, I feel I have already learned how to write my code cleaner, safer, and more efficiently. The best part is I know this is only the beginning. I am so excited to continue sharing what I learn with you all.
