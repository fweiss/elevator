export default class Elevator {
    static GO_3 = 'go-3'
    static AT_3 = 'at-3'
    constructor(mechanism) {
        this.mechanism = mechanism
    }
    event(event) {
        if (event == Elevator.GO_3) {
            this.mechanism.carUp()
        }
        if (event == Elevator.AT_3) {
            this.mechanism.stop()
            this.mechanism.openCarDoor()
            this.mechanism.openFloor3Door()
        }
    }
}