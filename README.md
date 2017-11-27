# audio.js
一个网页语音对讲库。
### 采集
1. 通过MediaDevices.getUserMedia()进行语音采集
### 编码
1. 然后AudioContext对象进行JavaScript的编码
### 传输
1. 通过Websocket进行传输
### 转发
1. 任意后台转发 node/java/c#/c++
### 接受
1. 通过Websocket进行接受
### 转码
1. 然后进行JavaScript的转码
### 播放
1. 构建blob对象
2. Audio标签进行播放
3. 浏览器支持情况

|内容\浏览器|Chrome|IE|FireFox|Safari|Opera|
|---|---|---|---|---|---|
|`<audio>`|4.0|9.0|3.5|4.0|10.5|
|mp3|Y|Y|Y|Y|Y|
|wav|Y|N|Y|Y|Y|
|ogg|Y|N|Y|N|Y|

4. 媒体类型

|文件类型|媒体类型|
|---|---|
|mp3|audio/mpeg|
|ogg|audio/ogg|
|wav|audio/wav|
