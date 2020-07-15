---
title: Pointers, JSON Marshal and Unmarshal in Go
date: "2020-07-15T22:40:32.169Z"
description: "Learning Go - Week 9 - Pointers, JSON Marshal and Unmarshal in Go"
---

This is the ninth entry of my weekly series _Learning Go_. Last week I covered [_How to Write a Recursive Function in Go_](https://www.martincartledge.io/how-to-write-a-recursive-function-in-go/). This week I am going to talk about _Pointers, JSON Marshal and Unmarshal_.

## Pointers

Although I have heard of _pointers_ in the past, due to coming from JavaScript, this was a completely new territory for me. To define a _pointer_ as simply as I can, a _pointer_:

> "points" to a location in memory where a value is stored

Sounds fairly semantic, right? I have a feeling most would infer this from the word itself; however, there is much more to what a _pointer_ is. Before I jump into using a _pointer_ in Go, let me explain a few important pieces of _pointer_ syntax in Go.

In Go, there are two operators you need to remember when working with _pointers_:

`&` <--- this operator generates an address of the value in memory (generates a _pointer_)

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

We have created our first _pointer_!

Let's walk through what is happening here, step-by-step:

```go
name := "martin"
```

inside of `func` `main` we declare a variable with the identifier `name` with a value of `martin` of type `string`

```go
fmt.Println(&name)
// 0xc000010200
```

next, using the `fmt` package, we print out the _address_ of the value in memory for `name`

this outputs the following address: `0xc000010200`

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

```go
name := "martin"
```

first, we declare a new variable with an identifier of `name` with a value of `martin` of type `string`

```go
namePointer := &name
```

next, we declare a new variable with an identifier of `namePointer` with a value of a _pointer_ to the `name` variable

when we print out the value of `namePointer` on the next line, we receive this address `0xc000010200`

```go
underlyingValue := *namePointer
```

next, we declare a new variable with an identifier of `underlyingValue`, notice we are using the `*` operator, this allows us to get the _underlying value_ of a _pointer_ value; therefore, the value of `underlyingValue` is the _underlying value_ of `namePointer`

```go
fmt.Println("underlyingValue: ", underlyingValue)
// underlyingValue:  martin
```

we print out the value of `underlyingValue` on the next line and we see that it's value is `martin`

Pretty cool, huh?

_Pointers_ allow us to store references to data at a low level, their address in memory.

## JSON

JSON (_JavaScript Object Notation_) is a widely used format for sending and receiving data in a wide variety of applications. In Go, it is common practice to use two methods when sending JSON and receiving JSON, `Marshal` and `Unmarshal`.

Like most things in the Go ecosystem, these functions are named very semantically. Let's look at what the definition of `Marshal` and `Unmarshal`.

> Marshal - the process of transforming memory representation of an object to a data format for storage or transmission. This is typically used when data must be moved between different parts of an application.

Essentially, when you use the `Marshal` function on data, commonly referred to as _Marshalling_, you are transforming your data into a format that is better suited for storage or for being transmitted to somewhere else in your application.

> Unmarshal - the process of transforming a representation of an object that was used for storage or transmission to a representation of the object that is executable

Since it is common practice to `Marshal` your JSON data, you can use the `Unmarshal` function to transform this data into an executable format (a format you can use in your application).

You can read more about Marshalling and Unmarshalling [here](<https://en.wikipedia.org/wiki/Marshalling_(computer_science)>).

Let me show you a few examples of using `Marshal` and `Unmarshal`.

`Marshal`

```go
package main

import (
	"encoding/json"
	"fmt"
)

type person struct {
	First string
	Last string
	Age int
}

func main() {
	me := person{
		First: "martin",
		Last: "cartledge",
		Age: 29,
	}

	bff := person{
		First: "mikel",
		Last: "howarth",
		Age: 29,
	}

	friends := []person{me, bff}

	fmt.Println(friends)
	// [{martin cartledge 29} {mikel howarth 29}]

	res, err := json.Marshal(friends)

	// Note: json.Marshal converts your JSON to a string of bytes

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(res)
	// [91 123 34 70 105 114 115 116 34 58 34 109 97 114 116 105 110 34 44 34 76 97 115 116 34 58 34 99 97 114 116 108 101 100 103 101 34 44 34 65 103 101 34 58 50 57 125 44 123 34 70 105 114 115 116 34 58 34 109 105 107 101 108 34 44 34 76 97 115 116 34 58 34 104 111 119 97 114 116 104 34 44 34 65 103 101 34 58 50 57 125 93]

}
```

Let me walk you through what is happening here:

```go
import (
	"encoding/json"
	"fmt"
)
```

Inside of `package` `main` we are now importing the `encoding/json` package, this allows us to use the `json` package

```go
type person struct {
	First string
	Last  string
	Age   int
}
```

Next, we create our own type with the identifier `person` of type `struct`

```go
me := person{
	First: "martin",
	Last: "cartledge",
	Age: 29,
}
```

We give our `person` type three fields: `First` of type `string`, `Last` of type `String`, and `Age` of type `int`

Inside of our `func` `main`, using the short declaration operator, we create a new variable with the identifier `me`

To assign a value to `me`, we use a _composite literal_ of type `person`

Inside of our _composite literal_ we assign values to each respective field in our `person` type: `First` -> `martin`, `Last` -> `cartledge`, and `Age` -> `29`

```go
bff := person{
	First: "mikel",
	Last: "howarth",
	Age: 29,
}
```

Next, we create another variable using the short declaration operator with the identifier `bff`

The value of `bff` is also of type `person`

The values assigned for each respective field for our `person` type inside of this _composite literal_ is: `First` -> `mikel`, `Last` -> `howarth`, and `Age` -> `29`

```go
friends := []person{me, bff}
```

Next, we create a new variable using the short declaration operator with the identifier `friends`

The value of `friends` will be a `slice` of type `person`, we pass the values of `me` and `bff` into our _composite literal_

```go
fmt.Println(friends)
// [{martin cartledge 29} {mikel howarth 29}]
```

using the `fmt` package, we print the value of `friends`

> Quick Note: there are two return values when `json.Marshal` is invoked:
>
> 1 ) a _result_
>
> 2 ) an _error_
>
> _result_ is a `slice` of type `byte` (`[]byte`)
>
> _error_ is an `error`

