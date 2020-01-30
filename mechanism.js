import Actuator from "./actuator.js";

export default class Mechanism {
    constructor() {
        this.limitTop = 100
        this.limitBottom = 0
        this.position = 0
        this.tickInterval = 20
        this.floorTriggers = [
            0, 10, 20
        ]
        this.carDoorActuator = new Actuator()
        $(this.carDoorActuator).on('position', function(event, position) {
            $('#car .door').css('right', position)
        })
        this.floor3DoorActuator = new Actuator()
        $(this.floor3DoorActuator).on('position', function(event, position) {
            $('#door-3').css('right', position)
        })
    }
    checkFloorTrigger() {
        let self = this
        self.floorTriggers.forEach((level) => {
            if (self.position == level) {
                $(self).trigger('floor', [ level ])
            }
        })
    }
    startUp() {
        let self = this
        clearInterval(self.run)
        self.run = setInterval(doTick, this.tickInterval)
        function doTick() {
            if (self.position < self.limitTop) {
                self.position++;
                $('#car').css('top', self.position)
                $(self).trigger('moveto', [ self.position ])
                self.checkFloorTrigger()
            } else {
                clearInterval(self.run)
            }
        }
    }
    startDown() {
        let self = this
        clearInterval(self.run)
        self.run = setInterval(doTick, this.tickInterval)
        function doTick() {
            if (self.position > self.limitBottom) {
                self.position--;
                $('#car').css('top', self.position)
                $(self).trigger('moveto', [ self.position ])
                self.checkFloorTrigger()
            } else {
                clearInterval(self.run)
            }
        }
    }
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
