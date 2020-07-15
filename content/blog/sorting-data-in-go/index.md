---
title: Sorting Data in Go
date: "2020-04-26T22:40:32.169Z"
description: "Learning Go - Week 10"
---

This is the fifth entry of my weekly series _Learning Go_. Last week I covered a few more pieces of the `Slice` and `Map` type. This week I will be talking about the `Struct` and `Interface` types.

This is the tenth entry of my weekly series _Learning Go_. Last week I talked about [Pointers, Marshalling, and Unmarshalling Data in Go](). This week I will be talking about how to sort your data in a Go Program. Let's get to it.

I will be showing you multiple examples of how to sort your data, these examples can be grouped into two catagories:

- using the `sort` package
- writing custom sorting functions

## Using the `sort` Package

- Can be used with built-in types (`string`, `int`, etc), as well as user-defined types
- Sorting happens "in-place". Changes to a `slice`, for example, would not return a new `slice`
- Much like the `array` method `sort` in JavaScript, the `sort` package in Go compares the ascii values for `string` sorting

Let's try sorting a `string`:

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	str := []string{"c", "a", "b"}

	sort.Strings(str)

	fmt.Println(str)
	// [a, b, c]
}
```

```go
str := []string{"c", "a", "b"}
```

Inside of our `func` `main` we create a new variable with the identifier `str`

The value of `str` is a `slice` of values that are of type `string`. We use a _composite literal_ to assign those values
