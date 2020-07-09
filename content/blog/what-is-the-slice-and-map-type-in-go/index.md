---
title: What is the Slice and Map Type in Go?
date: "2020-04-19T22:40:32.169Z"
description: "Learning Go - Week 4 - Slice and Map"
featured: ./lights.jpeg
---

This is the fourth entry of my weekly series _Learning Go_. Last week I covered a few common _types_ in Go: `Boolean`, `Numeric`, `String`, `Array`, and `Slice`. This week I will cover a few more pieces of `Slice`, and will talk about the `Map` type as well.

## Slicing items in a Slice

Pulling out values from one Slice into another is made easy in Go; this is called _slicing_. This is done by specifying a half-open range with two indices, separated by a colon `[:]`. I will demonstrate below:

```go
package main

import (
	"fmt"
)

func main() {
	x := []int{4, 5, 6, 7, 8}
	y := x[1:3]
	fmt.Println(y)
	// [5 6]
}
```

- first we assign the variable `x` to a Slice of the type _int_ with the values `4 5 6 7 8` using a _composite literal_
- next, we assign the variable `y` to the value of `x` from the indices `1` up until but _not including_ indices `3`
- the result gives us a Slice with the values `5` and `6`

A few things to note about _slicing_:

- the first and last indices of the slice expression are _optional_

Let me give you another example

```go
package main

import (
	"fmt"
)

func main() {
	x := []int{4, 5, 6, 7, 8}
	fmt.Println(x[:4])
	// [4 5 6 7]
}
```

Above we are slicing a Slice; however, in this example we omit the first indices.

As you can see, when we omit the first indices it will default to `0`, and if we were to omit the second indices it would default to the length of the Slice.

The result is taking all values in the Slice _until_ the fourth indices.

## Variadic functions

Adding more values into a Slice in Go is made easy by using the built-in _variadic_ function, `append`. Quick note: a _variadic_ function is a function that can take zero, or any number of trailing arguments. Let's see an example of a _variadic_ function first:

```go
package main

import (
	"fmt"
)

func count(x ...int) {
	for _, v := range x {
		fmt.Println("The current value is: ", v)
	}
}

func main() {
	n := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	count(n...)
}
```

- we create a function called `count`
- `count` has a single parameter `x`
- what makes the `count` function _variadic_ is the `...` syntax after the `x` parameter
- this is how we tell the Go compiler to allow _any number_ of arguments for `x`
- in the `main` function you will see that we use the `...` syntax when we call the `count` function
- this is how we are able to pass an arbitrary amount of arguments into `count`
- by using the `...` syntax we are letting the Go compiler know that there _could_ be 10 items in this slice, or 100 items

## Appending values in a Slice

As mentioned above, using the `append` function is a quick and easy way to add values to a Slice in Go. The `append` function takes the original Slice as the first argument, and the values as the second argument. The second argument can of course be an arbitrary amount since it is a _variadic_ function. The `append` function returns a Slice of the same type.

```go
package main

import (
	"fmt"
)

func main() {
	n := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	n = append(n, 11, 12, 13, 14, 15)
	fmt.Println(n)
	// [1 2 3 4 5 6 7 8 9 10 11 12 13 14 15]
}
```

- inside of the `main` function, we declare the variable `x` and set the value to a Slice of type `int` that contains `1` through `10`
- on the next line, we re-assign the variable `n` to the return value of the `append` function
- inside the `append` function we pass `n` as the first argument - note this is a Slice of type `int`
- the second argument is the values `11` through `15`
- remember this is a _variadic_ function meaning it can have any number of trailing arguments
- second argument values _must be of the same type_ that the first argument Slice contains

Let's see what happens if you try to use two different types when calling an `append` function.

```go
package main

import (
	"fmt"
)

func main() {
	n := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	n = append(n, "not", "an", "int")
	fmt.Println(n)
	// cannot use "not" (type untyped string) as type int in append
}
```

- because the arguments in `append` were _not_ the type `int` the Go compiler throws an error and displays this message:

`cannot use "not" (type untyped string) as type int in append`

Go makes it easy for you to write code that will not produce inconsistent types.

## Removing values in a Slice

Go makes removing values from a Slice very intuitive. We will also be using _slicing_ when we want to remove items from a Slice.

```go
package main

import (
	"fmt"
)

func main() {
	n := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	n = append(n, 11, 12, 13, 14, 15)
	fmt.Println(n)
	// [1 2 3 4 5 6 7 8 9 10 11 12 13 14 15]

	n = append(n[:3], n[4:]...)
	fmt.Println(n)
	// [1 2 3 5 6 7 8 9 10 11 12 13 14 15]
}
```

