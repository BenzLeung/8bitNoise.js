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
    var SAMPLE_RATE = 48000;
    AudioContext.prototype.create8bitNoise = function(frequency) {
        var buffer = this.createBuffer(1, SAMPLE_RATE / frequency * 100, SAMPLE_RATE);
        // todo: 生成噪波

        var node = this.createBufferSource();
        node.buffer = buffer;
        node.loop = true;
        return node;
    };
})(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);