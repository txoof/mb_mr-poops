function middleFace () {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 80, 20, 20)
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedB), 80, 20, 20)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # # # # #
        . . . . .
        `)
}
function contentFace () {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 80, 0)
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedB), 0, 80, 0)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
}
function poop () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 35)
    basic.pause(600)
}
function angryFace () {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedB), 100, 0, 0)
    basic.showLeds(`
        # # . # #
        . # . # .
        . . . . .
        . # . # .
        # . # . #
        `)
}
function unhappyFace () {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 90)
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedB), 0, 0, 90)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
}
input.onGesture(Gesture.Shake, function () {
    wag()
    content += 100
    sb.setServoPosition(sb.servo(SBServo.ServoA), 95)
    basic.pause(600)
    sb.turnOffServo(sb.servo(SBServo.ServoA))
})
function wag () {
    sb.setServoPosition(sb.servo(SBServo.ServoB), 0)
    basic.pause(900)
    sb.setServoPosition(sb.servo(SBServo.ServoB), 100)
}
function showFace () {
    if (content >= 400) {
        contentFace()
    }
    if (content >= 300 && content < 400) {
        middleFace()
    }
    if (content >= 200 && content < 300) {
        unhappyFace()
    }
    if (content <= 100) {
        angryFace()
        poop()
    }
}
let content = 0
content = 500
let elapsedTime = input.runningTime()
let shake = 0
sb.setServoPosition(sb.servo(SBServo.ServoA), 95)
basic.pause(600)
sb.turnOffServo(sb.servo(SBServo.ServoA))
basic.forever(function () {
    showFace()
    if (elapsedTime + input.runningTime() >= 1000) {
        elapsedTime = input.runningTime()
        content += -10
        if (content < 0) {
            content = 0
        }
    }
    if (content < 150 && content > 130) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
    }
})
