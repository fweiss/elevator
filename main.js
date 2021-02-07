import Actuator from './actuator.js'
import Mechanism from './mechanism.js'
import { Elevator, Event } from './elevator-1.js'

$(function() {

    let mechanism = new Mechanism()
    let elevator = new Elevator(mechanism)

    $(mechanism.carActuator).on('position', function(event, position) {
        let offset = position + 0 //11
        $('#car').css('bottom', offset)
    })
    $(mechanism.carActuator).on('detector', function(event, index) {
        console.log('car detector: ', index)
        if (index == 2) {
            elevator.event(Event.AT_3)
        }
        if (index == 1) {
            elevator.event(Event.AT_2)
        }
        if (index == 0) {
            elevator.event(Event.AT_1)
        }
    })
    $(mechanism.carDoorActuator).on('position', function(event, position) {
        $('car door').css('left', position)
    })
    $(mechanism.carDoorActuator).on('detector', function(event, index) {
        console.log('car door detector: ' + index)
        elevator.event(index == 1 ? Event.OPENED_CAR : Event.CLOSED_CAR)
    })

    $(mechanism.floor1DoorActuator).on('position', function(event, position) {
        $('#door-1').css('right', position)
    })
    $(mechanism.floor1DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.OPENED_1)
        }
        if (index == 0) {
            elevator.event(Event.CLOSED_1)
        }
    })
    $(mechanism.floor2DoorActuator).on('position', function(event, position) {
        $('#door-2').css('right', position)
    })
    $(mechanism.floor2DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.OPENED_2)
        }
        if (index == 0) {
            elevator.event(Event.CLOSED_2)
        }
    })
    $(mechanism.floor3DoorActuator).on('position', function(event, position) {
        $('#door-3').css('right', position)
    })
    $(mechanism.floor3DoorActuator).on('detector', function(event, index) {
        if (index == 1) {
            elevator.event(Event.OPENED_3)
        }
        if (index == 0) {
            elevator.event(Event.CLOSED_3)
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
