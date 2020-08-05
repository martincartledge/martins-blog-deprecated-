---
title: Concurrency in Go - Using Channels and Handling Race Conditions
date: "2020-08-05T22:40:32.169Z"
description: "Learning Go - Week 12"
---

This is the twelfth entry of my weekly series _Learning Go_. Last week I talked about [using Goroutines and WaitGroups](https://www.martincartledge.io/concurrency-in-go-goroutines-and-wait-groups/) to make use of concurrent patterns in Go. This week I will continue to expand on the topic of concurrency by showing you how to use a few more useful features of Go: _Channels and Mutex_. I will also walk you through how you can identify and fix potential race conditions in your code. Let's get to it!

## Channels

> a "pipe" that allows you to send and receive values in your concurrent Goroutines

Essentially, _Channels_ can be thought of as messengers that you can send to various Goroutines to deliver or retrieve values

- Channels block
- They are synchronized
- They have to pass or receive the value at the same time

Channels have two important pieces of syntax `<-` and `->`

When you want to send data _onto a Channel_ you use this syntax `channel <-`

When you want to retrieve data _from a Channel_ you use this syntax `<- channel`

Let me show you a quick example to see Channels in action

```go
package main

import (
	"fmt"
)

func main() {
	c := make(chan int)

	go func() {
		c <- 29
	}()

	fmt.Println(<-c)
}
```

Inside of our `func` `main` we use the short declaration operator to create a new variable with the identifier `c`. We use the `make` keyword to create a new `chan` which will be of type `int`

```go
c := make(chan int)
```

Next, we create an anonymous _Goroutine_. Inside of this _Goroutine_, using the `c <-` syntax we are sending the value `29` onto our `c` _channel_. We use the `()` to immediately run this _Goroutine_

```go
go func() {
	c <- 29
}()
```

We use the `<- c` syntax to get the value off of our channel and print the value of `c`. When we go, it should be no surprise that we get the value `29`. Cool! We have successfully sent data to a _channel_ and received a value from a _channel_.

```go
fmt.Println(<-c)
// 29
```

What if we want to limit the amount of data that can be sent onto a _Channel_ we create? Go makes this possible by using a feature called _Channel Buffering_

By default, _Channels_ are unbuffered, meaning that there is no limit to the amount of data that can be sent and stored on a _Channel_. As you can imagine, this could get out of hand fairly quickly. Whenever possible, it is always a good idea to use _Channel Buffering_.

Let me show you an example:

```go
package main

import (
	"fmt"
)

func main() {
	chat := make(chan string, 5)

	chat <- "Hey!"
	chat <- "How's it going?"
	chat <- "Doing well"
	chat <- "I started watching Dark"
	chat <- "It's so good"

	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)

	// Hey!
	// How's it going?
	// Doing well
	// I started watching Dark
	// It's so good
}
```

This should right be a surprise right? As you can see we have 5 messages sent to `chat` and have successfully used `fmt.Println()` to print out each entry. But what happens if we try to add another entry to `chat`?

But what happens if I try to add another `string` value to our _Channel_? Let's take a look:

```go
package main

import (
	"fmt"
)

func main() {
	chat := make(chan string, 5)

	chat <- "Hey!"
	chat <- "How's it going?"
	chat <- "Doing well"
	chat <- "I started watching Dark"
	chat <- "It's so good"
	// added message
	chat <- "No spoilers please!"

	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)
	fmt.Println(<- chat)
	// added log
	fmt.Println(<- chat)

	// Hey!
	// How's it going?
	// Doing well
	// I started watching Dark
	// It's so good
}
```

This is the same code, except for this time we are trying to add `No spoilers please!` onto our `chat` _Channel_. Go does not like this. When we try to run our application, Go gives us this error:

```go
fatal error: all goroutines are asleep - deadlock!
```

Although errors are commonly looked to as nuisances, Go thoughtfully introduces them to help you prevent unwanted side effects in your application.

## Directional Channels

When you start to use _Channels_, you quickly realize how helpful creating _Channels_ that can only receive values or only send values. Go bakes in this feature into the `chan` type, let me show you a few examples:

```go
package main

import (
	"fmt"
)

func main() {
	c := make(chan <- int, 1)
	c <- 29
	fmt.Println(<-c)

	fmt.Printf("%T\n", c)
}
```

Inside of `func` `main` we create a new variable with the identifier `c` which is of type `chan` which will contain values of type `int`

Notice we make `c` a _buffered channel_ by passing the value `1` as the second argument to `make`. In this case, our _buffered channel_ can only contain one value.

```go
c := make(chan <- int, 1)
```

Next, we send the value `29` onto our `c` Channel

```go
c <- 29
```

This seems pretty straight forward, doesn't it? When `fmt.Println(<-c)` is executed we should expect the value `29` to be printed, right? Nope. This is _Directional Channels_ doing their job. Remember when we created our `c` Channel? We explicitly told Go that this `c` Channel would only be a _sending_ Channel when we used this syntax `chan <- int`

```go
fmt.Println(<-c)
```

When we attempt to run this code, Go stops us and gives us a very informative error message

```go
invalid operation: <-c (receive from send-only type chan<- int)
```

Let me show you another example of using a _Directional Channel_

```go
package main

import (
	"fmt"
)

func main() {
	c := make(<-chan int, 1)
	c <- 29
	fmt.Println(c)
}
```

In this example we create a new variable with the identifier `c` which is of type `chan` which will contain values of type `int`; however, in this case, we are creating a _Directional Channel_ that can only receive values

```go
c := make(<-chan int, 1)
```

Now, when we try to send the value `29` onto the `c` Channel, we get this error message

```go
c <- 29
invalid operation: c <- 29 (send to receive-only type <-chan int)
```

_Directional Channels_ can play an important role in organizing your code. Now, you can explicitly create a _Sending Channel_ and a `Receiving Channel`. If you add the peace of mind of making both of these Channels _buffered_, then you will gain a lot of predictability in your code.

Let me show you a more in-depth example of using _buffered, directional channels_

```go
package main

import (
	"fmt"
)

func main() {
	c := make(chan int, 1)

	send(c)

	receive(c)

}

func send(c chan<- int) {
	c <- 29
}

func receive(c <-chan int) {
	fmt.Println(<-c)
}
```

In this example we use a _buffered channel_ and we create two functions: one that sends a value onto our _channel_ and one that receives a value from our _channel_

First things first. We create a new variable with the identifier `c` which is of type `chan` which will contain values of type `int`. the `1` argument in our `make` function makes `c` a _buffered channel_

```go
c := make(chan int, 1)
```

Next, we call a function with the identifier `send` and we pass our `c` _channel_ as the only argument, we do the same for a function with the identifier `receive`

```go
send(c)

receive(c)
```

We create a function with the identifier `send` that has a single argument that is a `*sending channel*` (_channel_ that you can only send values to). This _channel_ will contain values of type `int`. Inside of this function we _send_ the value 29 onto our `c` _channel_

```go
func send(c chan<- int) {
	c <- 29
}
```

We create a function with the identifier `receive` that has a single argument that is a `*receiving channel*` (_channel_ that you can only receive values from). This _channel_ will contain values of type `int`. Inside of this function we _receive_ the value 29 onto our `c` _channel_ and print that value using the `fmt` package

```go
func receive(c <-chan int) {
	fmt.Println(<-c)
}
```

## Mutex and Race conditions

So, we have learned about sending and receiving data across _Channels_, but what happens if multiple _Goroutines_ need to access a shared piece of state? The reliability of our state can be compromised very easily, we do not want that.

Let me show you an example of when multiple _Goroutines_ using a shared piece of state can provide unwanted results

```go
package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {
	counter := 0

	const gs = 5
	var wg sync.WaitGroup
	wg.Add(gs)

	for i := 0; i < gs; i++ {
		go func() {
			v := counter
			runtime.Gosched()
			v++
			counter = v
			fmt.Println("count:", counter)
			// count: 1
			// count: 1
			// count: 1
			// count: 1
			// count: 1
			wg.Done()
		}()
	}
	wg.Wait()
}
```

> Note: For the sake of this example, I am going to be using the [runtime](https://golang.org/pkg/runtime/) package to make use of the [`Gosched()`](https://golang.org/pkg/runtime/#Gosched) method. This method will allow me to fire off a new _Goroutine_.

I want to make sure that I am importing the packages I am going to make use of; therefore, I import `fmt`, `runtime`, and the `sync` package

Inside of `func` `main`, we declare a new variable with the identifier `counter` that is assigned to the value `0`

```go
counter := 0
```

Next, I create a variable with the identifier `gs` (this stands for _Go Schedule_, I will cover this shortly) that is assigned to the value `5`

```go
const gs = 5
```

I create a variable with the identifier `wg` and assign it the value of a new _WaitGroup_

```go
var wg sync.WaitGroup
```

I am going to use the value of `gs` to iterate; therefore, I want to make sure that I `Add` `5` _WaitGroups_

```go
wg.Add(gs)
```

Next, we create a `for` loop that will use the value of `gs` in the `condition statement`. Inside of this `for` loop we create an anonymous _Goroutine_ and immediately invoke the _Goroutine_.

Inside of our anonymous _Goroutine_ we declare a new variable with the identifier `v` and assigned the value of `counter`

We use the `runtime` package to invoke the `Gosched()` method, thus firing a new _Goroutine_

On the next line, we increment our `v` variable and assign the `counter` variable to the `v` variable

We use the `fmt` package to print out the value of `counter` and use the `wg` variable to call the `Done()` method which will let the Go runtime know that our `WaitGroup` is complete

```go
for i := 0; i < gs; i++ {
	go func() {
		v := counter
		runtime.Gosched()
		v++
		counter = v
		fmt.Println("count:", counter)
		wg.Done()
	}()
}
```

We repeat this process 5 times total

Outside of the `for` loop, we call the `Wait()` method that we access from the `wg` variable. The `Wait()` method prevents our `main` function from exiting

```go
wg.Wait()
```

Once our _WaitGroups_ are all complete our `main` function exits

Did you notice what our `for` loop prints for the value of `counter`? Currently, the value is `1` each iteration. Why is that?

```go
// count: 1
// count: 1
// count: 1
// count: 1
// count: 1
```

Currently, we are immediately invoking 5 _Goroutines_ and not telling the Go runtime what to do with them; therefore, they are running, accessing, and updating our `counter` state at random. There is no way to predict the order of these _Goroutines_. There is a way to fix this though!

The concept of only wanting a single _Goroutine_ to access a piece of state at a time, thus avoiding conflicts is called _Mutual Exclusion_. The traditional name for the data structure that shares this methodology is called a _Mutex_

The `sync` package, provided by the Go standard library, offers us `sync.Mutex` with two important methods: `Lock` and `Unlock`

Let me show you an example of using `Mutex`

```go
package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {

	counter := 0

	const gs = 5
	var wg sync.WaitGroup
	wg.Add(gs)

	var mu sync.Mutex

	for i := 0; i < gs; i++ {
		go func() {
			mu.Lock()
			v := counter
			runtime.Gosched()
			v++
			counter = v
			fmt.Println("count:", counter)
			// count: 1
			// count: 2
			// count: 3
			// count: 4
			// count: 5
			mu.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
}
```

The code above is the same except for in a few places. Let me illuminate the differences in our code while using a _Mutex_

In order for us to use a _Mutex_, we create a new variable with the identifier `mu` that has a value of a `Mutex` which we get from the `sync` package

```go
var mu sync.Mutex
```

On the first line inside of our anonymous _Goroutine_ we use our `mu` variable to call the `Lock()` method. This method ensures exclusive access to our state. Once we are done updating our state, we call the `Unlock` method which is also supplied from our `mu` variable

```go
go func() {
	mu.Lock()
	v := counter
	runtime.Gosched()
	v++
	counter = v
	fmt.Println("count:", counter)
	mu.Unlock()
	wg.Done()
}()
```

Now we can see that our `counter` logs look a lot more like what we would expect

```go
// count: 1
// count: 2
// count: 3
// count: 4
// count: 5
```

## In Summary

Pretty cool huh? We now understand what a _Channel_, _Buffered Channel_, and a _Directional Channel_ is and how to use them effectively. We also learned about _Mutexes_ and how we can make great use of them in our Go programs to ensure that we never contaminate our state and create any race conditions.

This concludes my _Learning Go_ series. I hope you have enjoyed reading! Although this is the end of this series, you can expect many more posts on Go in the future! In the meantime, consider [subscribing to my newsletter](https://www.martincartledge.io/) where I announce new posts and helpful tools and tips in the software industry. I occasionally throw in a picture or two of my Golden Retrievers as well. 👋🏻
