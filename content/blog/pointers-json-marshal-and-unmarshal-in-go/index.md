---
title: Pointers, JSON Marshal and Unmarshal in Go
date: "2020-07-16T22:40:32.169Z"
description: "Learning Go - Week 9 - Pointers, JSON Marshal and Unmarshal in Go"
---

This is the ninth entry of my weekly series _Learning Go_. Last week I covered _How to Write a Recursive Function in Go_. This week I am going to talk about _Pointers, JSON Marshal and Unmarshal_.

## Pointers

Although I have heard of _pointers_ in the past, due to coming from JavaScript, this was a completely new territory for me. To define a _pointer_ as simply as I can, a _pointer_:

> "points" to a location in memory where a value is stored

Sounds fairly semantic, right? I have a feeling most would infer this from the word itself; however, there is much more to what a _pointer_ is. Before I jump into using a _pointer_ in Go, let me explain a few important pieces of _pointer_ syntax.

In Go, there are two operators you need to remember when working with _pointers_:

`&` <--- this operator generates an address of the value in memory (generates a *pointer*)

`*` <--- this operator allows you to retrieve the underlying value of the _pointer_

> Note: this is commonly referred to as "Dereferencing"

Let's see an example of both of these operators in action, we will start with the `&` operator:

```go
package main

import "fmt"

func main() {
	name := "martin"
	// & generates an address of the value in memory
	fmt.Println(&name)
	// 0xc000010200 <--- the address that is generated for the value of name
}
```

We have created our first *pointer*!

Let's walk through what is happening here, step-by-step:

- inside of `func` `main` we declare a variable with the identifier `name` with a value of `martin` of type `string`
- next, using the `fmt` package, we print out the *address* of the value in memory for `name`
- this outputs the following address: `0xc000010200`

This might not seem super useful right now, but let me show you how you can use this address to retrieve a value:

```go
package main

import "fmt"

func main() {
	name := "martin"

	namePointer := &name

	fmt.Println("namePointer: ", pointer)
	// namePointer:  0xc000010200

	underlyingValue := *namePointer

	fmt.Println("underlyingValue: ", underlyingValue)
	// underlyingValue:  martin
}
```

Let me walk through what is happening here, line-by-line:

- first, we decalre a new variable with an identifier of `name` with a value of `martin` of type `string`
- next, we declare a new variable with an identifier of `namePointer` with a value of a *pointer* to the `name` variable
- when we print out the value of `namePointer` on the next line, we receieve this address `0xc000010200`
- next, we decalre a new variable with an identifier of `underlyingValue`, notice we are using the `*` operator, this allows us to get the *underlying value* of a *pointer* value; therefore, the value of `underlyingValue` is the *underlying value* of `namePointer`
- we print out the value of `underlyingValue` on the next line and we see that it's value is `martin`

Pretty cool, huh?

*Pointers* allow us to store references to data at a low level, their address in memory.
