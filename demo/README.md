# Demo

This demo shows how to match the current progression of an audio element with words on a page to highlight the words are they are spoken. The match uses a JSON representation of each word, along with its start and end time. 

Try it: https://propublica.github.io/transcript-audio-sync/demo/

## JSON and HTML Audio Representation

The transcript is represented in JSON as an array of words. Each word in the transcript is represented as an object:

```js
{
	"word":"Please", // The word
	"speaker":"John", // Represents the person speaking
	"start":0.55, // Start timestamp for word
	"end":0.91, // End timestamp for word
	"id":0 // Unique id that matches html
}
```

Words are represented in the HTML as a span with a unique id matching the `id` in JSON:

```html
<span class="word" word-id="0">First</span>
```

## Accessibility

To highlight individual words, each word in the HTML is wrapped in a span. However, wrapping words in spans causes screen readers like VoiceOver to read each word individually instead of in a sentence. To create a good experience for all users, we use aria-hidden="true" to hide the transcript with spans, and then we have a screen reader-friendly version of the content below. 

## Citation
- Audio file, audio.mp3: Weinberger, S. (2013). Speech accent archive. George Mason University. (https://dagshub.com/kinkusuma/speech-accent-archive/src/master/recordings/english26.mp3)
