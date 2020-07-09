---
title: Control flow and Common Control Structures in Go
date: "2020-04-04T22:40:32.169Z"
description: "Learning Go - Week 2 - Control flow and Common Control Structures"
thumbnail: './waterfall.jpeg'
---

This is the second entry of my weekly series _Learning Go_. Last week I discussed the history of Go, its thought foundations, variables, and types. This week I dove into _fairly_ familiar territory. A lot of concepts came to me quickly due to my background in JavaScript; however, it was really cool to dig into the differences in how these concepts are implemented in another language. Let's get to it.

## Control Flow, what's that?

> the order in which individual statements, instructions, or function calls an imperative program are executed or evaluate

I felt like I understood the concept of something like _control flow_ prior to learning about its place in computer science; however, understanding its meaning paired with _control structures_ enabled me to envision how my code is executed with much more clarity.

Essentially, this is the concept we use to determine how our code will be interpreted and ran. Control flow is broken down into three _control structures_:

- Sequential
- Iterative
- Conditional

## Loops

> a sequence of instructions that are continually repeated until a specified condition is met

Whether you have been programming for 10 months or 10 years, chances are you have probably used loops quite often. I will not spend much time going into the mechanics of how loops work, but I do want to address the fundamentals of them. You can break down what I call the _three pillars_ of a loop fairly simply. These three pillars are an _init statement_, _condition statement_, and a _post statement_. Of course, we have code that is run in the loop body _as long as the condition statement is `true` after an iteration_.

```
for init statement; condition statement; post statement {
    // code that is executed in each iteration of the loop
}
```

> Important Note: There are no while loops in go.

## the "for" keyword

> specifies a repeated execution of a block of code

When using the `for` keyword, you are creating what is called a _for statement_. There are three forms to control iteration using a for statement:

- a single condition
- a "for" clause
- a "range"clause

#### _Single Condition_

In a single condition statement the condition after the _for_ keyword is evaluated before an execution is ran. In order for the code to be executed, the condition must be evaluated as `true`.

```go
for 1 < 2 {
    // run code
}
```

#### _"for" clause_

This is what most would find as the _traditional_ for loop they use. In this use of the _for_ keyword, we use the _three pillars_ of a loop: init statement, condition statement, and a post statement.

```go
package main
import (
    "fmt"
)
func main() {
    for i := 0; i <= 3; i++ {
        fmt.Println(i)
    }
    // 0
    // 1
    // 2
    // 3
}
```

#### _"range" clause_

A range clause is used to iterate though all entries of a slice, array, string, map, or values received from a channel (we will dive into channels in a later entry). I will demonstrate using a `slice` type - we will dive deeper into this type later.

```go
package main
import (
    "fmt"
)
func main() {
    s := []int{1, 2, 3, 4, 5}
    for i, v := range s {
        fmt.Println(i, v)
    }
    // 0      1
    // 1      2
    // 2      3
    // 3      4
    // 4      5
    // index  value
}
```

What is happening up there?

- we assign the variable `s` to the type `slice`, that `slice` will contain values of the type `int`, those values are `1, 2, 3, 4, 5`
- when using a `range` clause we `init` two values: the `index` and the `value` - `i` and `v` here
- in each iteration of this loop `i` (position in the array) will increment by `1` , `v` will reflect the `value` in the specified `index` of the `slice`

> Important Note: Slices and Arrays are zero indexed - meaning the value of `index` will always start from `0`, not `1`

## Break statements

> stops (terminates) execution of the innermost `for`, `switch`, or `select` statement

I like to think of _break statements_ like an escape hatch for your code. If there is a condition in which you do not want to continue to iterate, a `break` statement is the best way to stop execution and move to the next piece of executable code.

A quick example:

```go
package main
import (
   "fmt"
)
func main() {
    n := 0
    for {
        n++
        if n > 5 {
            break
        }
        fmt.Println(n)
    }
}
```

Let me walk you through what is happening here:

- inside of the `main` function we declare the variable `n` and assign it to the value `0`
- we use the `for` keyword to create a loop
- inside of the loop we use the `++` operator to increment `n` by 1
- using an `if` statement, we evaluate if the value of `n` is great than `5`
- using the `fmt` package from the `Standard Library` from go, we print the current value of `n`
- we iterate `5 times` until `n`'s value is greater than 5  -  then we use the `break` keyword and the execution is finished

## Continue statements

> beings the next iteration of the innermost for loop at its post statement

I mentioned earlier that go does not have a _while_ loop  -  I have found that using the `continue` statement inside of a `for` loop can render the same results

