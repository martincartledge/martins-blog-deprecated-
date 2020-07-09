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

`&` <--- this operator allows you to view the address of the value in memory

`*` <--- this operator allows you to read and/or set a value to the _pointer_

Let's see an example of both of these operators in action, we will start with the `&` operator:

```go
package main

import "fmt"

func main() {
	name := "martin"
	// view the address of the value in memory
	fmt.Println(&name)
	// 0xc000010200
}
```

Let's walk through what is happening here, step-by-step:

-
