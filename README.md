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
The mechanism.js file constructs an abstraction for the elevator's
sensors and actuators

The elevator.js file constructs a state machine that defines the elevator's
behavior. It consists of four parts:
- definitions of the states and events
- a simple builder for using a DSL to construct the state machine
- a fluent definition of the state dispatcher
- an elevator class which realizes the state machine

The focus was on the dispatcher, "states", to make it fluent.
State machines can of course be constructed out of if-then-else trees.
But that turns into a bunch of spaghetti code that, for non-trivial
cases, is difficult to understand and maintain.
I chose to organize the DSL around states. That way it's easy
to see what events a state responds to and what the state transitions
do.

The main.js file has an IIFE that uses jquery to wire up the 
graphical elements with the elevator FSM and the mechanism.

## Simulation
The index.html file runs a simple graphical simulation.
It consists of three floors and a car.
Each floor has a door and Call, Open, Close buttons.
The car has an inner door and three floor buttons.

Have fun! And let me know if something doesn't seem to work right.