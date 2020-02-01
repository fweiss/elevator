const STATE_RESET = 'reset'
const STATE_OPEN_3 = 'open_3'
const STATE_OPEN_2 = 'open_2'
const STATE_OPEN_1 = 'open_1'
const STATE_CLOSE_3 = 'close_3'
const STATE_CLOSE_2 = 'close_2'
const STATE_CLOSE_1 = 'close_1'
const STATE_SEEK_3 = 'seek-3'
const STATE_SEEK_2 = 'seek-2'
const STATE_SEEK_1 = 'seek-1'
const STATE_FLOOR_3 = 'floor_3'
const STATE_FLOOR_2 = 'floor_2'
const STATE_FLOOR_1 = 'floor_1'


const EVENT_GO_3 = 'go_3'
const EVENT_GO_2 = 'go_2'
const EVENT_GO_1 = 'go_1'

const EVENT_CALL_3 = 'call_3'
const EVENT_CALL_2 = 'call_2'
const EVENT_CALL_1 = 'call_1'

const EVENT_AT_3 = 'at_3'
const EVENT_AT_2 = 'at_2'
const EVENT_AT_1 = 'at_1'

const EVENT_CLOSED_3 = 'closed_3'
const EVENT_CLOSED_2 = 'closed_2'
const EVENT_CLOSED_1 = 'closed_1'

const EVENT_OPENED_3 = 'opened_3'
const EVENT_OPENED_2 = 'opened_2'
const EVENT_OPENED_1 = 'opened_1'
const EVENT_OPEN_1 = 'open-1'
const EVENT_OPEN_2 = 'open-2'
const EVENT_OPEN_3 = 'open-3'

const EVENT_CLOSED_CAR = 'closed-car'
const EVENT_OPENED_CAR = 'opened-car'

class Builder {
    constructor() {
        this.graph = {}
        this.state = ''
    }
    for(state) {
        this.graph[state] = {}
        this.state = state
        return this
    }
    on(event, handler) {
        this.graph[this.state][event] = handler
        return this
    }
    build() {
        return this.graph
    }
}

let states = new Builder()
.for(STATE_RESET)
    .on(EVENT_OPENED_CAR, (elevator, mechanism) => {
        elevator.state = STATE_OPEN_1
    })
.for(STATE_SEEK_1)
    .on(EVENT_CLOSED_CAR, (elevator, mechanism) => {
        mechanism.carDown()
        elevator.state = STATE_CLOSE_1
    })
.for(STATE_CLOSE_1)
    .on(EVENT_GO_3, (elevator, mechanism) => {
        mechanism.carUp()
        elevator.state = STATE_CLOSE_3
    })
    .on(EVENT_AT_1, (elevator, mechanism) => {
        mechanism.stop()
        mechanism.openCarDoor()
    })
    .on(EVENT_OPENED_CAR, (elevator, mechanism) => {
        elevator.state = STATE_OPEN_1
    })
.for(STATE_OPEN_1)
    .on(EVENT_OPENED_1, (elevator, mechanism) => {
        elevator.state = STATE_FLOOR_1
    })
    .on(EVENT_GO_3, (elevator, mechanism) => {
        mechanism.closeFloor1Door()
        mechanism.closeCarDoor()
        elevator.state = STATE_SEEK_3
    })
    .on(EVENT_OPEN_1, (elevator, mechanism) => {
        mechanism.openFloor1Door()
        elevator.state = STATE_FLOOR_1
    })
.for(STATE_FLOOR_1)
    .on(EVENT_CLOSED_1, (elevator, mechanism) => {
        elevator.state = STATE_OPEN_1
    })



.for(STATE_SEEK_3)
    .on(EVENT_CLOSED_CAR, (elevator, mechanism) => {
        mechanism.carUp()
        elevator.state = STATE_CLOSE_3
    })
.for(STATE_CLOSE_3)
    .on(EVENT_OPENED_CAR, (elevator, mechanism) => {
        elevator.state = STATE_OPEN_3
    })
    .on(EVENT_AT_3, (elevator, mechanism) => {
        mechanism.stop()
        mechanism.openCarDoor()
    })
