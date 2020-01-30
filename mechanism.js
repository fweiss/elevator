import Actuator from "./actuator.js";

export default class Mechanism {
    constructor() {
        this.carActuator = new Actuator(0, 200, 20, [ 0, 100, 200 ])
        this.carDoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
        this.floor3DoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
    }
    carUp() {
        this.carActuator.out()
    }
    stop() {
        this.carActuator.stop()
        // $(this).trigger('stop')
    }
    openCarDoor() {
        this.carDoorActuator.out()
    }
    closeCarDoor() {
        this.carDoorActuator.in()
    }
    openFloor3Door() {
        this.floor3DoorActuator.out()
    }
}
