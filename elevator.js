export default class Elevator {
    static GO_3 = 'go_3'
    static AT_3 = 'at_3'

    constructor(mechanism) {
        this.mechanism = mechanism
        this.state = states['closed_1']
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
        let dispatch = this.state[event] || function() {}
        dispatch(this, this.mechanism)
    }
}

let states = {
    'closed_1': {
        'go_3': function(elevator, mechanism) {
            mechanism.carUp()
            elevator.state = states['closed_3']
        }
    },
    'closed_3': {
        'at_3': function(elevator, mechanism) {
            mechanism.stop()
            mechanism.openCarDoor()
            mechanism.openFloor3Door()
        }
    }
}