.for(STATE_OPEN_3)
    .on(EVENT_GO_1, (elevator, mechanism) => {
        mechanism.closeCarDoor()
        elevator.state = STATE_SEEK_1
    })
    .on(EVENT_OPEN_3, (elevator, mechanism) => {
        mechanism.openFloor3Door()
        elevator.state = STATE_FLOOR_3
    })
.for(STATE_FLOOR_3)
    .on(EVENT_CLOSED_3, (elevator, mechanism) => {
        elevator.state = STATE_OPEN_3
    })

.build()

console.log(states)

export default class Elevator {
    static GO_3 = EVENT_GO_3
    static GO_2 = EVENT_GO_2
    static GO_1 = EVENT_GO_1

    static AT_3 = EVENT_AT_3
    static AT_2 = EVENT_AT_2
    static AT_1 = EVENT_AT_1

    static OPENED_3 = EVENT_OPENED_3
    static OPENED_2 = EVENT_OPENED_2
    static OPENED_1 = EVENT_OPENED_1
    static CLOSED_3 = EVENT_CLOSED_3
    static CLOSED_2 = EVENT_CLOSED_2
    static CLOSED_1 = EVENT_CLOSED_1
    static OPEN_1 = EVENT_OPEN_1
    static OPEN_2 = EVENT_OPEN_2
    static OPEN_3 = EVENT_OPEN_3

    static CLOSED_CAR = EVENT_CLOSED_CAR
    static OPENED_CAR = EVENT_OPENED_CAR

    constructor(mechanism) {
        this.mechanism = mechanism
        mechanism.openCarDoor()
        this.state = STATE_RESET
    }
    set state(state) {
        console.log('enter state: ' + state)
        this._state = state
    }
    get state() {
        return this._state
    }
    event(event) {
        let self = this
        let dispatch = states[this.state][event] || function() {
            console.log('no handler: event: ' + event + ' for state: '+  self.state)
        }
        dispatch(this, this.mechanism)
    }
}

// let xstates = {}
// states[STATE_CLOSE_1] = {}
// states[STATE_CLOSE_1][EVENT_GO_3] = function(elevator, mechanism) {
//         mechanism.carUp()
//         elevator.state = STATE_CLOSE_3
//     }
// states[STATE_CLOSE_1][EVENT_AT_1] = function(elevator, mechanism) {
//     mechanism.stop()
//     mechanism.openCarDoor()
//     mechanism.openFloor1Door()
// }
// states[STATE_CLOSE_1][EVENT_OPENED_1] = function(elevator, mechanism) {
//     elevator.state = STATE_OPEN_1
// }
// states[STATE_OPEN_1] = {}
// states[STATE_OPEN_1][EVENT_GO_3] = function(elevator, mechanism) {
//     mechanism.closeFloor1Door()
//     mechanism.closeCarDoor()
//     elevator.state = STATE_SEEK_3
// }
// states[STATE_SEEK_1] = {}
// states[STATE_SEEK_1][EVENT_CLOSED_3] = function(elevator, mechanism) {
//     mechanism.carDown()
//     elevator.state = STATE_CLOSE_1
// }
//
// states[STATE_CLOSE_3] = {}
// states[STATE_CLOSE_3][EVENT_AT_3] = function(elevator, mechanism) {
//         mechanism.stop()
//         mechanism.openCarDoor()
//         mechanism.openFloor3Door()
//     }
// states[STATE_CLOSE_3][EVENT_OPENED_3] = function(elevator, mechanism) {
//     elevator.state = STATE_OPEN_3
// }
// states[STATE_OPEN_3] = {}
// states[STATE_OPEN_3][EVENT_GO_1] = function(elevator, mechanism) {
//     mechanism.closeFloor3Door()
//     mechanism.closeCarDoor()
//     elevator.state = STATE_SEEK_1
// }
// states[STATE_SEEK_3] = {}
// states[STATE_SEEK_3][EVENT_CLOSED_1] = function(elevator, mechanism) {
//     mechanism.carUp()
//     elevator.state = STATE_CLOSE_3
// }

