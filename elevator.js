const STATE_OPEN_3 = 'open_3'
const STATE_OPEN_2 = 'open_2'
const STATE_OPEN_1 = 'open_1'
const STATE_CLOSE_3 = 'close_3'
const STATE_CLOSE_2 = 'close_2'
const STATE_CLOSE_1 = 'close_1'

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
const EVENT_CLOSED_2 = 'closed_3'
const EVENT_CLOSED_1 = 'closed_3'

const EVENT_OPENED_3 = 'opened_3'
const EVENT_OPENED_2 = 'opened_2'
const EVENT_OPENED_1 = 'opened_1'


export default class Elevator {
    static GO_3 = EVENT_GO_3
    static AT_3 = EVENT_AT_3

    constructor(mechanism) {
        this.mechanism = mechanism
        this.state = states[STATE_CLOSE_1]
    }

    xevent(event) {
        if (event == Elevator.GO_3) {
            this.mechanism.carUp()
        }
        if (event == Elevator.AT_3) {
            this.mechanism.stop()
            this.mechanism.openCarDoor()
            this.mechanism.openFloor3Door()
        }
    }

    event(event) {
        let dispatch = this.state[event] || function() {
            console.log('not handler: event: ' + event + ' for state: '+  this.state)
        }
        dispatch(this, this.mechanism)
    }
}

let states = {}
states[STATE_CLOSE_1] = {}
states[STATE_CLOSE_1][EVENT_GO_3] = function(elevator, mechanism) {
            mechanism.carUp()
            elevator.state = states[STATE_CLOSE_3]
        }

states[STATE_CLOSE_3] = {}
states[STATE_CLOSE_3][EVENT_AT_3] = function(elevator, mechanism) {
        mechanism.stop()
        mechanism.openCarDoor()
        mechanism.openFloor3Door()
    }

