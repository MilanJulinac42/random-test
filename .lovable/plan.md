## Investigation

The only recurring runtime issue surfaced in console logs is:

> Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.

It fires every time the mobile menu Sheet opens/closes — visible repeatedly in the session (`08:37:53`, `08:37:59`, `08:38:08`, …). No other errors, network failures, or runtime exceptions are present.

## Root Cause

`src/components/Navbar.tsx` renders the mobile menu via Radix's `Sheet` (which is a `Dialog` underneath):

```tsx
<SheetContent side="right" ...>
  <SheetTitle className="sr-only">Navigation menu</SheetTitle>
  ...no SheetDescription, no aria-describedby...
</SheetContent>
```

Radix Dialog's a11y contract requires **either**:
1. a `<DialogDescription>` / `<SheetDescription>` child, **or**
2. an explicit `aria-describedby={undefined}` prop on `SheetContent` to opt out.

The component supplies neither, so Radix logs the warning on every mount and every reconnect (StrictMode + Sheet's portal remount = the warning fires twice per open, which matches the log pattern).

## Why it Fails / Edge Cases

- Functionally harmless — the menu still works — but it's a real screen-reader regression: assistive tech announces an unlabeled dialog body.
- It pollutes dev console, drowning out genuine errors.
- Will reappear anywhere else a `SheetContent` / `DialogContent` is added without a description (none today besides Navbar; `command.tsx` and `sidebar.tsx` ship from shadcn and aren't currently rendered by the app, so they're not triggering the warning right now but would if used).

## Proposed Fix (production-ready)

**Primary fix — `src/components/Navbar.tsx`:**

1. Import `SheetDescription` alongside the other Sheet primitives.
2. Add a visually-hidden description right after the existing `SheetTitle`:

```tsx
<SheetTitle className="sr-only">Navigation menu</SheetTitle>
<SheetDescription className="sr-only">
  Site navigation links and social profiles.
</SheetDescription>
```

This satisfies Radix's contract, is announced by screen readers, and doesn't change the visual UI.

**Defensive hardening (optional, recommended) — `src/components/ui/sheet.tsx`:**

Make `SheetContent` forgiving by defaulting `aria-describedby` to `undefined` only when no description is provided, OR simply leave shadcn's primitive as-is and rely on every consumer to add a `SheetDescription`. I recommend leaving the primitive untouched (matches shadcn upstream) and instead establishing the convention in consumers — only Navbar is affected today.

## Files Touched

- `src/components/Navbar.tsx` — add `SheetDescription` import + sr-only description node inside `SheetContent`.

## Verification

- Reload preview, open mobile menu, confirm the warning no longer appears in console logs.
- Screen-reader smoke test: VoiceOver/NVDA should announce "Navigation menu, Site navigation links and social profiles" when the sheet opens.
