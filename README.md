# TAI2ME — Your AI. Your Classroom.

**TAI2ME** is a privacy-first, installable PWA that asks six multiple-choice questions and creates a personalized educational starter prompt. Students review and copy their prompt, then open **their own** AI assistant (ChatGPT, Gemini, Claude, Copilot, or another provider) and paste it there to begin an interactive learning session.

No subscription, API key, log-in, backend, analytics, tracker, or external script is necessary for this starter. The AI account belongs to the student, not to TAI2ME. **It is a copy-and-paste handoff, not an authenticated integration.**

## Publish under repository name `TAI2ME`

1. Open your existing repository at **https://github.com/yarnbucket/TAI2ME** and choose **Add file → Upload files**. Extract the ZIP first.
2. Upload the **contents** of this folder to the repository root (not a nested folder): `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `service-worker.js`, and `assets/`.
3. Under **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. Once published, open `https://yarnbucket.github.io/TAI2ME/` and test on a phone. You can share that URL as a normal website.
5. On **Android**, use your browser's **Install app** or **Add to Home screen** option (label varies). On **iPhone/iPad**, open in Safari, use **Share → Add to Home Screen**. On PC/Mac, use a browser install shortcut if supported.

GitHub Pages can take a little time to publish. HTTPS enables service workers and install prompts. The cache is updated by changing `CACHE_NAME` in `service-worker.js` when releasing a new version.

## What a user does

1. Answers six questions (experience, reason, interests, preferred learning style, time per session, goal).
2. Sees a custom learning roadmap.
3. Chooses an AI platform, reads the generated starter prompt, and taps **Copy my classroom setup**.
4. Opens their AI assistant in a new tab and **pastes the prompt themselves**. No hidden transfer happens.
5. Receives interactive, theory-backed teaching with multiple-choice practice, adaptive grading, coding, creative projects, and safety fundamentals.
6. Can ask their AI for its end-of-lesson **Progress Passport** and paste it into a later chat. TAI2ME does not synchronize a student's grades or sessions.

## Privacy and security

- Six whitelisted multiple-choice questions; no names, phone numbers, addresses, emails, passwords, or free-text personal data.
- Responses remain in the page's memory and disappear on refresh or closing. No localStorage or server upload.
- Only PWA assets are cached by the service worker for offline viewing. External AI websites require their own internet access.
- Strict content security policy; no CDN or third-party JavaScript, font, analytics, or API credentials.
- A **human-controlled** handoff prevents silent forwarding to AI providers. Once users paste a prompt, the AI provider's own privacy policy applies.
- LLM safety/teaching instructions are guidance, not an enforceable technical safety filter. Don't rely on third-party tutors for high-stakes decisions.
- A public GitHub Pages PWA **cannot hide its HTML, JavaScript, CSS, or public JSON**, so no secret curriculum, authentication tokens, trade secrets, or private student records belong in this repository. Future protected courses require a backend with authentication, authorization, rate limiting, server-side lesson storage, and data protection.
- The prototype does **not** collect sign-ups or interest survey results. Consent-based analytics would require a separate, reviewed design.

## Important limitations

- Student instruction quality, grading consistency, and memory vary by AI provider and model. The app cannot promise any learning outcome.
- No third-party certification, accreditation, academic credit, app-store publication, or revenue is provided or guaranteed.
- TAI2ME has been created on GitHub. These files must still be uploaded and GitHub Pages enabled. This ZIP is not itself a deployed link.
- Opening `index.html` directly allows viewing the quiz but cannot install the PWA or register its service worker. For development, use `python -m http.server 8000` and navigate to `http://localhost:8000/`.

## Project contents

- `index.html` — semantic application shell, security metadata and privacy disclosure
- `styles.css` — touch-friendly responsive layout
- `app.js` — six-question adaptive starter planner and clipboard handoff
- `manifest.webmanifest` — app installation identity
- `service-worker.js` — offline app-shell caching and versioned update cleanup
- `assets/icon-192.png`, `assets/icon-512.png` — home-screen icons

## Recommended next version

After real users validate the experience, consider a consent-based feedback form, versioned curriculum stored securely on a backend, optional accounts and progress tracking, verified rubrics, and accessibility testing.

### Creator rights

Project authors retain whatever rights are recognized by applicable law in their original human-authored contributions. Public website code can be inspected or copied regardless of notices. All third-party assets and software are subject to their respective terms. No reuse license is granted with this prototype unless its owner separately provides one.
