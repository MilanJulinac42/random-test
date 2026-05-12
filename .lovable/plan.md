## Goal

Lock the three "How It Works" cards to a fixed height so hover only changes width — no vertical growing or shrinking.

## Problem

Cards currently use `aspectRatio: "4 / 5"`. When one card expands horizontally (`2.4fr`), its width grows, so its height grows too; the two compacted cards (`0.8fr`) get narrower and shorter. The row visibly changes height as the user hovers across cards.

## Change

In `src/components/sections/Process.tsx` (desktop layout only):

- Remove `aspectRatio` from the card and its wrapper.
- Set a single fixed height on every card, e.g. `height: clamp(420px, 48vw, 560px)`, applied at the row level so all three cards stay identical regardless of width.
- Keep all hover behavior (grid-column animation, arrow fade, description slide-in, title shift) exactly as is.
- Mobile stacked layout keeps `aspectRatio: "4 / 5"` since hover doesn't apply there.

No other styling, animation timing, or content changes.
