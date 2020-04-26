---
title: Learning Go Week 5
date: "2020-04-26T22:40:32.169Z"
---

This is the fifth entry of my weekly series _Learning Go_. Last week I covered a few more pieces of the `Slice` and `Map` type. This week I will be talking about the `Struct` and `Interface` types.

## Struct

A `struct` is a data structure that allows you to compose values of _different_ types. Because of that, a `struct` is a great way to aggregate data. From a computer science perspective, a `struct` in Go is considered a [composite data type](https://en.wikipedia.org/wiki/Composite_data_type). 

This simply means that this is a data type which can be constructed using the language's primitive data types (`string`, `int`, etc), or other _composite_ types. Let's see one in action. 


In this example I will be creating a `struct` with _primitive_ data types:

```
package main

import (
	"fmt"
)

type car struct {
	model string
	color string
	year  int
}

func main() {
	c := car{
		model: "tacoma",
		color: "white",
		year:  2020,
	}
	fmt.Println(c)
	// {tacoma white 2020}
}
```

In the example above, I am creating a new `struct` of type `car`. 

- first, I declare that I am creating a new `type`
- then I declare an identifier for this `type`, in this case, our `type` is `car`
- we declare our new type, `car`, to have the _underlying_ type of `struct`
- next, we list out the `field names` paired with their `type`


## Anonymous struct

Like many things in programming, there is more than one way to do something. The same can be said about creating a `struct`. If you are wanting to use a `struct` for a specific scope, there is a short-hand way to declare them.

```
package main

import "fmt"

func main() {
	c := struct {
		model string
		color string
		year  int
	}{
		model: "tacoma",
		color: "white",
		year:  2020,
	}
	fmt.Println(c)
	// {tacoma white 2020}
}
```

Let me walk you through what is happening in this example:

- we are _declaring_ a new variable, `c` of _type_ `struct`
- then, inside the brackets `{}`, on the left-hand side, we declare our _field names_
- on the right-hand side, we declare the _type_ of each respective _field name_
- last, and most importantly, inside another set of brackets `{}` we declare the name and the value of these _field names_

Important note: you _must_ place a comma after each entry in a `struct`, or you will get an error from the compiler that looks a little bit like this:

`syntax error: unexpected newline, expecting comma or }`

## Method sets

Methods are used heavily in programming and that is no different in Go. Thinking in terms of traditional Object Oriented paradigms, a method is defined and called in relation to the Class it was defined in.

In Go, a _type_ may have a method associated with it, most commonly with a `struct`. Let's take a look at an example using a `method` of a `struct` type:

```
package main

import (
	"fmt"
)

type toyota struct {
	model string
	color string
	year  int
}

func (t toyota) start() {
	fmt.Println("vroom vroom")
}

func main() {
	t := toyota{
		model: "tacoma",
		color: "white",
		year:  2020,
	}
	t.start()
	// vroom vroom
}
```

- we define a new `type` with the identifier `toyota` with an underlying type of `struct`
- using the `func` keyword, we create a new function
- next we see `(t toyota)`, pay attention to `toyota` here, this is what is called a _receiver type_ - this means this method can _only be called by a `toyota` type_
- in this example the `t` is a _value receiver_ - it is possible to use a _pointer receiver_ as well
- using dot notation we can pull values from `t` - I will show you how in the next example below

```
package main

import (
	"fmt"
)

type toyota struct {
	model string
	color string
	year  int
}

func (t toyota) start() {
	fmt.Println("Hey! I'm a ", t.color, t.year, t.model)
}

func main() {
	t := toyota{
		model: "tacoma",
		color: "white",
		year:  2020,
	}
	t.start()
	// Hey I'm a white 2020 tacoma
}
```

This example is identical to the previous; however, the change to note here is what is happening inside of the `start` method.

- we see that we still have a _receiver type_ of `toyota` with a _receiver value_ `t`
- if we take a look at the `toyota` type, we see that it has three _field names_: `model`, `color`, and `year`
- inside of `func` `main` we are creating a new variable named `t`
- using a [composite literal](https://golang.org/ref/spec#Composite_literals), we assign the variable `t` to be of type `toyota` and assign the values `tacoma`, `white`, and `2020` to their respective _field names_
- this is where the magic happens: using dot notation, we call the `start` method from `t`
- because `t` is of type `toyota` it has access to the `start` method
- inside of `start` we are again using dot notation to print out the values of the fields found in `toyota`

## Interfaces

An `interface` is both a `type` and how you name a group of _methods_ in Go. Let's jump right into an example to explain:

```
package main

import (
	"fmt"
)

type car interface {
	start() string
}

type toyota struct {
	model string
}
type subaru struct {
	model string
}

func (t toyota) start() string {
	return t.model
}

func (s subaru) start() string {
	return s.model
}

func getModel(c car) {
	fmt.Println(c.start())
}

func main() {
	t := toyota{model: "tacoma"}
	s := subaru{model: "forester"}

	getModel(t)
	// tacoma
	getModel(s)
	// forester
}
```

- I start by creating a new `interface` - I do this by writing the `type` keyword, followed by the identifier `car`, and lastly the underlying type _struct_
- next, I declare two `struct` `types`, `toyota` and `subaru` - they both have a field named `model` with the type `string`
- I create two _methods_ that are both called `start` and have _value receivers_ and accept their respective _receiver type_ `toyota` and `subaru`
- I create a function named `getModel` that takes a value of type `car` as a parameter
- inside of the `getModel` function, I print out the returned value of the `start` method
- in the `main` function I declare two variables, `t` and `s`
- using a composite literal, `t` is assigned to the value of type `tacoma` with the field name `model` and respective value `tacoma`
- the same process is done on the next line, the only differences being the variable is named `s` and the type is `subaru`
- you might have noticed that both the `tacoma` and `subaru` types have a method named `start` 
- since `start` is a part of the `car` `interface`, both the `tacoma` and `subaru` types can _also_ be of type `car`
- last, we invoke the `getModel` function twice, first by passing in `t` as an argument, and then by passing `s` as an argument
- the value of the field name `model` is returned for `t` and `s`


## In Summary

There are so many ways to optimize and organize your code in Go. 

The `struct` data type helps us compartmentalize our code by common values and allows us to aggregate values of multiple types, all under one type. How cool is that? 

While `struct` allows us to group data creatively, `interface` allows us to group functionality between our `struct` values. Thus allowing our code to have a deeper reach throughout our codebase. Now, creating methods that can run functionality across multiple `struct` types is a painless exercise.

Next week I will be sharing my experience with functions in Go, see you then!