/**
 * @file 8位噪波生成器，模仿红白机或 Game Boy 的噪波声道
 * @author BenzLeung(https://github.com/BenzLeung)
 * @date 2017/3/25
 * Created by JetBrains PhpStorm.
 *
 * 每位工程师都有保持代码优雅的义务
 * each engineer has a duty to keep the code elegant
 */

(function(AudioContext) {
    var SAMPLE_RATE = 44100;

    /**
     * 对于红白机（NES）的噪波声道，它只能发出16种不同频率的噪波。
     * 这16种频率有个专门的常量表，这个常量表不是频率，而是“时间周期(Time period)”。
     * Rate  $0 $1  $2  $3  $4  $5   $6   $7   $8   $9   $A   $B   $C    $D    $E    $F
     *       --------------------------------------------------------------------------
     * NTSC   4, 8, 16, 32, 64, 96, 128, 160, 202, 254, 380, 508, 762, 1016, 2034, 4068
     * PAL    4, 8, 14, 30, 60, 88, 118, 148, 188, 236, 354, 472, 708,  944, 1890, 3778
     * （上表来源：https://wiki.nesdev.com/w/index.php/APU_Noise）
     * 这里采用 NTSC 标准。
     * 然后，使用一个公式来计算出真正的频率f：
     *          f = CPU / (16 * (t + 1))
     * （公式来源：https://wiki.nesdev.com/w/index.php/APU#Pulse_.28.244000-4007.29）
     * 其中，CPU 指红白机的 CPU 频率，NTSC版本是 1789773 Hz，PAL版本是 1662607 Hz。
     * t 就是“时间周期”常量表中的常量。
     * 此数组已经使用上述公式计算出最终的频率值，取5位有效数字。
     *
     * @type {Number}
     */
    var FREQ_16_LOOKUP = [
        0,
        27.490,
        54.968,
        109.99,
        146.61,
        219.77,
        293.60,
        438.67,
        551.04,
        694.79,
        867.14,
        1153.2,
        1720.9,
        3389.7,
        6580.0,
        12429,
        22372
    ];

    /**
     * 使用特定的频率值创建 Node。
     * @param {Number} frequency 如果 frequency <= 16 ，那么使用固定的16种频率，否则就是自定义频率。
     *                           若要完美模仿红白机效果，则只需使用固定的16种频率就好了。
     * @returns {*}
     */
    AudioContext.prototype.create8bitNoise = function(frequency) {
        if (frequency <= 16) {
            frequency = FREQ_16_LOOKUP[frequency];
        }
        var period = SAMPLE_RATE / frequency;
        var sampleLength = Math.floor(period * Math.round(frequency * 3));
        var buffer = this.createBuffer(1, sampleLength, SAMPLE_RATE);
        var channel = buffer.getChannelData(0);
        var nextPeriodPos = period;
        var curPeriodY = 1;
        for (var i = 0; i < sampleLength; i ++) {
            if (i >= nextPeriodPos) {
                curPeriodY = Math.random() >= 0.5 ? 1 : -1;
                nextPeriodPos += period;
            }
            channel[i] = curPeriodY;
        }

        var node = this.createBufferSource();
        node.buffer = buffer;
        node.loop = true;
        return node;
    };
})(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