```go
package main
import (
    "fmt"
)
func main() {
    n := 1
    for {
        z++
        if n > 10 {
            break
        }
        if n%2 != 0 {
            continue
        }
        fmt.Println(n)
        // 2
        // 4
        // 6
        // 8
        // 10
    }
}
```

In the example above I am trying to `find all numbers evenly divisible by 2`, let me walk you through how I am doing that using the `break` and `continue` statements:

- inside of the `main` function we declare a variable `n` and assign it to the value `1`
- we use the `for` keyword to create a loop
- inside of the loop we use the `++` operator to increment `n` by 1
- using an `if` statement, we evaluate if the value of `n` is great than `10` , this evaluates to `false` for the first `10` iterations
- next, each iteration will evaluate if the value of `n` is _*not*_ _evenly_ divisible by 2, we can determine this by using the `modulo` operator
- the values that are less than 10 _and_ not evenly divisible by 2 do not step inside either `if` statement
- using the `fmt` package from the `Standard Library` from go, we print the current value of `n`
- note: _only numbers evenly divisible by 2 be printed _ -  this is because their values do not evaluate to `true` for either `if` statement

## Conditional statements

> specifies the condition execution of two or more branches according to the value of a boolean expression

Conditional statements are a great way of allowing your code to have different paths of execution, depending on the outcome you desire.

A few examples of _conditional statements_ are:

- If-then-else statements
- Else-if statements

#### if/else

```go
package main
import (
    "fmt"
)
func main() {
    x := 1
    if x == 2 {
        fmt.Println("equal")
    } else {
        fmt.Println("not equal")
    }
}
```

A fairly straight forward example. Inside of the `main` function we declare a variable with the value of `1`. Next, we evaluate if the value of `x` is equal to 2. It is not; therefore, we are taken to the `else` statement. The `else` statement is essentially a `default` statement that executes code in times that the `if` statement evaluates to `false`.

> Important Note: coming from JavaScript I am used to using the `===` operator to evaluate strict type and value comparisons, as you can see in go the operator looks like this `==`.

#### else if

```go
package main
import (
    "fmt"
)
func main() {
    x := 1
    if x == 2 {
        fmt.Println("equal to 2")
    } else if x == 3 {
        fmt.Println("equal to 3")
    } else {
        fmt.Println("not equal")
    }
}
```

The only difference here is that we are adding an additional `branch` that can be executed if it is evaluated to `true`. Instead of two branches (as seen in the last example), we now have three. This allows you to add some dynamic aspects to your function.

_*All*_ `if` statements need to start with an if branch and must have an `else` branch to serve as a `default`; however, between those branches you are free to add as many `else if` branches as you please. Although adding multiple is not advisable in most cases due to code readability and potentially performance.

## Switch statements

> provides multi-way execution. an expression or type specifier is compared to each _case_ inside of the _switch_ statement

- switch statements must have a _default_ case
- if no expression is found for a case, it's value is `true`
- each _case_ is compared to the value of the switch expression

```go
package main
import (
    "fmt"
)
func main() {
    switch {
    case false:
        fmt.Println("this will not print")
    case (2 == 4):
        fmt.Println("this is not true")
    case (4 == 5):
        fmt.Println("not true either")
    default:
        fmt.Println("default case")
    }
}
```

Above you can see we are creating a _switch_ statement that contains three _case statements_, and they all evaluate to `false`; therefore, the `default` case is executed.

You can also create switch statements using a _literal value_ or using a _variable_.

Here we use a literal value:

```go
package main
import (
    "fmt"
)
func main() {
    switch "Yoda" {
    case "Obi Wan":
        fmt.Println("you don't need to see his identification")
    case "Darth Vader":
        fmt.Println("I am your father")
    default:
        fmt.Println("the chosen one, found I have not")
    }
}
```

Here we use a variable with a single case:

```go
package main
import (
    "fmt"
)
func main() {
    y := "Yoda"
    switch y {
    case "Luke Skywalker":
        fmt.Println("your father he is")
    case "Quigon Jinn":
        fmt.Println("clouded this boys future is")
    default:
        fmt.Println("There is another skywalker")
    }
}
```

Here we use a variable with multiple cases:

```go
package main
import (
    "fmt"
)
func main() {
    y := "Yoda"
    switch y {
    case "Darth Maul", "Palpatine", "Mace Windu":
        fmt.Println("wars make not one great")
    case "Quigon Jinn":
        fmt.Println("always two there are, no more no less")
    default:
        fmt.Println("when 900 years old you reach, look as good you will not")
    }
}
```

## In summary

This week was a great refresher on how the mechanics of how loops, the `for` keyword, and conditional statements work. There is always so much more you can learn about them as well. I look forward to using these more thoughtfully in the future. Next week I will be diving into common data types in go. See you then!