- inside of the `main` function, we declare the variable `n` and set the value to a Slice of type `int` with the values `1` through `10`
- next, we `append` the values `11`, `12`, `13`, `14`, and `15` to the Slice `n`
- let's say that we want to remove the value `4` from `n`
- we do this by using slicing syntax `[:]`
- we passing in the values of the Slice `n` up until the third indices `n[:3]`
- our second argument starts with the value at the fourth indices of `n` `n[4:]`
- since there is no value on the right-hand side of the `:` we take _all_ of the rest of the values in `n`
- you'll notice we see the `...` syntax again, this is to ensure we can take an _arbitrary amount_ of arguments in case the size of `n` grows

## Map

> unordered group of elements of the same type, indexed by a set of unique keys of another type - called the "key type"

A few things to note about Map:

- structured as a `key` `value` store
- _very_ fast and efficient lookup
- unordered
- commas are needed after each entry in a Map

Let's see a few common uses of Map in action:

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}
	fmt.Println(m)
	// map[yoda:900, obi wan: 34]
}
```

- inside of the `main` function, we declare the variable `m` that is assigned to a `map`
- the `map`'s `key` will be of type `string`
- the `map`'s `value` will be of type `int`

A cool thing about Map is if you try to access a value by `key` and it _does not_ exist, it will still return a `zero value`. This can be _very_ useful in preventing an `error` being thrown for Map lookups. Speaking of, looking up a value in a Map via the `key` is super straight forward:

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	fmt.Println(m["yoda"])
	// 900
}
```

As mentioned earlier, lookups in Maps are _very_ quick and efficient. This is because when Go is given the explicit `key` to a `value` there is not any outstanding time or space complexity.

Above, we grab the value of `yoda` simply by using bracket notation and passing the `key` `"yoda"`.

What if a specified key is not found? I will show you a quick and simple way to handle this case, called the _Comma Ok Idiom_.

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	if v, ok := m["yoda"]; ok {
		fmt.Println("found yoda's age, you have", v)
		// found yoda's age, you have 900
	}
}
```

The _Comma Ok Idiom_ allows you to write defensive code in just a few lines.

- first we write an `if` statement that has two return values, `v` (value) and `ok` (condition is evaluated to `true`)
- since our Map contains the `key` `"yoda"` we step into this block and print this statement, along with the `value` of the `"yoda"` `key`

## Adding an element to a Map

Go makes adding elements to a Map easy peasy. Let me show you how it is done:

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	// adds element to a map
	m["darth vader"] = 24

	fmt.Println(m)

	// map[darth vader:24 obi wan:34 yoda:900]
}
```

To add a `key` `value` pair to a Map, you simply follow this syntax `m["key"] = value`

As seen above, we add the `key` `"darth vader"` and the `value` `24` to our Map `m`

## Looping in a Map

Looping in Maps is very common, just as they are in Arrays or Slices. In Maps, they are just as easy as well.

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	// loop over map and print key value pairs
	for k, v := range m {
		fmt.Println(k, v)
		// yoda 900
		// obi wan 34
		// darth vader 24
	}
}
```

As you can see, when looping over a Map, the syntax to do so is very similar to looping over an Array or Slice. The main difference here is the use of `k` (key) instead of `i` (index). This is due to the structural differences of Map.

## Removing an element from a Map

Sometimes something just has to go. Luckily this action is accomplished painlessly.

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	delete(m, "yoda")
	fmt.Println(m)
	// map[obi wan: 34]
}
```

- the `delete` function is built into the Map type, and as you can see it is very easy to use
- `delete`takes two arguments: the Map that you want to remove something from, and the `key` of the entry that you wish to remove

It isn't a bad idea to use the _Comma Ok Idiom_ when wanting to remove items from a Map conditionally as well:

```go
package main

import (
	"fmt"
)

func main() {
	m := map[string]int{
		"yoda":    900,
		"obi wan": 34,
	}

	if _, ok := m["yoda"]; ok {
		delete(m, "yoda")
	}
	fmt.Println(m)
	// map[obi wan:34]
}
```

Much like in the last example of using the _Comma Ok Idiom_, we create an `if` statement that has two return values, the `value` of the `key` and a `bool` value once the expression is evaluated.

- here, the value of `ok` will evaluate to `true`
- we are throwing away the first return (`value`) because we don't need it in this exercise
- because `ok` evaluated to `true`, we step into this `if` block and call the `delete` function
- we pass the Map, in this case `m` as the first argument, and the `key` `"yoda"` as the second argument
- we print out the value of `m` and see that the `key` `value` pair for `yoda` and `900` has been removed

## In Summary

The more I explore the fundamentals of these common types, the more excited I get. I love that Go makes common actions of these types so easy (adding, removing, shifting, etc). Next week I will cover two more data types I have used that are of equal importance: Structs and Interfaces. See you then!
