# elevator
A model elevator governed by a state machine in ES6 with web simulation

## Motivation
I thought I know state machines pretty well from my EE background.
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
- a simple builder for using a DSL to construct the state machine
- a fluent definition of the state dispatcher
- an elevator class which realizes the state machine

The focus of this project was on the state dispatcher.
The intent was to make a fluent representation of the state machine
in code.
State machines can of course be constructed out of if-then-else trees.
But that turns into a bunch of spaghetti code that, for non-trivial
cases, is difficult to understand and maintain.
I chose to organize the DSL around states. That way it's easy
to see what events a state responds to and what the state transitions
do.

The main.js file has an IIFE that uses jquery to wire up the 
graphical elements with the elevator state machine and the mechanism.

## Simulation
The index.html file runs a simple graphical simulation.
It consists of three floors and a car.
Each floor has a door and Call, Open, Close buttons.
The car has an inner door and three floor buttons.

[*Try it out.*](https://fweiss.github.io/sketch/elevator)

Have fun! And let me know if something doesn't seem to work right.