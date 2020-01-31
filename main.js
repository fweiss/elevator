import Actuator from './actuator.js'
import Mechanism from './mechanism.js'
import Elevator from './elevator.js'

$(function() {

    let mechanism = new Mechanism()
    let elevator = new Elevator(mechanism)

    $(mechanism).on('moveto', function() {
        console.log(mechanism.position)
    })
    $(mechanism).on('floor', function(event, num) {
        console.log('floor: ' + num)
    })

    $(mechanism.carActuator).on('position', function(event, position) {
        $('#car').css('bottom', position)
    })
    $(mechanism.carActuator).on('detector', function(event, position) {
        console.log('car detector: ', position)
        if (position == 200) {
            elevator.event(Elevator.AT_3)
        }
        if (position == 0) {
            elevator.event(Elevator.AT_1)
        }
    })

    $('#go-3').click(function(event) {
        // mechanism.startUp()
        // mechanism.carActuator.out()
        elevator.event(Elevator.GO_3)
    })
    $('#go-1').click(function(event) {
        elevator.event(Elevator.GO_1)
    })
    $('#go-2').click(function(event) {
        // mechanism.startDown()
        mechanism.carActuator.in()
    })
    $('#open').click(function(event) {
        mechanism.openCarDoor()
    })
    $('#close').click(function(event) {
        mechanism.closeCarDoor()
    })
    $('#get-3').click(function(event) {
        mechanism.openFloor3Door()
    })
    $(mechanism.carDoorActuator).on('position', function(event, position) {
        $('#car .door').css('right', position)
    })
    $(mechanism.carDoorActuator).on('detector', function(event, position) {
        console.log('car door detector: ' + position)
    })

    $(mechanism.floor3DoorActuator).on('position', function(event, position) {
        $('#door-3').css('right', position)
    })
    $(mechanism.floor3DoorActuator).on('detector', function(event, position) {
        if (position == 50) {
            elevator.event(Elevator.OPENED_3)
        }
        if (position == 0) {
            elevator.event(Elevator.CLOSED_3)
        }
    })
    $(mechanism.floor1DoorActuator).on('position', function(event, position) {
        $('#door-1').css('right', position)
    })
    $(mechanism.floor1DoorActuator).on('detector', function(event, position) {
        if (position == 50) {
            elevator.event(Elevator.OPENED_1)
        }
        if (position == 0) {
            elevator.event(Elevator.CLOSED_1)
        }
    })


})
