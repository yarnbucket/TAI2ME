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


## Return to your classroom (v1.4)

After a student creates a chat, they can rename it **TAI2ME — My AI Classroom** in their own AI account. TAI2ME cannot rename or read provider chats directly. A student may explicitly save the existing conversation's private address-bar URL into this device's localStorage. TAI2ME supports direct conversation URL bookmarks for ChatGPT (/c/...), Claude (/chat/...), and Gemini (/app/...). Public shared-chat URLs are rejected and must never be used for a private bookmark. Copilot or unsupported URL forms use the provider's normal chat-history interface instead.

When the installed TAI2ME icon is opened, **Continue My Class** reopens the locally saved browser chat in a new tab where the user must sign in to the same account. This does not sync across devices or browser profiles, and deleting app data may erase the bookmark. No questionnaire answers or private chat content are collected by TAI2ME. On iOS, set up the bookmark inside the installed web app if separate Home Screen storage applies.


## v1.5 — no empty-chat detours

Previous versions pointed provider-only bookmarks at a provider homepage; this often presented an empty new chat. **Now the T2 Home Screen experience has two explicit states:**

- **Direct conversation saved:** Show *Continue My Class*, which opens only a validated private conversation address.
- **Only provider saved:** Show *Find My Existing Class*. This opens in-app chat-history instructions, **not** an empty AI homepage. The student explicitly chooses *Open [AI] to find my existing chat* when ready, opens the old conversation in their chat history, and can save its private address bar link for one-tap resume.

Existing provider-only v1.4 bookmarks automatically follow the safer guide. No new accounts or collection are introduced; bookmarks remain local to the browser/app profile. Shared-chat links continue to be rejected.


## v1.6 — Adaptive prompting fundamentals

Retains the existing six-question mobile onboarding. **Everyone** learns clear prompting, useful context, iterative refinement, verification, and privacy within their chosen learning path. The tutor adjusts to demonstrated skill; experienced AI users are never assumed to be programmers, and no extra screens or fixed prerequisite exam were added.

## v1.11 — adaptive challenge ladder and AI Now

The six-question onboarding remains unchanged. The generated AI tutor prompt now asks the user's chosen assistant to assess answers and maintain a ten-correct-in-a-row streak **inside that assistant's conversation**, with a harder interest-relevant applied challenge and tier advancement at every completed block of 10 correct first attempts. A wrong first attempt resets the current streak. An ambiguous or flawed question does not penalize the student. The tutor should adapt support, especially for beginners, and must not fabricate grades, streaks or cross-session memory. The copyable progress passport includes current tier and streak to aid resumption.

The post-quiz **AI Now** panel links to continuously updated first-party research and safety pages: OpenAI News, Google DeepMind, Anthropic Research, and NIST AI RMF. TAI2ME does not scrape or automatically ingest those pages: when a student's assistant can browse, it is instructed to verify 1–2 relevant, recent developments and cite dates and original sources at the beginning of each study session. If browsing is unavailable, the tutor must say so and link to sources instead of pretending to have current knowledge. The PWA itself does not access AI-chat answers, so direct centralized grading or background market updates would require further opt-in integrations.

## v1.12 — first-time interview and AI orientation

The original six-question interview is preserved. After answering, students meet five familiar AI assistants (ChatGPT, Gemini, Claude, Copilot and Perplexity) in an expandable, sourced guide. Typical use cases are not a fixed ranking; the number of AI tools changes. Students can choose an existing account or Other AI. Perplexity supports the copy-and-paste launch and provider-history fallback, not an unverified chat prefill or private chat recovery integration.

## v1.13 — Continue Lesson X from the T2 icon

An existing student may open the **Find my class** footer settings in the installed TAI2ME PWA, choose their AI provider, enter an optional short lesson name (e.g. **Lesson 4**), and save a **private conversation URL** copied from that conversation's browser address bar. On future visits, the T2 Home Screen icon opens TAI2ME with a new **Continue Lesson 4** button that follows the validated URL. Users with an old URL bookmark see **Continue My Class** until they add a name. No resume button is shown if only the provider or a lesson name is saved, preventing empty new chats. The saved lesson label and URL remain in local browser/app storage; they are not synced to other devices or transmitted by TAI2ME. Uninstalling or clearing storage can erase the shortcut.

TAI2ME cannot call a separate operating-system Home Screen shortcut by name or look up private chat history by the lesson title. The saved URL can sometimes open the provider's native app via its verified/deep-link handling; otherwise it opens the specified conversation in a browser. A public shared-chat URL is never accepted as a private shortcut. Students must be signed into the correct AI account.

## v1.14 — iPhone beta: fair grading and external AI service boundary

Two observed beta issues: iPhone users report advertising/promotions after opening an AI service, and a screenshot shows a surprise 100-point prototype stress-test question. The latter may belong to a user's existing AI conversation rather than the TAI2ME onboarding itself, so this is a preventive safeguard, not proof the app caused it. TAI2ME has no ad code or third-party tracking; external providers control their own ads and UI. A brief disclosure now appears next to the AI provider selector.

