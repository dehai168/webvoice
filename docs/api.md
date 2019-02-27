## API

### webvoice

>prop

|名称|类型|属性|描述|
|---|---|---|---|
|version|string|readonly|版本|
|isSupported|boolean|readonly|是否支持|

>method

|方法|参数类型|返回类型|描述|
|---|---|---|---|
|createPlayer|object|object|播放器|

```js
var player=webvoice.createPlayer({
    url: 'wss://ip:port', //交互数据地址
    numberChannels: 2, //通道 1,2
    bufferSize: 4096,  //缓冲区大小 2`n
    inputSampleBits: 8, //输入采样位数 8,16
    outputSampleRate: 7350, //输出采样率 7350
    outputSampleBits: 8 //输出采样位数 8,16
});
```
### player

>method

|名称|参数类型|返回类型|描述|
|---|---|---|---|
|ready|-|void|准备|
|speak|-|void|对讲|
|send|-|void|发送|
|getbuffer|function|buffer|获取数据|
|exportwav|function|blob|获取wav格式blob数据|
|forcedownload|filename|void|下载|