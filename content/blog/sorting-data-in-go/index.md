---
title: Sorting Data in Go
date: "2020-07-22T22:40:32.169Z"
description: "Learning Go - Week 10"
---

This is the tenth entry of my weekly series _Learning Go_. Last week I talked about [Pointers, Marshalling, and Unmarshalling Data in Go](). This week I will be talking about how to sort your data in a Go Program. Let's get to it.

I will be showing you multiple examples of how to sort your data, these examples can be grouped into two categories:

- using the `sort` package
- writing custom sorting functions

## Using the `sort` Package

- Can be used with built-in types (`string`, `int`, etc), as well as user-defined types
- Sorting happens "in-place". Changes to a `slice`, for example, would not return a new `slice`
- Much like the `array` method `sort` in JavaScript, the `sort` package in Go compares the ASCII values for `string` sorting

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


Inside of our `func` `main` we create a new variable with the identifier `str`
```go
str := []string{"c", "a", "b"}
```

The value of `str` is a `slice` of values that are of type `string`. We use a _composite literal_ to assign those values

```go
sort.Strings(str)
```

We then use the `sort` package to invoke the `Strings` method and pass the `str` variable as the only argument

> Note: the `sort` methods are specific to their built-in type i.e. `string` -> `Strings`, `int` -> `Ints`, etc.

```go
fmt.Println(str)
// [a, b, c]
```

We use the `fmt` package to print the result, and we can see that the value of `str` has now been properly sorted

Let me show you an example of sorting values of type `int`

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	ints := []int{4, 1, 9, 3, 8}

	sort.Ints(ints)

	fmt.Println(ints)
	// [1, 3, 4, 8, 9]
}
```

Inside of our `func` `main` we create a new variable with the identifier `ints`

The value of `ints` is a `slice` of values that are of type `int`. We use a _composite literal_ to assign those values
```go
ints := []int{4, 1, 9, 3, 8}
```

We then use the `sort` package to invoke the `Ints` method and pass the `ints` variable as the only argument
```go
sort.Ints(ints)
```

We use the `fmt` package to print the result, and we can see that the value of `ints` has now been properly sorted
```go
fmt.Println(ints)
// [1, 3, 4, 8, 9]
```

But what if you need something a little more in-depth, or customized? Well, you can certainly do that with ease in Go. Let me show you some examples of some custom sorting functions that can add a lot of value to your programs.

## Custom Sort Functions

Let's jump right into an example

```go
package main

import (
	"fmt"
	"sort"
)

type Person struct {
	First string
	Age int
}

type ByAge []Person

func (a ByAge) Len() int {
	return len(a)
}

func (a ByAge) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}

func (a ByAge) Less(i, j int) bool {
	return a[i].Age < a[j].Age
}

func main() {
	me := Person{"martin", 29}
	brother := Person{"noah", 20}
	sisterOne := Person{"miranda", 26}
	sisterTwo := Person{"alexis", 23}

	family := []Person{me, brother, sisterOne, sisterTwo}

	fmt.Println(family)

	sort.Sort(ByAge(family))

	fmt.Println(family)
}
```

To make any sorting happen, we have to make sure that we import the `sort` package


Next, we create a custom type with the identifier `Person` which is of type `struct`

The fields for our `Person` type are: `First` of type `string` and `Age` of type `int`
```go
type Person struct {
	First string
	Age int
}
```

We create another custom type with an identifier `ByAge`, it is a `slice` of our other custom type `Person`
```go
type ByAge []Person
```

Next, we create three functions that all take a _receiver type_ with an identifier of `s` of type `ByAge`.

> Note: we have to create these three functions because the `Sort` function makes one call to a `Len` function to determine length, and then makes calls to `Less` and `Swap`. You can read more about that in the [official Go docs](https://golang.org/pkg/sort/#Sort)

Let's walk through each of these functions I have created starting with `Len`

```go
func (a ByAge) Len() int {
	return len(a)
}
```

As mentioned earlier, this function has a _receiver type_ with an identifier of `a` and of type `ByAge`

The identifier of this function is `Len`

We pass the value of `a`, supplied from our _receiver_, as the only argument for the `len` function that we `return` from `Len`

Next, we create the `Swap` function

```go
func (a ByAge) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}
```

Much like the `Len` function, `Swap` has a *receiver type* with an identifier of `a` and of type `ByAge`

The `Swap` function has two parameters, `i` and `j`, both of type `int`

Inside of `Swap` we see that we are *swapping* the order of the values each time `Swap` is called

The value `a[i]` will be replaced with the value `a[j]`, and the value `a[j]` will be replaced with the value `a[i]`

The last function that `Sort` needs is the `Less` function

```go
func (a ByAge) Less(i, j int) bool {
	return a[i].Age < a[j].Age
}
```

The `Less` function has a *receiver type* with an identifier of `a` and of type `ByAge`

The `Less` function has two parameters, `i` and `j`, both of type `int`

The `Less` function returns a value of type `bool`

> Note: The purpose of this sorting function is to sort from youngest to oldest based on the value of the `Age` field

On the `return` statement we see that we are writing an expression that checks if `a[j].Age` is greater than `a[i].Age`

This is the last step, and helps the `Sort` function determine which values should be swapped using the `Swap` function

Inside of `func` `main` we declare 4 variables using the short declaration operator, all of these variables are assigned a value using a *composite literal* and are of type `person`

```go
me := Person{"martin", 29}
brother := Person{"noah", 20}
sisterOne := Person{"miranda", 26}
sisterTwo := Person{"alexis", 23}
```

We create a new variable with the identifier `family` which will be a type of a `slice` of values that are of type `Person`

We assign values to `family` using a composite literal

```go
family := []Person{me, brother, sisterOne, sisterTwo}
```

Next, we convert the `family` variable to be of our custom type `ByAge`, this way we can make use of our functions we created that all have *receiver types* of `ByAge`

We pass this `ByAge(family)` value into the `Sort` function as the only argument
```go
sort.Sort(ByAge(family))
```

On the next line, we are using the `fmt` package to print the value of `family`
```go
fmt.Println(family)
// [{noah 20} {alexis 23} {miranda 26} {martin 29}]
```

And there it is! Now our data is sorted from youngest to oldest.

## In Summary

Sorting data is an extremely common occurrence; therefore, knowing how to sort data effectively and efficiently in Go is paramount. I hope you learned something about using the `sort` package or about writing your own custom sorting function. Next week I will be talking about *Concurrency in Go*. See you then!