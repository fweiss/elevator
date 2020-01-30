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

    $('#go-3').click(function(event) {
        mechanism.startUp()
    })
    $('#go-2').click(function(event) {
        mechanism.startDown()
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

})