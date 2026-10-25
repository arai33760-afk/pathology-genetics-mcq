# Android installation — start here

**Your app is already hosted:** https://arai33760-afk.github.io/pathology-genetics-mcq/

Open that link in regular Chrome on Android, wait for **Offline ready**, then choose **⋮ → Add to Home screen → Install** or **Install app**. Open the installed icon and check it once in airplane mode. You can skip the website-setup section below unless you want to create another deployment.

**Do not open index.html from Downloads or your phone's file manager to install it.** The screenshot supplied for troubleshooting shows `content://media/…`. That is a local Android file address, even though Chrome displays it. Android may not let that file load its separate styles, scripts or question bank. A PWA installs from a website address beginning with `https://`.

## One-time website setup on your computer

1. Download `Pathology_Genetics_Android_PWA.zip` and choose **Extract All** in Windows.
2. Find the extracted folder containing `index.html`, `manifest.webmanifest`, `sw.js`, the JavaScript/CSS files, and the `images` and `icons` folders. Keep them together.
3. Open [Netlify Drop](https://app.netlify.com/drop) in your computer browser. Upload that **entire extracted folder**. No build command is needed. This publishes the question-bank files to a website accessible to others; use a host with suitable access controls if you need restricted access.
4. Copy the website URL Netlify gives you, such as `https://your-chosen-name.netlify.app`. This is the link to send to your phone. Keep/claim the site in your hosting account so updates use the same address. The example address here is not a deployed quiz.

## Install on your Android phone

1. Open the actual hosted HTTPS link in regular **Chrome**, not Incognito and not an in-app browser or Downloads file preview.
2. You should see styled chapter tiles and **2,173 source questions**. Stay online until **Offline ready** appears.
3. Tap **Install app** if offered. Otherwise use Chrome's **⋮ → Add to Home screen → Install**, or **⋮ → Install app**. Menu wording varies. The quiz's **Install / help** button also shows setup status.
4. Open the home-screen icon. Study progress saves automatically. After **Saved automatically** appears, close and reopen the app once to check your phone's persistence. Turn on airplane mode and reopen once to check its offline setup.

If installation still is not offered, check that the address really begins with `https://` and that the complete folder was uploaded. Share the full website address when requesting troubleshooting; `index.html` alone does not identify a website. Chrome may not immediately show an automatic installation prompt. A shortcut that still opens with an address bar does not confirm standalone installation.

If your old quiz has progress under a local file or different website, export one JSON backup from the old quiz and import it once into this PWA. After that, no routine manual import/export is required. Keep the same HTTPS URL for app updates. Local progress may be lost if the app is uninstalled, site data is cleared, or the device changes.

The package and live GitHub Pages HTTPS deployment have passed Chrome on Windows tests with mobile emulation. Physical Android installation has not been tested. Reference: [MDN installability requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable), [Netlify Drop instructions](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).
