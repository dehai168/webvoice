# webvoice
>一个网页语音对讲库。
### 设计

![](https://github.com/dehai168/webvoice/blob/master/assets/design.png)

### 采集
1. 通过`MediaDevices.getUserMedia()`进行语音采集
2. 需要在`https`的环境下调用
3. 把麦克风数据塞给 `MediaStreamAudioSourceNode`
### 编码
1. 建立`ScriptProcessNode`处理节点
2. 把建立的 `MediaStreamAudioSourceNode` 连接到 `ScriptProcessNode` 然后连接到 `AudioContext.destination` 
3. 在`ScriptProcessNode`的 `onaudioprocess` 事件中处理 `Buffer`
4. 把 `Buffer` 进行压缩和 `wav` 编码
### 传输
1. 通过`websocket`加密方式进行传输
### 处理
1. 任意后台进行数据处理 `node/java/c#/c++`
2. 然后转发到目的地
3. 把结果通过`websocket`发送出来
### 接收
1. 通过`websocket`进行接收
### 解码
1. 通过 `AudioContext` 的 `decodeAudioData` 方法对 `wav` 格式音频文件解码
### 播放
1. 构建`AudioBufferSourceNode`节点
2. 连接到 `AudioContext.destination` 并进行播放

### Document

[API](https://github.com/dehai168/webvoice/blob/master/docs/api.md)

### 音频格式浏览器支持情况

|内容\浏览器|Chrome|IE|FireFox|Safari|Opera|
|---|---|---|---|---|---|
|`<audio>`|4.0|9.0|3.5|4.0|10.5|
|mp3|Y|Y|Y|Y|Y|
|wav|Y|N|Y|Y|Y|
|ogg|Y|N|Y|N|Y|

### 媒体类型

|文件类型|媒体类型|文件大小|
|---|---|---|
|mp3|audio/mpeg||
|ogg|audio/ogg||
|wav|audio/wav|1B=取样频率x量化位数x声道x时间/8|

### 声音参数

|类型|值范围|
|---|---|
|量化位数|8位、16位、24位|
|取样频率|11025Hz(11kHz)、22050Hz(22kHz)、44100Hz(44kHz)|
|声道|单声道(nx1矩阵点)、立体声(nx2矩阵点)|

### 参考资料

>[网页音频接口的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API)
