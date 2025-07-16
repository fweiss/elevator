# elevator
A model elevator governed by a state machine in ES6 with web simulation

## Motivation
I thought I knew state machines pretty well from my EE background.
However, I wasn't doing so great for firmware interviews.
So... time to cram.

The three story building I live in has a simple elevator to model.
I found an interesting ES6 pattern to build a state machine without
a lot of pointless gory code.

## Code structure
The mechanism.js file constructs the elevator's
sensors and actuators.
This construction is decoupled from the implementation of the state machine.

The actuator.js file implements the basic component that comprises the
elevator mechanism.
It is implemented with jquery to accept button click events and to provide
animations via CSS.

The elevator.js file constructs a state machine that defines the elevator's
behavior. It consists of four parts:
- definitions of the states and events
- a simple builder for using a [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) to construct the state machine
- a fluent definition of the state dispatcher using the DSL
- an elevator class which realizes the state machine

The focus of this project was on the state dispatcher and its fluent DSL.
The intent was to make the representation the state machine easy to read
in code.
State machines can of course be constructed out of if-then-else trees.
But that turns into a bunch of spaghetti code that, for non-trivial
cases, is difficult to understand and maintain.
I chose to organize the DSL around states. That way it's easy
to see what events a state responds to and what the state transitions
do.

I used the following DSL pattern which I think is very fluent:
```
.for(state) // when in the given state
   .on(event, (elevator, mechanism) => { // and the given event occurs, perform:
       // event logic, if any
       // invoke action on the mechanism, possibly leading to future events
       // transition to another state
       // can also set an extended state (see below)
   }
```
> An extended state is useful to simplify the state machine. In this case
> I added the "go" extended state. This captures the user's selection of the 
> target floor, either from the call button on the floor or the floor button in the car.
> Although it adds branches in the event handlers (for instance when on floor 2, whether
> to move the car up or down), it avoids the need to clutter the state diagram with
> additional states.

The main.js file has an IIFE that uses jquery to wire up the 
graphical elements with the elevator state machine and the mechanism.

## Simulation
The index.html file runs a simple graphical simulation.
It consists of three floors and a car.
Each floor has a door and Call, Open, Close buttons.
The car has an inner door and three floor buttons.

[*Try it out.*](https://fweiss.github.io/sketch/elevator)

Have fun! And let me know if something doesn't seem to work right.

> Tips on running the simulation:
> - Click the numbered buttons in the car.
> - After the cars stops, click the "O" button. This opens the outer, "floor"
> door and keeps the car from being called to another floor,
>
> Try clicking another floor buttons while a particular floor door is open.
> The interlock prevents the car from moving, however the request is saved
> (note the button hightlight color.)
> When the floor door is closed, the car will move to the last requested floor.