```go
res, err := json.Marshal(friends)
```

For this example, I gave the _result_ the identifier `res`, and the _error_ the identifier `err`

I pass in `friends` as the single argument to `json.Marshal()`, keep in mind that `friends` is a `slice` of type `person`

> Quick Note: checking for errors immediately after using Marshal or Unmarshal is considered best practice, this prevents any errors or inconsistencies in your data from trickling into your code

```go
if err != nil {
	fmt.Println(err)
}
```

Next, we check if the value of `err` _is not_ `nil`, if this evaluates to `true` we step inside of this if statement and our error handling code is ran

For this example, we have no errors so the execution of our code continues

```go
fmt.Println(res)
```

The last line in `func` `main` uses the `fmt` package and logs the value of `res`, our newly marshaled data

This is the value of `res` post-marshal:

```go
[91 123 34 70 105 114 115 116 34 58 34 109 97 114 116 105 110 34 44 34 76 97 115 116 34 58 34 99 97 114 116 108 101 100 103 101 34 44 34 65 103 101 34 58 50 57 125 44 123 34 70 105 114 115 116 34 58 34 109 105 107 101 108 34 44 34 76 97 115 116 34 58 34 104 111 119 97 114 116 104 34 44 34 65 103 101 34 58 50 57 125 93]
```

As you can see, we have a `slice` of values of type `byte`, pretty cool!

`Unmarshal`

```go
package main

import (
	"encoding/json"
	"fmt"
)

type person struct {
	First string
	Last string
	Age int
}

func main() {
	rawData := `[{"First":"martin","Last":"cartledge","Age":29},{"First":"mikel","Last":"howarth","Age":29}]`

	fmt.Println(rawData)

	byteString := []byte(rawData)

	fmt.Println(byteString)

	// people := []person{}
	var people []person

	err := json.Unmarshal(byteString, &people)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(people)

	for i, v := range people {
		fmt.Println("index: \n", i)
		fmt.Println(v.First, v.Last, v.Age)
	}
}
```

