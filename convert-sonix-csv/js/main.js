var defaultText = `Word,Start Timecode,End Timecode,Speaker
Please,00:00:00.55,00:00:00.91,John
call,00:00:00.91,00:00:01.21,John
Stella,00:00:01.21,00:00:02.02,John
and,00:00:02.11,00:00:02.26,John
ask,00:00:02.26,00:00:02.50,John
her,00:00:02.50,00:00:02.65,John
to,00:00:02.65,00:00:02.77,John
bring,00:00:02.77,00:00:03.04,John
these,00:00:03.04,00:00:03.31,John
things,00:00:03.31,00:00:03.67,John
with,00:00:03.67,00:00:03.91,John
her,00:00:03.91,00:00:04.21,John
from,00:00:04.21,00:00:04.42,John
the,00:00:04.42,00:00:04.51,John
store.,00:00:04.51,00:00:05.26,John
Six,00:00:05.98,00:00:06.40,John
spoons,00:00:06.40,00:00:06.91,John
of,00:00:06.91,00:00:07.00,John
fresh,00:00:07.00,00:00:07.36,John
snow,00:00:07.36,00:00:07.66,John
peas.,00:00:07.66,00:00:08.44,John
Five,00:00:09.13,00:00:09.55,John
thick,00:00:09.55,00:00:09.82,John
slabs,00:00:09.82,00:00:10.36,John
of,00:00:10.36,00:00:10.42,John
blue,00:00:10.42,00:00:10.69,John
cheese.,00:00:10.69,00:00:11.59,John
And,00:00:12.19,00:00:12.43,John
maybe,00:00:12.43,00:00:12.76,John
a,00:00:12.76,00:00:12.82,John
snack,00:00:12.82,00:00:13.27,John
for,00:00:13.27,00:00:13.45,John
her,00:00:13.45,00:00:13.54,John
"brother,",00:00:13.54,00:00:13.90,John
Bob.,00:00:13.90,00:00:14.65,John
We,00:00:15.55,00:00:15.76,John
also,00:00:15.76,00:00:16.18,John
need,00:00:16.18,00:00:16.42,John
a,00:00:16.42,00:00:16.48,John
small,00:00:16.48,00:00:16.84,John
plastic,00:00:16.84,00:00:17.38,John
snake,00:00:17.38,00:00:18.16,John
and,00:00:18.58,00:00:18.76,John
a,00:00:18.76,00:00:18.85,John
big,00:00:18.85,00:00:19.15,John
toy,00:00:19.15,00:00:19.48,John
frog,00:00:19.48,00:00:20.38,John
for,00:00:20.41,00:00:20.65,John
the,00:00:20.65,00:00:20.77,John
kids.,00:00:20.77,00:00:21.55,John
You,00:00:22.34,00:00:22.45,John
can,00:00:22.45,00:00:22.66,John
scoop,00:00:22.66,00:00:23.05,John
these,00:00:23.05,00:00:23.32,John
things,00:00:23.32,00:00:23.71,John
"into,",00:00:23.80,00:00:23.99,John
three,00:00:24.01,00:00:24.37,John
red,00:00:24.37,00:00:24.70,John
bags.,00:00:24.70,00:00:25.60,John
And,00:00:25.90,00:00:26.29,John
we,00:00:26.29,00:00:26.44,John
will,00:00:26.44,00:00:26.62,John
go,00:00:26.62,00:00:26.86,John
meet,00:00:26.89,00:00:27.16,John
her,00:00:27.16,00:00:27.40,John
Wednesday,00:00:27.40,00:00:28.12,John
at,00:00:28.72,00:00:28.90,John
the,00:00:28.90,00:00:28.99,John
train,00:00:28.99,00:00:29.32,John
station.,00:00:29.32,00:00:29.98,John`;

document.getElementById("input-csv").value = defaultText;

function timecodeToSeconds(timecode) {
  var split = timecode.split(":");
  var hours = Number(split[0]);
  var minutes = Number(split[1]);
  var seconds = Number(split[2]);

  // Sonix.ai is inconsistent in how it outputs milliseconds. Sometimes creates timestamps
  // in 00:00:00:00 format and sometimes in 00:00:00.00 format.
  var milliseconds = split[3] ? Number(split[3]) / 100 : 0;

  var seconds = hours * 3600 + minutes * 60 + seconds + milliseconds;

  return seconds;
}

function convert() {
  var inputEl = document.getElementById("input-csv");
  var inputJson = d3.csvParse(inputEl.value);

  // Update JSON
  var finalJson = inputJson.map((value, index) => {
    return {
      word: value["Word"],
      speaker: value["Speaker"],
      start: timecodeToSeconds(value["Start Timecode"]),
      end: timecodeToSeconds(value["End Timecode"]),
      id: index,
    };
  });

  document.getElementById("input-json").value = JSON.stringify(finalJson);

  // Generate HTML
  var html = finalJson
    .map((row) => {
      var hasPunctuation = !!row.word.match(/[!?.]$/);
      return `<span class="word" word-id="${row.id}">${row.word}</span>${
        hasPunctuation ? " " : " "
      }`;
    })
    .join("");

  document.getElementById("input-html").value = html;
}

document.getElementById("convert").addEventListener("click", convert);
