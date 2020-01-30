export default class Actuator {
    constructor(limitIn, limitOut, tickInterval, detectors) {
        this.limitIn = limitIn
        this.limitOut = limitOut
        this.position = 0
        this.tickInterval = tickInterval
        this.detectors = detectors
    }
    triggerPosition() {
        $(this).trigger('position', [ this.position ])
    }
    triggerDetector() {
        let self = this
        self.detectors.forEach((position) => {
            if (self.position == position) {
                $(self).trigger('detector', [ position ])
            }
        })
    }
    out() {
        clearInterval(this.run)
        this.run = setInterval(doTick, this.tickInterval)
        let self = this
        function doTick() {
            if (self.position < self.limitOut) {
                self.position++
                self.triggerPosition()
                self.triggerDetector()
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
                self.triggerDetector()
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
