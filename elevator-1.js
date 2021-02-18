class State {
    static RESET = 'reset'
    static CAR_OPEN_FLOOR_3 = 'car_door_open_floor_3'
    static CAR_OPEN_FLOOR_2 = 'car_door_open_floor_2'
    static CAR_OPEN_FLOOR_1 = 'car_door_open_floor_1'
    static CAR_MOVING_TO_3 = 'car_moving_to_3'
    static CAR_MOVING_TO_2 = 'car_moving_to_2'
    static CAR_MOVING_TO_1 = 'car_moving_to_1'
    static DOOR_OPEN_FLOOR_3 = 'floor_3_door_open'
    static DOOR_OPEN_FLOOR_2 = 'floor_2_door_open'
    static DOOR_OPEN_FLOOR_1 = 'floor_1_door_open'
}

export class Event {
// request to go to a particular floor
    static GO_3 = 'go_3'
    static GO_2 = 'go_2'
    static GO_1 = 'go_1'

// request to open outer door on particular floor
    static OPEN_1 = 'open-1'
    static OPEN_2 = 'open-2'
    static OPEN_3 = 'open-3'

// detected car has reached a particular floor
    static CAR_AT_3 = 'at_3'
    static CAR_AT_2 = 'at_2'
    static CAR_AT_1 = 'at_1'

// detected car door opened/closed
    static CAR_DOOR_CLOSED = 'closed-car'
    static CAR_DOOR_OPENED = 'opened-car'

// detected floor door opened/closed on particular floor
    static FLOOR_3_DOOR_CLOSED = 'closed_3'
    static FLOOR_2_DOOR_CLOSED = 'closed_2'
    static FLOOR_1_DOOR_CLOSED = 'closed_1'

    static FLOOR_3_DOOR_OPENED = 'opened_3'
    static FLOOR_2_DOOR_OPENED = 'opened_2'
    static FLOOR_1_DOOR_OPENED = 'opened_1'

}

// build an event dispatcher
// two dimensional array [state][event]
// of handler functions
class Builder {
    constructor() {
        this.graph = {}
        // this.state = ''
    }
    for(state) {
        this.graph[state] = this.graph[state] || {}
        this.state = state
        return this
    }
    on(event, handler) {
        if (this.graph[this.state][event]) {
            throw new Error('duplicate handler: state: ' + this.state + ' event: ' + event)
        }
        this.graph[this.state][event] = handler
        return this
    }
    build() {
        return this.graph
    }
}

const states = new Builder()
.for(State.RESET)
    .on(Event.CAR_DOOR_OPENED, (elevator, mechanism) => {
        elevator.state = State.CAR_OPEN_FLOOR_1
        elevator.go = 0
    })

.for(State.CAR_MOVING_TO_1)
    .on(Event.CAR_AT_1, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.CAR_DOOR_OPENED, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.CAR_OPEN_FLOOR_1
    })
.for(State.CAR_OPEN_FLOOR_1)
    .on(Event.OPEN_1, (elevator, mechanism) => {
        mechanism.openFloor1Door()
        elevator.state = State.DOOR_OPEN_FLOOR_1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 2
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 3
    })
    .on(Event.CAR_DOOR_CLOSED, (elevator, mechanism) => {
        if (elevator.go == 2) {
            elevator.state = State.CAR_MOVING_TO_2
            mechanism.carUp()
        }
        if (elevator.go == 3) {
            elevator.state = State.CAR_MOVING_TO_3
            mechanism.carUp()
        }
    })
.for(State.DOOR_OPEN_FLOOR_1)
    .on(Event.FLOOR_1_DOOR_CLOSED, (elevator, mechanism) => {
        if ([2, 3].includes(elevator.go)) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.CAR_OPEN_FLOOR_1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        elevator.go = 2
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        elevator.go = 3
    })

.for(State.CAR_MOVING_TO_2)
    .on(Event.CAR_AT_2, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.CAR_DOOR_OPENED, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.CAR_OPEN_FLOOR_2
    })
.for(State.CAR_OPEN_FLOOR_2)
    .on(Event.OPEN_2, (elevator, mechanism) => {
        mechanism.openFloor2Door()
        elevator.state = State.DOOR_OPEN_FLOOR_2
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 1
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 3
    })
    .on(Event.CAR_DOOR_CLOSED, (elevator, mechanism) => {
        if (elevator.go == 1) {
            elevator.state = State.CAR_MOVING_TO_1
            mechanism.carDown()
        }
        if (elevator.go == 3) {
            elevator.state = State.CAR_MOVING_TO_3
            mechanism.carUp()
        }
    })
.for(State.DOOR_OPEN_FLOOR_2)
    .on(Event.FLOOR_2_DOOR_CLOSED, (elevator, mechanism) => {
        if (elevator.go == 1 || elevator.go == 3) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.CAR_OPEN_FLOOR_2
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        elevator.go = 1
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        elevator.go = 3
    })

.for(State.CAR_MOVING_TO_3)
    .on(Event.CAR_AT_3, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.CAR_DOOR_OPENED, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.CAR_OPEN_FLOOR_3
    })
.for(State.CAR_OPEN_FLOOR_3)
    .on(Event.OPEN_3, (elevator, mechanism) => {
        mechanism.openFloor3Door()
        elevator.state = State.DOOR_OPEN_FLOOR_3
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 2
    })
    .on(Event.CAR_DOOR_CLOSED, (elevator, mechanism) => {
        if (elevator.go == 1) {
            elevator.state = State.CAR_MOVING_TO_1
            mechanism.carDown()
        }
        if (elevator.go == 2) {
            elevator.state = State.CAR_MOVING_TO_2
            mechanism.carDown()
        }
    })
.for(State.DOOR_OPEN_FLOOR_3)
    .on(Event.FLOOR_3_DOOR_CLOSED, (elevator, mechanism) => {
        if (elevator.go == 1 || elevator.go == 2) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.CAR_OPEN_FLOOR_3
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        elevator.go = 1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        elevator.go = 2
    })

.build()

// alternate DSL?
// floor(2).down(1).up(3)
// floor(3).down(1).down(2)

console.log(states)

export class Elevator {
    constructor(mechanism) {
        this.mechanism = mechanism
        mechanism.openCarDoor()
        this.state = State.RESET
    }
    set state(state) {
        console.log('enter state: ' + state)
        this._state = state
    }
    get state() {
        return this._state
    }
    set go(go) {
        console.log('enter extended state go: ' + go)
        $(this).trigger('request', [ go ])
        this._go = go
    }
    get go() {
        return this._go
    }
    event(event) {
        const unhandled_action = () => console.log('no handler: event: ' + event + ' for state: '+  this.state)
        const action = states[this.state][event] || unhandled_action
        action(this, this.mechanism)
    }
}
