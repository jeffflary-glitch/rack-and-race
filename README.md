# Rack & Race

A one-page, 30-lap plan from PC builder to data center technician: three 1-hour sessions a week, a race circuit that snakes through a server rack, milestones as stacking bricks, rack-mounted status blades, a session timer, and the training, job and support links in one place.

**Live site:** https://jeffflary-glitch.github.io/rack-and-race/

- Tick one box per 1-hour session; the third finishes the lap and racks its brick. Milestones are marked with a diamond and show as bricks on the circuit.
- Sound cues play when the session timer starts, when a box is ticked, and when a lap is finished. Mute them from the button at the top of the page.
- Progress syncs to a Google Sheet through the Apps Script in `apps-script/Code.gs`, so every device shows the same race.
- Lap 1 starts Monday, November 2, 2026.

Everything is in `index.html`, with the hero video, its still frame and the three sound files in `media/`. To use your own sounds, replace `timer-start.mp3`, `brick-snap.mp3` or `lap-complete.mp3` with files of the same name. There is no build step.
