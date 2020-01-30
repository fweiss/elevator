import Actuator from './actuator.js'
import Mechanism from './mechanism.js'

$(function() {

    let mechanism = new Mechanism()

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
    })

    $('#go-3').click(function(event) {
        // mechanism.startUp()
        mechanism.carActuator.out()
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


})
