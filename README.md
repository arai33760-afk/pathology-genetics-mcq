# Pathology & Genetics MCQ Tutor — Android PWA

This updates the existing 2,173-question quiz. The source question bank, stable question IDs, 29 original image files, explanations, Tutor Mode, bookmarks, and exports are retained.

## Install on Android

An installable PWA must first be opened from a stable HTTPS address. **index.html is a file name, not the installation link.** Android's `content://` file viewer may fail to load every separate app asset. Opening a downloaded HTML file cannot install this PWA. See **ANDROID_INSTALL.md** for the full computer-to-phone steps. The HTML now includes an inline explanation when opened locally, plus a loading-error message if the scripts do not load.

1. Extract `Pathology_Genetics_Android_PWA.zip` on your computer.
2. Publish the extracted folder (the one containing `index.html`) on a static HTTPS host. The simplest no-build route is [Netlify Drop](https://app.netlify.com/drop): drag the folder into its drop area, then use the resulting `https://…netlify.app` URL. This publishes the question-bank files at that address; use a private HTTPS host if they should not be public. Claim the site if you want to keep the same address for future updates.
3. Open that HTTPS URL in regular **Chrome on Android**. Wait until the app says **Offline ready**. Tap **Install app** if shown, or use Chrome’s menu → **Install app** / **Add to Home screen → Install**. **Install / help** remains available when Chrome does not offer an automatic prompt.
4. Open the new home-screen icon. The chapter tiles are the first screen. The installed app is configured for standalone display, without a browser address bar.

The app uses no account, subscription, external library, or server for everyday studying after its files are cached. Keep the same HTTPS address when updating; a new address has separate browser storage.

## Progress saving and migration

Every answer submission, selected option, guess-checkbox change, bookmark change, session start, and navigation change writes to IndexedDB automatically. **Saved automatically** appears after the write commits. The app also makes a best-effort localStorage mirror and shows a persistent warning if IndexedDB or all local saving fails. Reopening the app restores sessions and unfinished selections.

If the previous quiz ran at the **same browser origin**, its legacy localStorage record is imported into IndexedDB on first launch. This was tested with an old-format progress record. Browsers isolate storage by origin, so a newly hosted HTTPS PWA cannot directly read progress saved under an old `file://` URL or a different website. For that one-time move, use **Export Backup** in the old quiz and **Import Backup** in the PWA. The existing backup schema remains compatible; duplicate attempt IDs are skipped on import. Normal daily use needs no manual backup or import.

The PWA stores progress locally on that device and origin. Uninstalling it, clearing site data, or changing devices may remove local progress. Optional backups protect against those events. The app cannot guarantee permanent storage.

## Study workflow

- The chapter home shows completed/total, completion bar, and latest-attempt accuracy. It includes all source chapters, the image-question section, and **All Questions**. Chapter 20 is displayed as a zero-question source chapter.
- Tap a tile to **Continue**, **Start New Attempt**, **Review Incorrect**, or **Review Guessed**. Old attempts remain for trends.
- Tutor Mode stays on. Answers and original explanations appear only after submission; the choice then locks. Six ambiguous source keys remain unscored, and 674 entries retain the source statement that no explanation is provided.
- **Copy question** copies the full stem and every option without an answer before submission. After submission it also copies the source answer and complete explanation. Image questions include the original image URL in copied text and offer a separate **Copy image** control where the browser permits image clipboard access.
- The separate **Progress** dashboard counts each completed question once, shows overall/chapter progress, weak areas, bookmarks, guesses, and repeat-attempt trends.
- **Export Backup** and **Import Backup** remain optional safeguards. AI report exports remain available in JSON, HTML, and CSV at any time.

## Files and updates

`index.html` loads the unchanged `question-bank.js`; `question-bank.json` is the audit-friendly bank copy. The `images/` directory contains all 29 source images. `manifest.webmanifest`, `sw.js`, `icons/`, and the PWA styles/scripts provide installation and offline use. The service worker precaches all app code, both bank formats, and all 29 images, then replaces only its own old asset cache on updates. It never deletes IndexedDB progress.

For updates, publish a new release to the **same HTTPS site address**. Open the app online once and let the new offline files finish caching. Do not deploy a new URL if you expect that URL to share existing progress.

## Verification and limits

See `verification-report.md` for exact checks. Chrome on Windows passed IndexedDB migration, automatic saving, browser restart, offline navigation and all original images, unfinished-draft recovery, backup export/import, JSON/HTML/CSV reports, and copy controls. Chrome's installability diagnostics returned no errors for root and subfolder deployments using Pixel 7 emulation and persistent browser profiles. **Physical Android installation, Android device persistence, and a hosted HTTPS deployment were not tested.**
