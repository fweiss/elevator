export default class Actuator {
    constructor() { // in, out, ticks, steps
        this.limitOut = 50
        this.limitIn = 0
        this.position = 0
        this.tickInterval = 20
    }
    triggerPosition() {
        $(this).trigger('position', [ this.position ])
    }
    out() {
        clearInterval(this.run)
        this.run = setInterval(doTick, this.tickInterval)
        let self = this
        function doTick() {
            if (self.position < self.limitOut) {
                self.position++
                self.triggerPosition()
            } else {
                clearInterval(self.run)
                $(self).trigger('limitout')
            }
        }
    }
    in() {
        clearInterval(this.run)
        this.run = setInterval(doTick, this.tickInterval)
        let self = this
        function doTick() {
            if (self.position > self.limitIn) {
                self.position--
                self.triggerPosition()
            } else {
                clearInterval(self.run)
                $(self).trigger('limitin')

            }
        }
    }
    stop() {
        clearInterval(this.run)
    }
}
