# webvoice

> A web-based voice intercom library for real-time audio communication in browsers.

## Features

- **Audio Capture**: Capture microphone input via `MediaDevices.getUserMedia()`
- **Audio Processing**: Process audio buffers using ScriptProcessorNode/AudioWorklet
- **Encoding**: Compress and encode audio to WAV format
- **Transmission**: Transmit audio over encrypted WebSocket connections
- **Playback**: Decode and play received audio via Web Audio API

## Installation

```bash
npm install webvoice --save
```

## Usage

```javascript
import { webvoice } from 'webvoice';

const player = webvoice.createPlayer({
    // configuration options
});
```

## Architecture

### Audio Capture
1. Capture audio via `MediaDevices.getUserMedia()`
2. Must run in HTTPS environment
3. Route microphone data to `MediaStreamAudioSourceNode`

### Encoding
1. Create `ScriptProcessorNode` (or AudioWorklet) for audio processing
2. Connect `MediaStreamAudioSourceNode` → `ScriptProcessorNode` → `AudioContext.destination`
3. Handle audio buffers in `onaudioprocess` event
4. Compress and encode to WAV format

### Transmission
1. Transmit via encrypted WebSocket
2. Process on any backend (Node.js/Java/C#/C++)
3. Forward to destination
4. Send results back via WebSocket

### Receiving
1. Receive audio via WebSocket
2. Decode WAV using `AudioContext.decodeAudioData()`
3. Create `AudioBufferSourceNode`
4. Connect to `AudioContext.destination` for playback

## API Documentation

[API Documentation](https://github.com/dehai168/webvoice/blob/master/docs/api.md)

## Browser Compatibility

| Feature | Chrome | IE | Firefox | Safari | Opera |
|---------|--------|-----|---------|--------|-------|
| `<audio>` tag | 4.0 | 9.0 | 3.5 | 4.0 | 10.5 |
| MP3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| WAV | ✅ | ❌ | ✅ | ✅ | ✅ |
| OGG | ✅ | ❌ | ✅ | ❌ | ✅ |

## Audio Format Specifications

### Media Types

| File Type | MIME Type |
|-----------|-----------|
| MP3 | audio/mpeg |
| OGG | audio/ogg |
| WAV | audio/wav |

### Audio Parameters

| Parameter | Range |
|-----------|-------|
| Quantization Bits | 8-bit, 16-bit, 24-bit |
| Sample Rate | 11025Hz, 22050Hz, 44100Hz |
| Channels | Mono, Stereo |

Formula: `1B = SampleRate × Bits × Channels × Time / 8`

## References

- [Web Audio API Basic Concepts](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API)

## License

Apache License 2.0