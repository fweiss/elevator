import Mechanism from './mechanism.js'
import { Elevator, Event } from './elevator-1.js'

$(function() {

    const mechanism = new Mechanism()
    const elevator = new Elevator(mechanism)

    $(mechanism.carActuator).on('position', function(event, position) {
        $('#car').css('bottom', position)
    })
    $(mechanism.carActuator).on('detector', function(event, index) {
        console.log('car detector: ', index)
        if (index == 2) {
            elevator.event(Event.CAR_AT_3)
        }
        if (index == 1) {
            elevator.event(Event.CAR_AT_2)
        }
        if (index == 0) {
            elevator.event(Event.CAR_AT_1)
        }
    })
    $(mechanism.carDoorActuator).on('position', function(event, position) {
        $('car door').css('left', position)
    })
    $(mechanism.carDoorActuator).on('detector', function(event, index) {
        console.log('car door detector: ' + index)
        elevator.event(index == 1 ? Event.CAR_DOOR_OPENED : Event.CAR_DOOR_CLOSED)
    })

    $(mechanism.floor1DoorActuator).on('position', function(event, position) {
        $('#door-1').css('right', position)
    })
    $(mechanism.floor1DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.FLOOR_1_DOOR_OPENED)
        }
        if (index == 0) {
            elevator.event(Event.FLOOR_1_DOOR_CLOSED)
        }
    })
    $(mechanism.floor2DoorActuator).on('position', function(event, position) {
        $('#door-2').css('right', position)
    })
    $(mechanism.floor2DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.FLOOR_2_DOOR_OPENED)
        }
        if (index == 0) {
            elevator.event(Event.FLOOR_2_DOOR_CLOSED)
        }
    })
    $(mechanism.floor3DoorActuator).on('position', function(event, position) {
        $('#door-3').css('right', position)
    })
    $(mechanism.floor3DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.FLOOR_3_DOOR_OPENED)
        }
        if (index == 0) {
            elevator.event(Event.FLOOR_3_DOOR_CLOSED)
        }
    })

    $('#get-1, #go-1').click(function(event) {
        elevator.event(Event.GO_1)
    })
    $('#get-2, #go-2').click(function(event) {
        elevator.event(Event.GO_2)
    })
    $('#get-3, #go-3').click(function(event) {
        elevator.event(Event.GO_3)
    })

    $('#open-1').click((event) => {
        elevator.event(Event.OPEN_1)
    })
    $('#close-1').click((event) => {
        mechanism.closeFloor1Door()
    })
    $('#open-2').click((event) => {
        elevator.event(Event.OPEN_2)
    })
    $('#close-2').click((event) => {
        mechanism.closeFloor2Door()
    })
    $('#open-3').click((event) => {
        elevator.event(Event.OPEN_3)
    })
    $('#close-3').click((event) => {
        mechanism.closeFloor3Door()
    })
    $(elevator).on('request', (event, go) => {
        // maybe put in mechanism
        $('#get-1, #get-2, #get-3, #go-1, #go-2, #go-3').css('background-color', 'white')
        $('#get-' + go + ', #go-' + go).css('background-color', 'lightblue')
    })

})
