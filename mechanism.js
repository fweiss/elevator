import Actuator from "./actuator.js";

export default class Mechanism {
    constructor() {
        this.carActuator = new Actuator(0, 200, 20, [ 0, 100, 200 ])
        this.carDoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
        this.floor1DoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
        this.floor2DoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
        this.floor3DoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
    }
    carUp() {
        this.carActuator.out()
    }
    carDown() {
        this.carActuator.in()
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
    openFloor1Door() {
        this.floor1DoorActuator.out()
    }
    closeFloor1Door() {
        this.floor1DoorActuator.in()
    }
    openFloor2Door() {
        this.floor2DoorActuator.out()
    }
    closeFloor2Door() {
        this.floor2DoorActuator.in()
    }
    openFloor3Door() {
        this.floor3DoorActuator.out()
    }
    closeFloor3Door() {
        this.floor3DoorActuator.in()
    }
}