The generated tutor prompt now explicitly **teaches a simple concept before a low-stakes diagnostic**, avoids surprise 100-point beginner stress tests, grades from verified facts or transparent rubrics rather than unverified model explanations, leaves uncertain questions temporarily ungraded, and corrects unfair grades/streak penalties if the tutor is mistaken. Existing adaptive tier and 10-in-a-row rules are unchanged. These instructions are guidance to an external AI; they do not give TAI2ME direct access to the conversation or guarantee enforcement.

## v1.14.1 — free-plan friendly learning and provider subscription upsells

iPhone beta testers reported **subscription offers** within their selected external AI services, not ads from TAI2ME. TAI2ME does not charge, request payment information, or invoke AI billing APIs. Providers control their own subscription dialogs, which the app cannot suppress. The hand-off page makes this clear and states that basic lessons should use any available free plan. The tutor prompt now explicitly avoids required premium models, subscriptions, paid tools, and unnecessary browsing. AI Now browsing is optional, topical and at most once per study session when available for free. Existing students keep their ongoing AI conversation and can paste a one-time course correction. Their old chat will NOT automatically inherit new prompt instructions from this PWA update.

## v1.15 — Stable, always-refreshable "Update my class" link

The PWA footer now contains **Update my class**, available to students without restarting the six-question interview. A reusable public link `https://yarnbucket.github.io/TAI2ME/#update` opens the same update dialog. The dialog fetches `./classroom-update.json` from this repository on **each user-initiated opening**, using `cache:'no-store'`; displays an update version/date, summary, and read-only exact instructions; supports one-tap clipboard copy; and opens the user's existing validated private conversation bookmark when saved. If the bookmark isn't present, "Find existing class" opens chat-history guidance. Nothing gets inserted or sent to an AI service automatically. The same `#update` URL can be shared in future; we only need to revise and commit `classroom-update.json` to publish a new set of instructions.

If update fetch fails, the copy button remains disabled and the app does not represent stale content as current. This intentionally does not cache or harvest students' conversations or grades. First-party public update text only; no premium integration or enrollment. Editing the JSON does not automatically change old conversations: each existing student copies and sends the latest update **in their same AI chat**, once per version. The progress passport and old private bookmark remain unchanged.

## v1.16 — UPDATE badge and on-open notification

Whenever TAI2ME is opened, becomes visible, or reconnects, it checks the current first-party `classroom-update.json` with a no-cache fetch. If that version has not been **copied** on this device, a compact **UPDATE** badge appears by the version indicator and a one-time in-app notification appears: **UPDATE — New classroom instructions are available.** Students may tap View update, Copy latest update, and paste it into their existing AI chat; TAI2ME cannot send on their behalf. The update notice is displayed at most once per version per browser/device; the badge remains until the user successfully copies that version. The app optionally uses `navigator.setAppBadge(1)`/ `clearAppBadge()` on platforms that permit app-icon badging, without showing any permission prompt.

This is NOT background push: when the PWA is fully closed no messages are delivered. Real system push requires an opt-in notification permission, a push subscription service, and a server capable of transmitting Web Push messages. iPhone supports Web Push for installed Home Screen web apps on iOS 16.4+, subject to user authorization. GitHub Pages itself cannot send these notifications; no user identifiers or push endpoints are collected by this version.

Only the current public JSON update version is compared to a locally stored copied-version preference; the user remains in control of their existing AI conversation. If an update check fails, no false "new update" is displayed.

## v1.17 — Personalized lessons for any subject

Keep the existing six-question interview and add an optional **Or choose your own subject** text field on the interests screen (example buttons: Biology; Modern car engines). A learner who types a subject does not need to select an AI interest. The success-goal question includes **Understand my subject**. The chosen subject is a simple, length-limited topic label in temporary browser memory only; it is not sent to TAI2ME servers, and it is presented as topic data rather than instructions inside the copied learning prompt.

The learning-path preview and course generated by the learner's own AI are subject-focused rather than automatically teaching AI. Biology and modern engines offer concrete five-step starter outlines; arbitrary subjects receive a transferable fundamentals→systems→applications→evidence→project outline. For custom learning, the separate AI-news panel is hidden, and the tutor is instructed to cite current subject developments only if credible free browsing is actually available. The custom tutoring prompt preserves one-question-at-a-time teaching, gentle diagnostics, 10-correct challenge tiers, fair grading, physical/medical safety, free-tier access, and a copyable progress passport. Existing AI-only learning paths, class shortcuts, update badge and update link remain unchanged.

The new custom topic can contain up to 80 characters and is never inserted as HTML: it is displayed with textContent. Launch-link prefill was tested for biology, engines, astronomy, long topic strings, mixed AI subjects and existing AI-only onboarding.

## v1.18 — Any subject, no predefined course buckets

Student-typed subject now appears above the optional AI topic list in the same six-step interview. Subjects need not match any of TAI2ME's examples or predefined categories. We removed the hardcoded biology/car-engine keyword classifier, which could misread a niche or historical subject. The learning-plan preview is an open framework, and the learner's own AI creates a specific course from the actual stated topic with level-appropriate lessons, safeguards and applied practice. AI familiarity is never mistaken for subject mastery. The app retains free-tier teaching, graded answer verification, ten-in-a-row challenge tiers, current-topic context (only when verified), class shortcuts, and the permanent classroom update system.
