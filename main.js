import Actuator from './actuator.js'
import Mechanism from './mechanism.js'
import Elevator from './elevator.js'

$(function() {

    let mechanism = new Mechanism()
    let elevator = new Elevator(mechanism)

    $(mechanism.carActuator).on('position', function(event, position) {
        let offset = position + 11
        $('#car').css('bottom', offset)
    })
    $(mechanism.carActuator).on('detector', function(event, position) {
        console.log('car detector: ', position)
        if (position == 240) {
            elevator.event(Elevator.AT_3)
        }
        if (position == 120) {
            elevator.event(Elevator.AT_2)
        }
        if (position == 0) {
            elevator.event(Elevator.AT_1)
        }
    })
    $(mechanism.carDoorActuator).on('position', function(event, position) {
        $('#car .door').css('right', position)
    })
    $(mechanism.carDoorActuator).on('detector', function(event, position) {
        console.log('car door detector: ' + position)
        elevator.event(position == 50 ? Elevator.OPENED_CAR : Elevator.CLOSED_CAR)
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

    $('#get-1').click(function(event) {
        elevator.event(Elevator.GO_1)
    })
    $('#get-2').click(function(event) {
        elevator.event(Elevator.GO_2)
    })
    $('#get-3').click(function(event) {
        elevator.event(Elevator.GO_3)
    })

    $('#go-1').click(function(event) {
        elevator.event(Elevator.GO_1)
    })
    $('#go-2').click(function(event) {
        mechanism.carActuator.in()
    })
    $('#go-3').click(function(event) {
        elevator.event(Elevator.GO_3)
    })

    $('#open').click(function(event) {
        mechanism.openCarDoor()
    })
    $('#close').click(function(event) {
        mechanism.closeCarDoor()
    })

    $('#open-1').click((event) => {
        elevator.event(Elevator.OPEN_1)
    })
    $('#close-1').click((event) => {
        mechanism.closeFloor1Door()
    })
    $('#open-2').click((event) => {
        elevator.event(Elevator.OPEN_2)
    })
    $('#close-2').click((event) => {
        mechanism.closeFloor2Door()
    })
    $('#open-3').click((event) => {
        elevator.event(Elevator.OPEN_3)
    })
    $('#close-3').click((event) => {
        mechanism.closeFloor3Door()
    })


})
