class State {
    static RESET = 'reset'
    static OPEN_3 = 'open_3'
    static OPEN_2 = 'open_2'
    static OPEN_1 = 'open_1'
    static CLOSE_3 = 'close_3'
    static CLOSE_2 = 'close_2'
    static CLOSE_1 = 'close_1'
    static FLOOR_3 = 'floor_3'
    static FLOOR_2 = 'floor_2'
    static FLOOR_1 = 'floor_1'
    static READY_1 = 'ready-1'
    static READY_2 = 'ready-2'
    static READY_3 = 'ready-3'
}

export class Event {
    // request to go to a particular floor
    static GO_3 = 'go_3'
    static GO_2 = 'go_2'
    static GO_1 = 'go_1'

// @deprecated, decided no separate floor/car events needed
    static CALL_3 = 'call_3'
    static CALL_2 = 'call_2'
    static CALL_1 = 'call_1'

// request to open outer door on particular floor
    static OPEN_1 = 'open-1'
    static OPEN_2 = 'open-2'
    static OPEN_3 = 'open-3'

// detected car has reached a particular floor
    static AT_3 = 'at_3'
    static AT_2 = 'at_2'
    static AT_1 = 'at_1'

// detected car door opened/closed
    static CLOSED_CAR = 'closed-car'
    static OPENED_CAR = 'opened-car'

// detected floor door opened/closed on particular floor
    static CLOSED_3 = 'closed_3'
    static CLOSED_2 = 'closed_2'
    static CLOSED_1 = 'closed_1'

    static OPENED_3 = 'opened_3'
    static OPENED_2 = 'opened_2'
    static OPENED_1 = 'opened_1'

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
    .on(Event.OPENED_CAR, (elevator, mechanism) => {
        elevator.state = State.OPEN_1
        elevator.go = 0
    })

.for(State.CLOSE_1)
    .on(Event.AT_1, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.OPENED_CAR, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.OPEN_1
    })
.for(State.OPEN_1)
    .on(Event.OPEN_1, (elevator, mechanism) => {
        mechanism.openFloor1Door()
        elevator.state = State.FLOOR_1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 2
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 3
    })
    .on(Event.CLOSED_CAR, (elevator, mechanism) => {
        if (elevator.go == 2) {
            elevator.state = State.CLOSE_2
            mechanism.carUp()
        }
        if (elevator.go == 3) {
            elevator.state = State.CLOSE_3
            mechanism.carUp()
        }
    })
.for(State.FLOOR_1)
    .on(Event.CLOSED_1, (elevator, mechanism) => {
        // if (elevator.go = 2 || elevator.go == 3) {
        if ([2, 3].includes(elevator.go)) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.OPEN_1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        elevator.go = 2
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        elevator.go = 3
    })

.for(State.CLOSE_2)
    .on(Event.AT_2, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.OPENED_CAR, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.OPEN_2
    })
.for(State.OPEN_2)
    .on(Event.OPEN_2, (elevator, mechanism) => {
        mechanism.openFloor2Door()
        elevator.state = State.FLOOR_2
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 1
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 3
    })
    .on(Event.CLOSED_CAR, (elevator, mechanism) => {
        if (elevator.go == 1) {
            elevator.state = State.CLOSE_1
            mechanism.carDown()
        }
        if (elevator.go == 3) {
            elevator.state = State.CLOSE_3
            mechanism.carUp()
        }
    })
.for(State.FLOOR_2)
    .on(Event.CLOSED_2, (elevator, mechanism) => {
        if (elevator.go == 1 || elevator.go == 3) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.OPEN_2
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        elevator.go = 1
    })
    .on(Event.GO_3, (elevator, mechanism) => {
        elevator.go = 3
    })

.for(State.CLOSE_3)
    .on(Event.AT_3, (elevator, mechanism) => {
        elevator.go = 0
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(Event.OPENED_CAR, (elevator, mechanism) => {
        elevator.wait = 1
        elevator.state = State.OPEN_3
    })
.for(State.OPEN_3)
    .on(Event.OPEN_3, (elevator, mechanism) => {
        mechanism.openFloor3Door()
        elevator.state = State.FLOOR_3
    })
    .on(Event.GO_1, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 1
    })
    .on(Event.GO_2, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.go = 2
    })
    .on(Event.CLOSED_CAR, (elevator, mechanism) => {
        if (elevator.go == 1) {
            elevator.state = State.CLOSE_1
            mechanism.carDown()
        }
        if (elevator.go == 2) {
            elevator.state = State.CLOSE_2
            mechanism.carDown()
        }
    })
.for(State.FLOOR_3)
    .on(Event.CLOSED_3, (elevator, mechanism) => {
        if (elevator.go == 1 || elevator.go == 2) {
            mechanism.closeCarDoor()
        }
        elevator.state = State.OPEN_3
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
        const dispatch = states[this.state][event] || (() => {
            console.log('no handler: event: ' + event + ' for state: '+  this.state)
        })
        dispatch(this, this.mechanism)
    }
}
