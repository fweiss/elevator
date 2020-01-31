const STATE_OPEN_3 = 'open_3'
const STATE_OPEN_2 = 'open_2'
const STATE_OPEN_1 = 'open_1'
const STATE_CLOSE_3 = 'close_3'
const STATE_CLOSE_2 = 'close_2'
const STATE_CLOSE_1 = 'close_1'
const STATE_SEEK_3 = 'seek-3'
const STATE_SEEK_2 = 'seek-2'
const STATE_SEEK_1 = 'seek-1'

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

    constructor(mechanism) {
        this.mechanism = mechanism
        this.state = STATE_CLOSE_1
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

let states = {}
states[STATE_CLOSE_1] = {}
states[STATE_CLOSE_1][EVENT_GO_3] = function(elevator, mechanism) {
        mechanism.carUp()
        elevator.state = STATE_CLOSE_3
    }
states[STATE_CLOSE_1][EVENT_AT_1] = function(elevator, mechanism) {
    mechanism.stop()
    mechanism.openCarDoor()
    mechanism.openFloor1Door()
}
states[STATE_CLOSE_1][EVENT_OPENED_1] = function(elevator, mechanism) {
    elevator.state = STATE_OPEN_1
}
states[STATE_OPEN_1] = {}
states[STATE_OPEN_1][EVENT_GO_3] = function(elevator, mechanism) {
    mechanism.closeFloor1Door()
    mechanism.closeCarDoor()
    elevator.state = STATE_SEEK_3
}
states[STATE_SEEK_1] = {}
states[STATE_SEEK_1][EVENT_CLOSED_3] = function(elevator, mechanism) {
    mechanism.carDown()
    elevator.state = STATE_CLOSE_1
}

states[STATE_CLOSE_3] = {}
states[STATE_CLOSE_3][EVENT_AT_3] = function(elevator, mechanism) {
        mechanism.stop()
        mechanism.openCarDoor()
        mechanism.openFloor3Door()
    }
states[STATE_CLOSE_3][EVENT_OPENED_3] = function(elevator, mechanism) {
    elevator.state = STATE_OPEN_3
}
states[STATE_OPEN_3] = {}
states[STATE_OPEN_3][EVENT_GO_1] = function(elevator, mechanism) {
    mechanism.closeFloor3Door()
    mechanism.closeCarDoor()
    elevator.state = STATE_SEEK_1
}
states[STATE_SEEK_3] = {}
states[STATE_SEEK_3][EVENT_CLOSED_1] = function(elevator, mechanism) {
    mechanism.carUp()
    elevator.state = STATE_CLOSE_3
}
