import Actuator from './actuator.js'
import Mechanism from './mechanism.js'
import Elevator from './elevator-1.js'

$(function() {

    let mechanism = new Mechanism()
    let elevator = new Elevator(mechanism)

    $(mechanism.carActuator).on('position', function(event, position) {
        let offset = position + 11
        $('#car').css('bottom', offset)
    })
    $(mechanism.carActuator).on('detector', function(event, index) {
        console.log('car detector: ', index)
        if (index == 2) {
            elevator.event(Elevator.AT_3)
        }
        if (index == 1) {
            elevator.event(Elevator.AT_2)
        }
        if (index == 0) {
            elevator.event(Elevator.AT_1)
        }
    })
    $(mechanism.carDoorActuator).on('position', function(event, position) {
        $('#car .door').css('right', position)
    })
    $(mechanism.carDoorActuator).on('detector', function(event, index) {
        console.log('car door detector: ' + index)
        elevator.event(index == 1 ? Elevator.OPENED_CAR : Elevator.CLOSED_CAR)
    })

    $(mechanism.floor1DoorActuator).on('position', function(event, position) {
        $('#door-1').css('right', position)
    })
    $(mechanism.floor1DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Elevator.OPENED_1)
        }
        if (index == 0) {
            elevator.event(Elevator.CLOSED_1)
        }
    })
    $(mechanism.floor2DoorActuator).on('position', function(event, position) {
        $('#door-2').css('right', position)
    })
    $(mechanism.floor2DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Elevator.OPENED_2)
        }
        if (index == 0) {
            elevator.event(Elevator.CLOSED_2)
        }
    })
    $(mechanism.floor3DoorActuator).on('position', function(event, position) {
        $('#door-3').css('right', position)
    })
    $(mechanism.floor3DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Elevator.OPENED_3)
        }
        if (index == 0) {
            elevator.event(Elevator.CLOSED_3)
        }
    })

    $('#get-1, #go-1').click(function(event) {
        elevator.event(Elevator.GO_1)
    })
    $('#get-2, #go-2').click(function(event) {
        elevator.event(Elevator.GO_2)
    })
    $('#get-3, #go-3').click(function(event) {
        elevator.event(Elevator.GO_3)
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
