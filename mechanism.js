import Actuator from "./actuator.js";

export default class Mechanism {
    constructor() {
        // this.limitTop = 100
        // this.limitBottom = 0
        // this.position = 0
        // this.tickInterval = 20
        // this.floorTriggers = [
        //     0, 10, 20
        // ]
        this.carActuator = new Actuator(0, 200, 20, [ 0, 100, 200 ])
        this.carDoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
        this.floor3DoorActuator = new Actuator(0, 50, 20, [ 0, 50 ])
    }
    // checkFloorTrigger() {
    //     let self = this
    //     self.floorTriggers.forEach((level) => {
    //         if (self.position == level) {
    //             $(self).trigger('floor', [ level ])
    //         }
    //     })
    // }
    // startUp() {
    //     let self = this
    //     clearInterval(self.run)
    //     self.run = setInterval(doTick, this.tickInterval)
    //     function doTick() {
    //         if (self.position < self.limitTop) {
    //             self.position++;
    //             $('#car').css('top', self.position)
    //             $(self).trigger('moveto', [ self.position ])
    //             self.checkFloorTrigger()
    //         } else {
    //             clearInterval(self.run)
    //         }
    //     }
    // }
    // startDown() {
    //     let self = this
    //     clearInterval(self.run)
    //     self.run = setInterval(doTick, this.tickInterval)
    //     function doTick() {
    //         if (self.position > self.limitBottom) {
    //             self.position--;
    //             $('#car').css('top', self.position)
    //             $(self).trigger('moveto', [ self.position ])
    //             self.checkFloorTrigger()
    //         } else {
    //             clearInterval(self.run)
    //         }
    //     }
    // }
    stop() {
        clearInterval(this.run)
        $(this).trigger('stop')
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
