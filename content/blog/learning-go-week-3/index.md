---
title: Learning Go Week 3
date: "2020-04-12T22:40:32.169Z"
---

This is the third entry of my weekly series _Learning Go_. Last week I covered _control flow_ and a few of the primary _control structures_. I also touched on familiar territory; loops, the for statement, and conditional statements. This week I am diving head-first into _types_ in Go, and what they are most commonly used with.

## So, what is a "Type"?

> determines the set of values together with operations and methods that are specific to those values

Think of a _type_ like a family. They are a collection of _like_ values, much like a family is a collection of folks who share genetics, traits, etc. In the same way, _types_ can share operations and methods that only that _type_ has access to.

Most commonly used types in Go are as follows:

- Boolean
- Numeric
- String
- Array
- Slice
- Map
- Struct

These are some more commonly used types, we will cover these in a later post:

- Pointer
- Function
- Interface
- Channel

## Type declaration

To create a new type, you simply use the _type_ keyword:

```
type (
    LightsaberColor string
)
```

A new type, `LightsaberColor` has now been created in your program. A few things to note that is happening in this declaration:

- this declaration _binds_ an identifier (`LightsaberColor`) to a type name, `string`.
- there are two forms of type declarations, _alias declarations_ and _type definitions_ (the example above is a _type definition_)

An _alias declaration_ also binds an identifier to the given type, and are not meant for everyday use. Their purpose was to support large refactors involving moving a _type_ between multiple and/or large packages.

You can create an _alias declaration_ like this:

```
type (
    LightsaberColor = JediLightsaberColor
)
```

Notice that these types now denote the same type. `JediLightsaberColor` can now be used as a replacement for `LightsaberColor`.

## Underlying type

Every type has what is called an _underlying type_. This is essentially the underbelly or the source of types that is bound to the declared type. Let me give you an example:

```
type (
    BountyHunter string
)
```

This _underlying type_ of `BountyHunter` is `string`. Common types such as: `bool`, `string`, `int` are called _predeclared identifiers_. This just means that they are implicitly declared in the _universe block_ (encompasses all Go source text).

## Type identity

When discussing types, two can only be _identical_ or _different_. Let me give you a few examples that will help differentiate the two.

_Identical_

```
package main

import (
	"fmt"
)

type (
	Jedi = bool
	Yoda = bool
)

var j Jedi
var y Yoda

func main() {
	fmt.Printf("%T\n", j)
    // bool
	fmt.Printf("%T", y)
    // bool
}
```

- `Jedi` is of the type `bool`, `Yoda` is also of type `bool`. This is also an example of an _alias declaration_.

_Different_

```
package main

import (
	"fmt"
)

type (
	Sith = string
)

type (
	Emperor = Sith
	Yoda    string
)

var s Sith
var e Emperor
var y Yoda

func main() {
	fmt.Printf("%T\n", s)
	// string
	fmt.Printf("%T\n", e)
	// string
	fmt.Printf("%T", y)
	// main.Yoda
}

```

- although `Yoda` and `Emperor` have the same _underlying types_, they were created in separate type definitions

## Type definitions

> creates a new, distinct type with the same underlying type and operations as the given type and binds an identifier to it

Let me break down this definition by showing you how to create a _type definition_

```
type (
    HasTheForce bool
)
```

Here we have done a few things:

- created a distinct type `HasTheForce`
- bound the identifier `HasTheForce` to it

_this distinct type has the same type and its underlying type: `bool`_

## Boolean

> represents a set of truth values denoted by predeclared constants `true` and `false`

Note: the predeclared `boolean` type is `bool`

## Numeric

> represents a set of integers or floating-point values

These types get pretty extensive, for now, I will show the differences between integers and floating-point.

_Integers_

- whole numbers, no decimals

```
package main

import (
	"fmt"
)

func main() {
    x := 42
    fmt.Printf("%T", x)
	// int
}
```

_Floating Point_

- "real" numbers, contains decimals

```
package main

import (
	"fmt"
)

func main() {
    x := 42.12345
    fmt.Printf("%T", x)
	// float64
}
```

## String

> represents a set of string values, a string value is a (potentially empty) sequence of bytes

Things to note:

- the number of bytes is the "length" of the string
- the "length" can never be negative
- they are immutable - once created you can _not_ change the contents

Note: the predeclared `string` type is `string`

```
func main() {
    x := "do or do not, there is no try"
    fmt.Printf("%T", x)
	// string
}
```

You can get the length of a string by using the built-in function `len`:

```
func main() {
    x := "do or do not, there is no try"
    fmt.Println(len(x))
	// 29
}
```

## Array

> numbered sequence of a single type (element type)

Things to note:

- the number of elements in an array is the _length_
- the length of an array can _never_ be negative
- the _length_ is a part of an array's type - it's value is of type `int`

Here is an example of an array:

```
func main() {
    var a [10]int
    fmt.Printf("%T", a)
	// [10]int
}
```

Note: we use the `var` keyword here because we are declaring an array of type `int`, we can not use the short variable declaration (`:=`) here because we are binding a type to `a`.

You can get the length of an array by using the built-in function `len` (just like with strings):

```
func main() {
    var a [10]int
    fmt.Println(len(a))
	// 10
}
```

Note: I am also passing the `length` of the array by placing the value `10` in between the brackets.

I have found that arrays are not commonly used in Go, `slice` is far more common.

## Slice

> continuous segments with an underlying type of array and gives access to a numbered sequence

Essentially, a slice allows you to gather values of the same type.

A common practice in declaring a slice is by using a `composite literal`.

A composite literal is composed of a few things, the type and the value.

```
package main

import (
	"fmt"
)

func main() {
	// composite literal
	cl := []int{4, 5, 6, 7, 8}
	fmt.Println(cl)
    // [1 2 3 4]

}
```

Let me explain what is happening:

- we declare the variable `cl` using a short variable declaration
- we bind it's value to the type `slice` that will contain the type `int` (`[]int`)
- we then assign the values `1 2 3 4` to `cl` by placing them between brackets `{}`

Note: when creating a _composite literal_ all values _have_ to be of the same type

Because `slice` is built on top of an array, when the length of that slice changes a few things happen:

- a new array is created underneath
- old values are copied over
- the old array is thrown away

As you can assume, this can potentially take a lot of processing power. To avoid this, we can use the `make` function.

```
package main

func main() {
	a := make([]int, 10 , 10)
    fmt.Println(a)
    // [0 0 0 0 0 0 0 0 0 0]
}
```

A few things to note:

- `make`'s first parameter has to be the slice type
- `make`'s second parameter is the _length_
- `make`'s third and _optional_ parameter is the _capacity_ of the `slice`

Let's see it in action.

```
package main

import (
	"fmt"
)

func main() {
	x := make([]int, 5, 5)
	fmt.Println(x)
    // [0 0 0 0 0]
}
```

As you can see the slice length and capacity is five and will print five `0` values. What happens if we try to go over the slice capacity?

```
package main

import (
	"fmt"
)

func main() {
	x := make([]int, 5, 5)
    x[5] = 6
	fmt.Println(x)
    // [0 0 0 0 0]
}
```

Here, I am attempting to manually assign a value to the 5th indexed position of this slice. When I do I get this compile error:

`panic: runtime error: index out of range [5] with length 5`

Go not only prevents us from going off the rails with our code, but gives us precise control over our data.

## In Summary

There are so many more features of `slice` I want to discuss, and what's funny is, I have not even touched on `map` or `struct` yet. I like to keep these posts at a 5-10 minute read; therefore, my next entry will be more on `slice`, `map`, and `struct`. I am excited to share what I have learned with you. Until next time!
