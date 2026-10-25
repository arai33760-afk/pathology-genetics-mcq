# PWA verification report

Verified 26 October 2026. The supplied Android screenshot shows a local `content://media/…` file, with styles and scripts not loaded. The updated HTML explains this opening method without depending on external scripts. Installation still requires the complete package to be served from an HTTPS website.

| Check | Result |
| --- | ---: |
| Source question IDs preserved | 2,173 / 2,173 |
| Answer-key records matched | 2,173 / 2,173 |
| Image-question references | 31 / 31 resolved |
| Unique original images | 29 |
| Ambiguous source keys kept unscored | 6 |
| Source entries with no explanation retained | 674 |
| Cached offline assets | 43 / 43 |
| Chapter home tiles | 22, including All Questions and zero-question Chapter 20 |

Tests used Chrome 155.0.8059.85 on Windows, localhost secure contexts, persistent browser profiles, a 390-pixel viewport and Pixel 7 emulation. These are desktop browser tests, not physical Android tests.

- Chrome DevTools Protocol returned **zero manifest errors and zero installability errors**, at both `/index.html` and `/study/index.html`. Installability was checked in persistent profiles; Incognito contexts correctly reported that installation was unavailable in Incognito.
- All 43 cached resources returned nonempty successful responses. All 29 original images decoded successfully after network access was disabled, at both deployment paths.
- Chapter home, All Questions mode (2,173 IDs), saved-session resume, locked Tutor feedback, answer/guess/bookmark saving, and unique completion after repeated attempts passed.
- A persistent browser profile was closed and reopened offline; saved progress and unfinished selections were restored.
- Old-format localStorage migration and recovery from a newer localStorage mirror passed. An injected IndexedDB failure displayed the fallback-storage warning.
- Old backup import, newly exported backup restoration in a fresh context, and duplicate import without duplicate attempts passed.
- JSON, HTML and CSV report downloads passed while the All Questions session was unfinished.
- Copy Question before submission hid the answer; after submission it included the answer and full explanation. Image clipboard copying passed in desktop Chrome.
- Installation help remained available without an install prompt. A simulated missing-script/missing-style deployment showed the inline loading-error instructions. Local-file opening showed installation guidance.
- Mobile installation help and failure-screen screenshots were inspected. Root/subfolder mobile layouts had no horizontal overflow. No page errors occurred during the normal installability and regression tests.

Question-bank JS and JSON were compared byte-for-byte with the original delivered quiz ZIP. Neither was changed. This release edits installation guidance and launch handling, not the progress schema. It contains no reset or removal of user progress. Migration was verified with test records; the user's actual phone storage was not accessible or inspected.

Live deployment: https://arai33760-afk.github.io/pathology-genetics-mcq/ in the newly created, separate repository https://github.com/arai33760-afk/pathology-genetics-mcq. GitHub Pages reported a successful build and the website returned HTTP 200. Chrome's live-site manifest and installability diagnostics returned zero errors. All 43 offline resources cached successfully; all 29 original images decoded offline. The full persistence/regression test also passed against this live HTTPS URL, including browser restart, unfinished draft recovery, source-image copying, legacy migration, backup compatibility and unique completion. No page errors occurred. The existing Allergen repository was not used or modified.

Limitations: Physical Android installation was not performed. A change from `file://` or another host to the GitHub Pages HTTPS origin needs a one-time JSON backup import because browser origins cannot read each other’s storage. Local device data is not guaranteed permanent.