Let me walk you through what is happening here:

```go
import (
	"encoding/json"
	"fmt"
)
```

You will notice that we are importing the `encoding/json` package just like we did in our previous example, we need the `json` package to use `Marshal` and `Unmarshal`

```go
type person struct {
	First string
	Last  string
	Age   int
}
```

We are also creating a new custom type with the identifier `person` with three fields: `First` of type `string`, `Last` of type `string`, and `Age` of type `int`

```go
rawData := `[{"First":"martin","Last":"cartledge","Age":29},{"First":"mikel","Last":"howarth","Age":29}]`
```

Using the short declaration operator, I created a new variable with the identifier `rawData` and assigned it to a `slice` of `person` values represented in a JSON string

```go
fmt.Println(rawData)
// [{"First":"martin","Last":"cartledge","Age":29},{"First":"mikel","Last":"howarth","Age":29}]
```

On the next line, using the `fmt` package, we print out the value of `rawData`

```go
byteString := []byte(rawData)
```

Next, using the short declaration operator, we declare a new variable with the identifier `byteString`, any idea of what we might be doing next?

That's right, we are setting the value of `byteString` to a `slice` of values of type `byte`. This line is complete once we pass the `rawData` value into our _composite literal_

```go
[91 123 34 70 105 114 115 116 34 58 34 109 97 114 116 105 110 34 44 34 76 97 115 116 34 58 34 99 97 114 116 108 101 100 103 101 34 44 34 65 103 101 34 58 50 57 125 44 123 34 70 105 114 115 116 34 58 34 109 105 107 101 108 34 44 34 76 97 115 116 34 58 34 104 111 119 97 114 116 104 34 44 34 65 103 101 34 58 50 57 125 93]
```

Using the `fmt` package, we print out the value of `byteString`

```go
var people []person
```

Using the `var` keyword, we create a new variable with the identifier `people` that will be a `slice` of values of type `person` (our custom type we created)

```go
err := json.Unmarshal(byteString, &people)
```

This is where it gets interesting. Notice that we are assigning only one return value? That is because `json.Unmarshal()` takes two arguments, the _value_ you would like to _Unmarshal_ or _decode_, and a _pointer_ (address in memory) of the variable you would like to assign the _Unmarshalled_ data to.

```go
if err != nil {
		fmt.Println(err)
}
```

Following common convention, next, we immediately check for an error, if we have one we print that error out

> Note: depending on your application and the actions you take after you Unmarshal, you might want to stop all execution. I will talk about this in the future post

```go
[{martin cartledge 29} {mikel howarth 29}]
```

Using the `fmt` package, we print out the value of `people`. Look at that! Our data is in the same shape as how we started, very cool.

For the sake of using our custom type `person` to the fullest, I want to iterate over our newly _Unmarshalled_ data and print out their values

```go
for i, v := range people {
		fmt.Println("index: ", i)
		fmt.Println("First: ", v.First, "Last: ", v.Last, "Age: ", v.Age)
}
```

Above, we are using the `for` keyword to create a `for` statement

This `for` loop will return two values, an `index` and a `value` for each iteration, we assign these values to the variables `i` and `v` respectively

Inside of the `for` loop, using the `fmt` package, we print out the value of `i` (`index`), on the next line we print out the value of each field in our `person` type: `First`, `Last`, and `Age`

```go
index:  0
First: martin Last: cartledge Age: 29
index:  1
First: mikel Last: howarth Age: 29
```

Above is our result, pretty cool huh?

## In Summary

Go makes creating and reading memory addresses (`Pointers`), encoding data (`json.Marshal`), and decoding data (`json.Unmarshal`) a painless endeavor. Passing data throughout your application is made easier and more performant with the help of these features of the Go programming language. I hope you enjoyed learning about these features, and if you were already familiar with them, I hope you walked away learning something new about them. Next week I will be talking about _Sorting Data in Go_. See you then, and thanks for reading!
