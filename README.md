# 8bitNoise.js - 8位噪波生成器

这是一个模拟红白机和 Game Boy 噪波音轨的8位风格噪波生成器，基于 Web Audio API。

任天堂红白机的声音包含5个基本音轨：2个方形波、1个三角波、1个噪波、1个任意波音轨。

其中，方形波和三角波可以用 Web Audio API 中的 Oscillator （振荡器）模拟，而噪波需要另想它法。

这一个js文件让你可以轻松地模拟噪波音轨。

## Demo

- [16种噪波测试 (test.html)](https://benzleung.github.io/8bitNoise.js/test.html)
- [两种噪波组合音效 (demo.html)](https://benzleung.github.io/8bitNoise.js/demo.html)

## 用法

```javascript
var node = context.create8bitNoise(frequencyOrId);
```

然后把 `node` 当成 SourceNode 使用即可（使用 start, stop, onended），参看下面的示例。

其中，`frequencyOrId` 可以是频率（20 Hz - 22000 Hz），也可以是一个频率序号（1 - 16）。

红白机的噪波音轨实际上只能发出16种频率，这16种频率的值是固定的常量。频率序号（1 - 16）就是指代这16种频率值。

若要完美模拟红白机或 Game Boy 的噪波，则强烈建议只用这16种频率，对 `frequencyOrId` 写入 1-16 即可。[test.html](https://benzleung.github.io/8bitNoise.js/test.html) 可试听这16种噪波。

## 示例

```javascript
// 初始化 Web Audio API 的 Context
var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var ctx = new AudioContext();

// 新建一个 8bitNoise 的 Node
var node = ctx.create8bitNoise(10);
// 像别的 Node 一样连接到 destination 或者其他 Node
node.connect(ctx.destination);
// （可选）结束声音后有个 onended 事件
node.onended = function() {
    // 巴拉巴拉巴拉...  
};
// 开始发出声音
node.start(0);
// 停止声音，像 SourceNode 一样，这个 node 随即被销毁
node.stop(ctx.currentTime + 1.0);
```

## 许可

MIT.

-----

# 8bitNoise.js

This is 8-bit style (e.g. Nintendo Entainment System, Game boy) noise generator for the Web Audio API.

Nintendo Entainment System (FC/NES) contains five basic tracks: two square waves, a triangle wave, a noise, and a PCM wave track.

Among them, the square wave and triangle wave can be emulate with "OscillatorNode" in the Web Audio API, and the noise track need another way.

This Javascript file (8bitNoise.js) allows you to easily simulate the noise track.

## Demo

- [16 kinds of noise test (test.html)](https://benzleung.github.io/8bitNoise.js/test-eng.html)
- [Two kinds of 8-bit noise combined sound effects (demo.html)](https://benzleung.github.io/8bitNoise.js/demo-eng.html)

## Usage

```javascript
var node = context.create8bitNoise(frequencyOrId);
```

And then use `node` as a "SourceNode" (using start, stop, onended), see the example below.

Where `frequencyOrId` can be a frequency value (20 Hz - 22000 Hz) or a frequency ID (No.1 - No.16).

The noise track of NES can only be produce sounds in 16 kinds of frequency, the 16 kinds of frequency values are fixed constant. The frequency ID (No.1 - No.16) refer to these 16 frequency values.

To perfectly simulate the noise track of NES or Game Boy, it is strongly recommended to use only these 16 kinds of frequencies. Just assign from 1 to 16 to `frequencyOrId`.

## Example

```javascript
// Initialize Web Audio API Context
var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var ctx = new AudioContext();

// Create a 8bitNoiseNode
var node = ctx.create8bitNoise(10);
// Connect to `destination` or other AudioNode like any other kind of AudioNode
node.connect(ctx.destination);
// (Optional) When the sound ended, there is an 'onended' event triggered
node.onended = function() {
    // bla bla bla ...  
};
// start the noise
node.start(0);
// stop the noise, like `SourceNode`, this node would be destroyed
node.stop(ctx.currentTime + 1.0);
```

## License

MIT license.