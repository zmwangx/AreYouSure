# How to generate the textual frames of the music video

First, download the full video with youtube-dl

```
youtube-dl -f 137 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
```

name it `rick.full.1080p.mp4`.

Next, crop out the black bars on the sides. Curiously there are 267px of black on either side instead of 240px, making the actual video 77:60. Also cut to the first minute.

```
ffmpeg -y -i rick.full.1080p.mp4 -filter:v 'crop=ih/60*77:ih' -c:v libx264 -crf 23 -preset veryfast -t 60 rick.60s.mp4
```

Next, convert the video to black and white with the threshold filter (credit to https://video.stackexchange.com/a/28759):

```
ffmpeg -y -i rick.60s.mp4 -f lavfi -i color=gray:s=1386x1080 -f lavfi -i color=black:s=1386x1080 -f lavfi -i color=white:s=1386x1080 -filter_complex threshold rick.60s.bw.mp4
```

Now we can dump the frames and use jp2a to generate textual frames. We reduce to 12.5fps to save space.

```zsh
#!/bin/zsh
mkdir -p frames text
ffmpeg -i rick.60s.bw.mp4 -vf fps=fps=12.5 frames/%03d.jpg
for f in frames/*.jpg; do
    echo $f
    jp2a --background=light --height=18 $f > text/${f:t:r}.txt
done
```

Here's a script to play the resulting frames directly in the terminal (timing is not accurate):

```zsh
#!/bin/zsh
for f in text/*.txt; do
    printf '\033[2J\033[1;1H'
    cat $f
    sleep 0.08
done
```

Finally, generate a JSON array with all the frames:

```
jq --null-input --raw-input --compact-output '[reduce inputs as $line ({}; .[input_filename] += [$line]) | map_values(join("\n")) | to_entries | .[].value]' text/*.txt > rick-frames.json
```
