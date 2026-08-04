# MaMuT Daloskönyv

A single-page campfire songbook webapp (Hungarian scout troop "MaMuT"). Almost
everything lives in one file: `index.html`. It's a static PWA, no build step,
no dependencies beyond Bootstrap CSS.

## Files

- `index.html` — the app: styles, script, and every song's markup, all inline.
- `index2018.html` — an old snapshot, not maintained; ignore for new work.
- `app.js` — registers the service worker on load.
- `sw.js` — service worker; caches `./`, `index.html`, `app.js`, icons for
  offline use (network-first strategy).
- `manifest.json` — PWA manifest (name, icons, theme color).
- `songs-to-add/` — scratch folder for raw lyrics text waiting to be merged
  into `index.html`. Not referenced by the app itself.

## How `index.html` works

- A number input (`#songInput`) and a list of `<a class="list-group-item">`
  entries (one per song, `onclick="songSelected(N)"`) drive navigation.
- Every song has a `<div id="N">` (N = 1..last song number) containing an
  `<h4>` title and a `<p>` of lyrics. All divs are siblings inside
  `#song-row`; `songNumberChanged()` shows the selected one and hides the
  rest by toggling `display`.
- The valid song range is hardcoded in the inline `<script>` in the `<head>`
  in **two places** — both must be updated together when a song is added:
  ```js
  if (!(id >= 0 && id <= N)) id = 0;   // clamp/validate
  for (i = 0; i <= N; ++i)             // show/hide loop
  ```
  `N` must equal the id of the last song. `id=0` is the song list itself.
- Song numbers are sequential and contiguous starting at 1 — new songs are
  appended at the end (highest number + 1), not inserted alphabetically.

## Adding a new song

To add a song from `songs-to-add/` (or any raw lyrics text) into
`index.html`, in order:

1. Pick the next number `N` = (current highest song id) + 1.
2. Add a list entry right after the previous last one, just above the song
   divs:
   ```html
   <a class="list-group-item" onclick="songSelected(N)">N. Artist: Title</a>
   ```
   Title format follows existing entries: `Artist: Song title` when there's
   a clear performing artist/band, otherwise just the title (e.g. traditional
   or unattributed songs like "Vuk", "Go down, Moses").
3. Append a new song block at the very end of `#song-row`, right after the
   previous last song's `</div>`:
   ```html
   <div id="N">
   <h4>N. Artist: Title<br></h4><p>
   Line one<br>
   Line two<br>
   <br>
   Next verse line one<br>
   ...
   <br>
   </p></div>
   ```
4. Bump both hardcoded `71`s (or whatever the previous max was) in the
   `<script>` block described above to `N`.
5. Formatting rules to match the rest of the file:
   - One lyric line per line, each ending in `<br>` — no wrapping mid-line.
   - Blank line between verses/sections = a lone `<br>` on its own line.
   - No trailing whitespace before `<br>`.
   - Straight apostrophes (`'`), not curly (`'`) — matches the majority of
     existing songs.
   - The `<p>` block ends with one blank `<br>` line before `</p></div>`
     (matches the existing convention).
   - Keep source lyrics as-is otherwise (casing, punctuation, contractions
     like `gonna`/`'cause`) — don't "correct" the lyrics.
   - `<span class="boys">...</span>` is used in a couple of songs to mark
     alternate lines sung by boys vs. girls; only use it if the source
     material calls for a call-and-response split (see song 49 as an
     example).

## Songs added this way

- **72. Vance Joy: Riptide** — added from
  `songs-to-add/vance joy - riptide.txt` (2026-08-04).
