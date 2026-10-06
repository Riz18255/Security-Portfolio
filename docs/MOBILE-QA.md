# Mobile and sound validation — 6 October 2026

## Checked here

- Chromium-rendered CSS viewports, with desktop scrollbars hidden in a temporary iframe harness to represent mobile overlay scrollbars. This is responsive browser testing, not OS emulation.
- Home at 320×568, 375×667, 390×844, 430×932, 360×800, 412×915, 667×375, 844×390, 932×430, 800×360, 915×412, and 768×1024.
- All nine case studies at 320×568, 390×844, 412×915, 667×375, 800×360, and 932×430.
- All 66 page/viewport combinations rendered the expected heading and had document scroll width equal to viewport width.
- Sound on/off at all 12 home sizes: 24 checks passed. The knob stayed inside the visual track, the control provided a 44×44 CSS-pixel target, and playback matched switch state. Tablet sound was verified with the keyboard because the test harness iframe exceeded the browser's visible height.
- The production stylesheet passed sound on/off and overflow checks at 390×844 and 800×360.
- Rapid repeated Space-key toggles returned to the correct off/paused state.
- Landscape mobile navigation opened, followed Credentials, and closed. Global search returned the three network-related case studies. Network filtering returned ML-DDoS, Network Security, and Linux Vulnerability Assessment. Arsenal search and the Nessus details dialog worked. Search and tool dialogs fit the 800×360 viewport; tool content can scroll.
- A mobile screenshot shows sound enabled with its knob inside the track. Raw geometry and state results are in mobile-validation-2026-10-06.json.
- Next.js 16.3.4 production build and TypeScript check passed, generating home and all nine case studies.

## Compatibility provisions

- Audio starts off, with no autoplay. play() is called directly from the user's switch event. Failed playback resets the switch and announces a retry message. Request tracking prevents an obsolete play rejection from undoing a newer tap.
- MP3 is first choice, with the original PCM WAV as fallback. MP3 is approximately 385 KB versus approximately 2.05 MB for WAV. Playback remains a single on/off control.
- Arsenal and global search inputs use 16px text to reduce Safari input focus zoom.
- The sculpture uses pointer events, pointer cancellation/capture cleanup, and touch-action: pan-y so vertical page scrolling remains possible. These are implementation checks; native touch gestures were not available for direct verification.
- Existing renderers pause while hidden/offscreen, cap rendering work on smaller screens, respect the OS reduced-motion preference, and provide a software canvas fallback when WebGL2 is unavailable.
- This Tailwind 4 codebase targets modern browsers: Safari 16.4+, Chrome 111+, and Firefox 128+. See https://tailwindcss.com/docs/compatibility. This is a framework support baseline, not a device certification.

## Limits and remaining device checks

No physical iPhone, Android phone, iOS Safari, Android Chrome, device simulator, or WebGL-capable browser was available. The available Chromium browser has WebGL disabled, so the software sculpture fallback was visually verified. GPU output and real touch behavior still need a device check.

On an iPhone with Safari and an Android phone with Chrome, test both orientations: tap sound on/off repeatedly; scroll vertically over the sculpture and drag it sideways; rotate while the menu or a dialog is open; search with the onscreen keyboard; open the CV PDF; and background/return to the browser. Safari may open the PDF for saving through Share rather than download it immediately. Keep browser zoom available.

For staging and review, deployment protection (such as Vercel Authentication) can be enabled if private previews are desired before public release.
