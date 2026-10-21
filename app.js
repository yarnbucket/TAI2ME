'use strict';

// Privacy-first public demo. No analytics, tracking, accounts, or storage of quiz answers.
// A user-approved classroom URL/provider bookmark may be saved locally, never uploaded.
// All curriculum content in this file is public. Do not put paid lessons or secrets in a public PWA.
const QUESTIONS = [
  { key: 'experience', title: 'Where are you with AI today?', hint: 'Every starting point is welcome. This helps set the right pace.', multi: false, choices: [
    ['new','🌱','Brand new','I am starting from zero.'],
    ['exploring','🔍','Just exploring','I have tried an AI assistant a little.'],
    ['confident','⚡','Already using AI','I use AI and want to go deeper.'],
    ['advanced','🧩','Experienced with AI','I use AI regularly and want to keep growing.']
  ] },
  { key: 'motivation', title: 'What brings you here?', hint: 'Choose the reason that feels most important to you right now.', multi: false, choices: [
    ['curious','💡','Personal curiosity','Learn what AI can really do.'],
    ['work','💼','Improve my work','Use AI to solve everyday problems.'],
    ['career','📈','Grow my career','Build valuable new skills.'],
    ['creator','🚀','I have an idea','Create an app, game, or digital tool.'],
    ['credentials','🎓','Professional learning','Prepare for credentials or more study.']
  ] },
  { key: 'interests', title: 'What would you love to learn?', hint: 'Choose up to five interests. Core prompting skills are included in every path.', multi: true, max: 5, choices: [
    ['ai-basics','🧠','Everyday AI','Understand and use AI confidently.'],
    ['prompting','✍️','Prompting','Learn to ask, verify, and improve.'],
    ['vibe-coding','✨','Vibe coding','Direct AI to help build ideas.'],
    ['python','🐍','Python','Understand practical programming.'],
    ['javascript','🟨','JavaScript','Make websites interactive.'],
    ['json','🗂️','JSON & file structure','Learn how app files work together.'],
    ['pwa','📱','PWAs','Build and share installable web apps.'],
    ['agents','🤖','Automation & agents','Understand workflows and guardrails.'],
    ['safety','🛡️','Safety & privacy','Learn secure, responsible practices.'],
    ['certification','🏅','Certification prep','Practice against published objectives.'],
    ['publishing','🌍','App publishing','Learn about stores and monetization.']
  ] },
  { key: 'style', title: 'How do you prefer to learn?', hint: 'Your AI tutor can change teaching style as you progress.', multi: false, choices: [
    ['guided','🪜','One step at a time','Explain, check, and continue.'],
    ['hands-on','🛠️','Build as I learn','Learn through small projects.'],
    ['challenge','🎯','Challenge me','Quizzes, examples, and harder tasks.'],
    ['balanced','⚖️','A balanced mix','Theory, practice, and assessment.']
  ] },
  { key: 'duration', title: 'What fits your schedule?', hint: 'Short, steady sessions are a great way to build skills.', multi: false, choices: [
    ['10','⏱️','10 minutes','Quick focused sessions.'],
    ['20','🕑','20 minutes','A little practice each day.'],
    ['30','📖','30 minutes','A full mini-lesson.'],
    ['45','🔥','45 minutes','Time for deeper exercises.']
  ] },
  { key: 'goal', title: 'What would success look like?', hint: 'This is your first milestone, not a limit on what comes next.', multi: false, choices: [
    ['confidence','🌟','Understand AI','Explain key ideas and use AI well.'],
    ['first-app','📱','Build my first app','Create and share a working project.'],
    ['portfolio','🧰','Build a portfolio','Showcase real skills and projects.'],
    ['exam','🏆','Prepare for certification','Build knowledge for outside exams.'],
    ['launch','💸','Launch a product','Learn to publish and explore revenue.']
  ] }
];

const app = document.querySelector('#app');
const answers = Object.create(null);
let step = -1;
let provider = 'ChatGPT';

const PROVIDERS = [
  {name:'ChatGPT',url:'https://chatgpt.com/'},
  {name:'Gemini',url:'https://gemini.google.com/app'},
  {name:'Claude',url:'https://claude.ai/new'},
  {name:'Copilot',url:'https://copilot.microsoft.com/'},
  {name:'Other AI',url:null}
];
const findQuestion = key => QUESTIONS.find(q => q.key === key);
const label = (key, value) => {
  const q = findQuestion(key);
  const found = q.choices.find(c => c[0] === value);
  return found ? found[2] : '';
};
const selectedTopics = () => Array.isArray(answers.interests) ? answers.interests.map(v => label('interests', v)) : [];

function render() {
  if (step < 0) return renderWelcome();
  if (step >= QUESTIONS.length) return renderResult();
  renderQuestion(QUESTIONS[step]);
}
function renderWelcome() {
  app.innerHTML = `<section class="hero" aria-labelledby="welcome-title">
    <p class="eyebrow">TAI2ME · LEARN ON YOUR OWN TERMS</p>
    <h1 id="welcome-title">Your AI. <span class="accent">Your classroom.</span></h1>
    <p class="lede">Answer six quick questions, then turn the AI you already use into your personal, adaptive tutor. Real lessons, questions, grading, creative projects, and safeguards—at your pace.</p>
    <div class="promise-row"><span class="promise">✓ No sign-up</span><span class="promise">✓ No tracking</span><span class="promise">✓ You choose what to share</span></div>
    <button type="button" class="primary" id="begin">Build my AI classroom <span aria-hidden="true">→</span></button>
    <p class="hero-note">Takes about 2 minutes · No sign-up, tracking, or passwords · Works with your own AI account.</p>
    <button type="button" class="return-help-btn" id="find-class">Already have a class? Find or continue it here →</button>
    <div class="mini-flow"><strong>YOUR INTERESTS</strong><span aria-hidden="true">→</span><strong>YOUR LEARNING PLAN</strong><span aria-hidden="true">→</span><strong>YOUR AI</strong></div>
  </section>`;
  document.querySelector('#begin').addEventListener('click', () => { step = 0; renderAndFocus(); });
  document.querySelector('#find-class').addEventListener('click', () => openClassSettings());
}
function renderQuestion(q) {
  const value = answers[q.key];
  const selected = q.multi ? (value || []) : value;
  app.innerHTML = `<section class="workspace" aria-labelledby="question-title">
     <div class="step-top"><span>YOUR STARTING POINT</span><span>QUESTION ${step + 1} OF ${QUESTIONS.length}</span></div>
     <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${step + 1}" aria-label="Questionnaire progress"><div class="progress-fill"></div></div>
     <div class="question-panel"><p class="eyebrow">A little about your learning goals</p><h1 id="question-title">${q.title}</h1><p class="hint">${q.hint}</p>
       <div id="choices" class="choice-list" aria-label="Answer options"></div>
       <p id="help" class="helper-line" role="status"></p>
       <div class="question-actions"><button type="button" class="secondary" id="back">← Back</button><button type="button" class="primary" id="next" disabled>${step === QUESTIONS.length - 1 ? 'See my path' : 'Continue'} →</button></div>
     </div>
   </section>`;
  document.querySelector('.progress-fill').style.width = `${Math.round(((step + 1) / QUESTIONS.length) * 100)}%`;
  const container = document.querySelector('#choices');
  q.choices.forEach(choice => {
    const [id, icon, title, desc] = choice;
    const isSelected = q.multi ? selected.includes(id) : selected === id;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'choice' + (isSelected ? ' selected' : '');
    button.setAttribute('aria-pressed', String(isSelected));
    button.innerHTML = `<span class="choice-icon" aria-hidden="true">${icon}</span><span class="choice-text"><strong>${title}</strong><small>${desc}</small></span><span class="check" aria-hidden="true">${isSelected ? '✓' : ''}</span>`;
    button.addEventListener('click', () => selectOption(q, id));
    container.append(button);
  });
  document.querySelector('#back').addEventListener('click', () => { step -= 1; renderAndFocus(); });
  document.querySelector('#next').addEventListener('click', () => { if (hasSelection(q)) { step += 1; renderAndFocus(); } });
  updateQuestionState(q);
}
function hasSelection(q) {
  const value = answers[q.key];
  return q.multi ? Array.isArray(value) && value.length > 0 : typeof value === 'string';
}
function selectOption(q, id) {
  if (!q.multi) answers[q.key] = id;
  else {
    const current = Array.isArray(answers[q.key]) ? [...answers[q.key]] : [];
    if (current.includes(id)) answers[q.key] = current.filter(v => v !== id);
    else if (current.length < q.max) answers[q.key] = [...current, id];
    else { document.querySelector('#help').textContent = `Select up to ${q.max} interests. Remove one to add another.`; return; }
  }
  document.querySelectorAll('#choices .choice').forEach((button, i) => {
    const choiceId = q.choices[i][0];
    const active = q.multi ? (answers[q.key] || []).includes(choiceId) : answers[q.key] === choiceId;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
    button.querySelector('.check').textContent = active ? '✓' : '';
  });
  updateQuestionState(q);
}
function updateQuestionState(q) {
  document.querySelector('#next').disabled = !hasSelection(q);
  document.querySelector('#help').textContent = q.multi ? `${(answers[q.key] || []).length} of ${q.max} selected` : 'Your answers stay in this browser tab until you close or refresh it.';
}
function makePath() {
  const interestIds = answers.interests || [];
  const items = [];
  const add = value => { if (!items.includes(value)) items.push(value); };
  add('Core prompting: clear requests, useful context, verifying answers, and safe use');
  if (answers.experience === 'new' || answers.experience === 'exploring') add('AI fundamentals and critical thinking');
  else add('Evaluating AI results and responsible workflows');
  // Make the student's outcome visible first: a 5-item limit must not hide their stated goal.
  if (interestIds.includes('certification') || answers.goal === 'exam') add('Map an official certification syllabus to practice assessments');
  if (interestIds.includes('publishing') || answers.goal === 'launch') add('Deployment, app-store requirements, licensing, and possible revenue models');
  if (interestIds.some(id => ['vibe-coding','python','javascript','json','pwa'].includes(id)) || ['first-app','launch'].includes(answers.goal)) add('HTML, CSS, JavaScript, JSON, and Python fundamentals');
  if (interestIds.includes('pwa') || ['first-app','launch'].includes(answers.goal)) add('Build, test, and share a mobile-friendly PWA');
  if (interestIds.includes('prompting')) add('Practice creating and refining prompts for your chosen interests');
  if (interestIds.includes('agents')) add('Automation and AI agent safeguards');
  if (interestIds.includes('safety')) add('Privacy, secure coding, copyright, and threat awareness');
  if (items.length < 3) add('A mini-project with checkpoints and a reflective review');
  return items.slice(0, 5);
}
function makePrompt() {
  const path = makePath();
  const motivation = label('motivation', answers.motivation);
  const goal = label('goal', answers.goal);
  const experience = label('experience', answers.experience);
  const style = label('style', answers.style);
  return [
    'You are my TAI2ME adaptive learning tutor. TEACH me to think, create, and apply safeguards rather than simply doing my work for me.',
    '',
    'MY CLASSROOM TITLE: TAI2ME — My AI Classroom.',
    'If your platform supports renaming chats, recommend that I rename this conversation to that title and pin it. Do not claim that you have renamed it unless you actually can.',
    'Whenever I return to THIS conversation, continue my most recent mission before starting a new one. Use the previous messages and my latest progress passport to decide where we stopped; ask only if genuinely unclear.',
    'After the first lesson, briefly tell me to find this same conversation in my AI chat history, rename it TAI2ME — My AI Classroom, and pin it if possible. Never suggest that TAI2ME can automatically locate or sync chats.',
    '',
    'MY LEARNING PREFERENCES (general categories only; no personal details):',
    `• Current level: ${experience}`,
    `• Reason for learning: ${motivation}`,
    `• Topics: ${selectedTopics().join(', ')}`,
    `• Preferred style: ${style}`,
    `• Session length: ${answers.duration} minutes`,
    `• First goal: ${goal}`,
    '',
    'SUGGESTED STARTING PATH:',
    ...path.map((item, i) => `${i + 1}. ${item}`),
    '',
    'HOW TO TEACH:',
    '1. Begin with ONE friendly diagnostic question. Use my answer and chosen interests to set the right difficulty; do not assume that AI experience means programming knowledge. Explain my roadmap briefly.',
    '2. Deliver adaptive lessons with short theory, why it works, practical examples and exercises. Weave prompting skills into every pathway: clarity, context, instructions, iteration, checking uncertain answers and protecting private information. Offer experienced students a quick chance to demonstrate mastery, then advance; teach and reassess as needed. Do not force technical topics unless I choose them. Map modern tools to timeless principles.',
    '3. Ask ONE question at a time and wait for me before continuing. Prefer ~80% multiple-choice and ~20% short written answers initially, then increase written/project work as I advance. Do not reveal the correct answer before I respond.',
    '4. Grade fairly out of 100 with clear criteria, explain what I missed, and adapt the next exercise. Distinguish verified facts from inference; never invent my scores or progress.',
    '5. Target at least 80% mastery before advancing. Offer hints, review, and a fresh equivalent assessment when I struggle, without simply supplying answers.',
    '6. For technical topics, teach HTML/index.html, CSS, JavaScript, JSON/array indexes, Python, PWA manifest, service workers, GitHub Pages, testing, accessibility, and safe deployment at a level suited to me. Require me to explain AI-generated code.',
    '7. For creators, coach me from idea and prototype to safe launch, respecting third-party rights, store policies, privacy, and monetization realities. For credentials, provide certification PREPARATION only—never claim accreditation or college credit.',
    '8. Do NOT ask for passwords, payment details, identification, private API keys, or confidential files. Encourage redaction. Ask before suggesting actions that publish, spend money, access accounts, or share information.',
    '9. Build safeguards into each lesson. No malware, deceptive data gathering, or code that exfiltrates secrets. Teach secure defaults, practical testing, human review, attribution, copyright, and software licensing.',
    '10. For changing facts or product rules, verify using trustworthy current sources if you have access; otherwise say that you cannot confirm them. When you cannot do something, describe a safe alternative.',
    '11. End each session with a compact, copyable PROGRESS PASSPORT that contains ONLY course, mission, topic, grade, strengths, next step, and no private details. Tell me I can paste that into a future AI chat to resume; do not claim persistent tracking.',
    '',
    `Start my first ${answers.duration}-minute lesson now. Explain my first objective in plain language and ask ONE diagnostic question. Wait for my response.`,
  ].join('\n');
}
function renderResult() {
  const path = makePath();
  app.innerHTML = `<section class="workspace" aria-labelledby="result-title">
    <div class="result-panel">
      <p class="eyebrow">TAI2ME · READY TO LEARN</p>
      <h1 id="result-title">Meet your <span class="accent">AI tutor.</span></h1>
      <p class="result-intro">Your ${answers.duration}-minute classroom is ready. Review your instructions, choose your AI, then launch. Nothing is shared until you take action.</p>
      <div class="result-grid">
        <div class="info-card"><h3>Suggested learning path</h3><ol id="path-list"></ol></div>
        <div class="info-card"><h3>Built around you</h3><p id="summary"></p></div>
      </div>
      <div class="prompt-panel">
        <div class="prompt-head"><h3>1 · Pick your own AI</h3></div>
        <div class="selector" id="providers" aria-label="Your preferred AI provider"></div>
        <h3>2 · Preview your classroom instructions</h3>
        <p class="prompt-help">This is the exact classroom setup we will use. It contains broad topics and preferences—no names, passwords, or sensitive details.</p>
        <div id="prompt-text" class="prompt-box" role="region" aria-label="Generated learning prompt" tabindex="0"></div>
        <p id="copy-status" class="copy-status" role="status"></p>
        <div class="result-actions"><a class="primary" id="open-ai" target="_blank" rel="noopener noreferrer">Open ChatGPT with my instructions ↗</a><button type="button" class="secondary" id="copy-prompt">Copy instructions</button></div>
        <p id="launch-note" class="microcopy" role="status"></p>
        <p id="other-ai" class="microcopy" hidden>Choose Copy instructions, then open your preferred AI assistant and paste them into a new conversation.</p>
        <div class="save-class-help"><strong>Important: your class lives in your AI's existing chat history.</strong> After your first lesson, rename or pin that chat as <strong>TAI2ME — My AI Classroom</strong>. Then save its private address here for one-tap resume. Never use the Share conversation link.<button type="button" id="save-class-open" class="secondary">Save / find my existing class →</button></div>
        <a id="open-ai-plain" class="plain-ai-link" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open AI without putting instructions in a link ↗</a>
      </div>
      <div class="notice"><strong>Privacy checkpoint:</strong> Prefilled AI links contain the classroom instructions in the URL, which can appear in browser history and be received or logged by the chosen provider. This uses only your general learning preferences; review the text above before launching. Choose Copy instructions and the plain link for more privacy. TAI2ME does not collect your answers or connect to your AI account.</div>
      <div class="btn-row"><button type="button" id="edit-answers" class="secondary">← Edit answers</button><button type="button" id="reset" class="reset">Erase this session and start again</button></div>
      <p class="resource-note">TAI2ME is a self-guided starter, not an accredited school. It cannot control another AI assistant or promise certification, course credit, or grading accuracy. Your AI chat does not automatically sync back to this app.</p>
    </div>
  </section>`;
  const list = document.querySelector('#path-list');
  path.forEach(item => {const li=document.createElement('li');li.textContent=item;list.append(li);});
  document.querySelector('#summary').textContent = `${label('experience', answers.experience)} · ${label('style', answers.style)} · ${answers.duration}-minute sessions. Your goal: ${label('goal', answers.goal)}. ${selectedTopics().length} interests selected.`;
  document.querySelector('#prompt-text').textContent = makePrompt();
  const provEl = document.querySelector('#providers');
  PROVIDERS.forEach(item => {
    const button = document.createElement('button');
    button.type='button'; button.className='provider'; button.textContent=item.name;
    button.setAttribute('aria-pressed',String(provider===item.name));
    button.addEventListener('click',()=>{provider=item.name;updateProviders();});
    provEl.append(button);
  });
  document.querySelector('#copy-prompt').addEventListener('click',copyPrompt);
  document.querySelector('#save-class-open').addEventListener('click',()=>openClassSettings(provider));
  document.querySelector('#open-ai').addEventListener('click', () => {
    // Optional clipboard fallback, initiated by the student's direct tap.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(makePrompt()).then(() => {
        document.querySelector('#copy-status').textContent='Instructions copied as backup. If your AI does not prefill, paste them into its message box.';
      }).catch(() => {
        document.querySelector('#copy-status').textContent='If your AI does not prefill, return here and tap Copy instructions.';
      });
    }
  });
  document.querySelector('#edit-answers').addEventListener('click',()=>{step=QUESTIONS.length-1;renderAndFocus();});
  document.querySelector('#reset').addEventListener('click',()=>{for(const key of Object.keys(answers))delete answers[key];step=-1;provider='ChatGPT';renderAndFocus();});
  updateProviders();
}
// Prefill is a provider convenience, not an API or an account connection.
// Students preview what is sent in the URL, and may choose a plain link instead.
function makePrefillLink(item) {
  if (item.name !== 'ChatGPT' && item.name !== 'Claude') return null;
  const base = item.url;
  const url = base + (base.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(makePrompt());
  return url.length <= 6000 ? url : null;
}
function updateProviders() {
  const selected = PROVIDERS.find(p=>p.name===provider);
  document.querySelectorAll('#providers .provider').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===provider)));
  const launch = document.querySelector('#open-ai');
  const plain = document.querySelector('#open-ai-plain');
  const note = document.querySelector('#launch-note');
  const prefill = makePrefillLink(selected);
  if (!selected.url) {
    launch.hidden=true; launch.removeAttribute('href');
    plain.hidden=true; plain.removeAttribute('href');
    note.textContent='Copy the classroom instructions, then open your preferred assistant yourself.';
  } else {
    launch.hidden=false;
    launch.href=prefill || selected.url;
    launch.textContent=prefill ? `Open ${selected.name} with my instructions ↗` : `Open ${selected.name} (paste instructions) ↗`;
    plain.hidden=false; plain.href=selected.url;
    note.textContent=prefill
      ? `The link will carry your visible instructions to ${selected.name}. If its prompt box is empty, use Copy instructions and paste instead. The provider may change or automatically process linked prompts.`
      : `${selected.name} does not have a verified reliable prompt-prefill link here. Copy instructions, open it, and paste to begin.`;
  }
  document.querySelector('#other-ai').hidden=!!selected.url;
}
async function copyPrompt() {
  const content=makePrompt(), status=document.querySelector('#copy-status');
  try {
    // A deliberate button press: never upload, auto-send, or open AI with personal data in a URL.
    await navigator.clipboard.writeText(content);
    status.textContent='Copied! Open your AI, paste into a new chat, and your first lesson begins.';
  } catch (error) {
    status.textContent='Automatic copying is unavailable here. Select the prompt above and copy it manually.';
    document.querySelector('#prompt-text').focus();
  }
}
function renderAndFocus() { render(); window.scrollTo({top:0,behavior:'auto'}); app.focus({preventScroll:true}); }

const privacyToggle=document.querySelector('#privacy-toggle');
privacyToggle.addEventListener('click',()=>{
  const notes=document.querySelector('#privacy-notes'), expanded=privacyToggle.getAttribute('aria-expanded')==='true';
  notes.hidden=expanded; privacyToggle.setAttribute('aria-expanded',String(!expanded));
});

if('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}

// Platform-aware installation guidance. No data collection or external calls.
const installTrigger = document.querySelector('#install-trigger');
const installCallout = document.querySelector('#install-callout');
const installDialog = document.querySelector('#install-dialog');
const installGuide = document.querySelector('#install-guide');
const installDescription = document.querySelector('#install-description');
const installFeedback = document.querySelector('#install-feedback');
const installNative = document.querySelector('#install-native');
let pendingInstallPrompt = null;

function tai2meIsInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}
function updateInstallBadge() {
  installCallout.hidden = tai2meIsInstalled();
}
function showInstallSteps(steps) {
  const list = document.createElement('ol');
  list.className = 'install-steps';
  steps.forEach(text => {
    const item = document.createElement('li');
    item.textContent = text;
    list.append(item);
  });
  installGuide.replaceChildren(list);
}
function updateInstallGuide() {
  const ua = navigator.userAgent || '';
  const appleMobile = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const chromeIOS = /CriOS/i.test(ua);
  installFeedback.textContent = '';
  if (appleMobile) {
    installDescription.textContent = 'On iPhone or iPad, add the TAI2ME icon to your Home Screen. Apple normally uses the Share menu rather than a direct install button.';
    showInstallSteps(chromeIOS ? [
      'Open TAI2ME in Chrome on your iPhone or iPad.',
      'Tap the Share button in Chrome, then choose Add to Home Screen.',
      'Confirm the name TAI2ME and tap Add. For the most consistent web-app experience, you can also open the site in Safari and use its Add to Home Screen option.'
    ] : [
      'Open this TAI2ME page in Safari. If you are inside another app, use its menu to open in Safari.',
      'Tap Share (square with an upward arrow). In newer Safari layouts, you may first tap the Page Menu and then Share.',
      'Scroll and select Add to Home Screen. If missing, scroll to Edit Actions and add it.',
      'Enable Open as Web App if shown, then tap Add. The TAI2ME icon appears on your iPhone or iPad Home Screen.'
    ]);
  } else if (android) {
    installDescription.textContent = 'Chrome has not offered a one-tap install prompt yet. That does not mean your device is broken: you can add the app through Chrome’s menu. A PWA is not an APK download.';
    showInstallSteps([
      'Open this TAI2ME site in Chrome (not inside another app).',
      'Tap Chrome’s three-dot menu (⋮) at the upper right.',
      'Choose Add to Home screen or Install app. Depending on your Chrome version, tap Install or Create shortcut.',
      'Confirm. Check your phone’s Home Screen or app drawer for the TAI2ME icon.'
    ]);
  } else {
    installDescription.textContent = 'On a computer, install TAI2ME from a supported browser or keep using it as a normal website.';
    showInstallSteps([
      'Open TAI2ME in Chrome or Microsoft Edge.',
      'Look for an Install icon in the address bar or the browser menu.',
      'Choose Install TAI2ME and confirm. You can then launch it like a normal desktop app.'
    ]);
  }
  installNative.hidden = appleMobile || !pendingInstallPrompt;
}
function closeInstallGuide() {
  if (typeof installDialog.close === 'function' && installDialog.open) installDialog.close();
  else installDialog.removeAttribute('open');
  if (!tai2meIsInstalled()) installTrigger.focus();
}
function openInstallGuide(message) {
  updateInstallGuide();
  if (message) installFeedback.textContent = message;
  if (typeof installDialog.showModal === 'function') {
    if (!installDialog.open) installDialog.showModal();
  } else installDialog.setAttribute('open', '');
}
async function requestNativeInstall() {
  const event = pendingInstallPrompt;
  if (!event) { openInstallGuide(); return; }
  pendingInstallPrompt = null;
  installNative.hidden = true;
  try {
    await event.prompt();
    const decision = await event.userChoice;
    if (decision.outcome === 'accepted') {
      // Chrome may fire appinstalled later; do not say the installation is complete yet.
      if (installDialog.open) installFeedback.textContent = 'Installation requested. Follow Chrome’s confirmation and check your Home Screen.';
    } else {
      openInstallGuide('The install prompt was dismissed. You can still add the app using the browser menu.');
    }
  } catch (error) {
    openInstallGuide('Automatic installation is unavailable in this browser. Use the steps below to add TAI2ME.');
  }
}
installTrigger.addEventListener('click', () => {
  if (tai2meIsInstalled()) return;
  // Android Chrome offers a real OS install prompt when eligible; invoke it
  // directly from the user's tap. On iOS or other browsers, show instructions.
  if (pendingInstallPrompt) { void requestNativeInstall(); return; }
  openInstallGuide();
});
document.querySelector('#install-close').addEventListener('click', closeInstallGuide);
document.querySelector('#install-done').addEventListener('click', closeInstallGuide);
installDialog.addEventListener('click', event => {
  if (event.target === installDialog) closeInstallGuide();
});
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  pendingInstallPrompt = event;
  if (installDialog.open) updateInstallGuide();
});
installNative.addEventListener('click', () => { void requestNativeInstall(); });
window.addEventListener('appinstalled', () => {
  pendingInstallPrompt = null;
  updateInstallBadge();
  if (installDialog.open) installDialog.close();
});
window.matchMedia('(display-mode: standalone)').addEventListener?.('change', updateInstallBadge);
updateInstallBadge();


// Return-to-classroom bookmark. TAI2ME cannot access provider accounts or chat history.
// Saving is opt-in and stays in this device's browser storage (no server).
const CLASS_KEY = 'tai2me_saved_classroom_v1';
const CLASS_TITLE = 'TAI2ME — My AI Classroom';
const classDialog = document.querySelector('#class-link-dialog');
const classProviderInput = document.querySelector('#class-provider');
const classURLInput = document.querySelector('#class-url');
const classFeedback = document.querySelector('#class-link-feedback');
const classResumeAvailable = document.querySelector('#class-resume-available');
const classResumeLink = document.querySelector('#class-resume-link');
const classOpenProvider = document.querySelector('#class-open-provider');
const classOrigins = Object.freeze({
  ChatGPT: 'https://chatgpt.com/',
  Gemini: 'https://gemini.google.com/app',
  Claude: 'https://claude.ai/new',
  Copilot: 'https://copilot.com/',
  'Other AI': ''
});
const classProviderByHost = Object.freeze({
  'chatgpt.com': 'ChatGPT',
  'gemini.google.com': 'Gemini',
  'claude.ai': 'Claude'
});

function validatedClassLink(raw) {
  const value = raw.trim();
  if (!value) return {url:'',provider:null};
  // This is always a normal address-bar URL, never a public shared-chat link.
  let parsed;
  try { parsed = new URL(value); } catch(e) { throw new Error('Paste the full https:// conversation address from your browser.'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) {
    throw new Error('Only standard HTTPS conversation links are accepted.');
  }
  const providerName = classProviderByHost[parsed.hostname.toLowerCase()];
  if (!providerName) throw new Error('Direct reopening is supported only for private ChatGPT, Gemini and Claude conversation links. Other providers use chat history.');
  const pathname = parsed.pathname;
  let valid = false;
  if (providerName === 'ChatGPT') valid = /^\/c\/[a-zA-Z0-9-]{10,128}\/?$/.test(pathname);
  if (providerName === 'Gemini') valid = /^\/app\/[a-zA-Z0-9_-]{6,160}\/?$/.test(pathname);
  if (providerName === 'Claude') valid = /^\/chat\/[a-zA-Z0-9-]{6,160}\/?$/.test(pathname);
  if (!valid) throw new Error('This does not look like your private conversation page. Do not use Share links; open your chat in a browser and copy its address bar.');
  return {url:parsed.origin + pathname.replace(/\/$/,''),provider:providerName};
}
function readClassBookmark() {
  try {
    const data = JSON.parse(localStorage.getItem(CLASS_KEY) || 'null');
    if (!data || typeof data !== 'object' || !Object.hasOwn(classOrigins,data.provider)) return null;
    if (data.url) {
      const checked = validatedClassLink(data.url);
      if (checked.provider !== data.provider) return null;
      return {provider:data.provider,url:checked.url};
    }
    return {provider:data.provider,url:''};
  } catch(e) { return null; }
}
function renderClassBookmark() {
  const saved = readClassBookmark();
  // A saved chat can be reopened from the discreet settings dialog only.
  // Never offer a generic AI homepage as "Continue My Class".
  classResumeLink.removeAttribute('href');
  classResumeAvailable.hidden = !saved?.url;
  if (saved?.url) {
    classResumeLink.href = saved.url;
    classResumeLink.textContent = '▶ Continue my ' + saved.provider + ' class';
  }
}
function openClassSettings(preferredProvider) {
  const saved = readClassBookmark();
  const selected = saved?.provider || preferredProvider || 'ChatGPT';
  classProviderInput.value = Object.hasOwn(classOrigins,selected) ? selected : 'ChatGPT';
  classURLInput.value = saved?.url || '';
  updateProviderFindHelp();
  classFeedback.textContent = saved?.url
    ? 'A direct conversation link is saved. You can update it or select your existing chat when you return.'
    : 'Open your existing chat first, copy its browser address bar URL (not Share), and paste it here. Without a direct link you will get a history guide instead.';
  if (typeof classDialog.showModal === 'function') {
    if (!classDialog.open) classDialog.showModal();
  } else classDialog.setAttribute('open','');
}
function closeClassSettings() {
  if (typeof classDialog.close === 'function' && classDialog.open) classDialog.close();
  else classDialog.removeAttribute('open');
}
function updateProviderFindHelp() {
  const providerName = classProviderInput.value;
  const instructions = {
    ChatGPT: 'ChatGPT: Open the sidebar → Recents / chat history. Find your TAI2ME lesson, then use its conversation menu to rename it. In a browser, copy the address bar URL for the same conversation; do NOT tap Share.',
    Gemini: 'Gemini: Open Menu → Recent chats, locate the lesson, and rename or pin it when available. A private /app/ conversation URL can be bookmarked; never use Share conversation.',
    Claude: 'Claude: Open Chats and tasks / the chat sidebar → find the lesson → ⋮ → Rename. Open that chat in a browser and copy its address bar, not a public share link.',
    Copilot: 'Copilot: Open the sidebar / chat history, find the TAI2ME lesson, then use the conversation menu to rename it when available. We will save Copilot as your provider and link to its history, not claim direct conversation access.',
    'Other AI': 'In your preferred AI, open its conversation history and look for “TAI2ME — My AI Classroom.” Use its rename or pin option if available. Save the provider here; a private direct link is not supported.'
  };
  document.querySelector('#provider-find-help').textContent = instructions[providerName] || instructions['Other AI'];
  const url = classOrigins[providerName];
  classOpenProvider.hidden = !url;
  if (url) {
    classOpenProvider.href = url;
    classOpenProvider.textContent = '↗ Open ' + providerName + ' to find my existing chat';
  } else classOpenProvider.removeAttribute('href');
}
classProviderInput.addEventListener('change', updateProviderFindHelp);
// The welcome-page "Find or continue my class" link opens these settings.
document.querySelector('#class-link-close').addEventListener('click',closeClassSettings);
classDialog.addEventListener('click',event => { if (event.target === classDialog) closeClassSettings(); });
document.querySelector('#class-link-save').addEventListener('click',()=>{
  try {
    const checked = validatedClassLink(classURLInput.value);
    if (checked.provider && checked.provider !== classProviderInput.value) {
      classFeedback.textContent = 'This URL belongs to ' + checked.provider + '. Select that AI provider or leave the address empty.';
      return;
    }
    const bookmark = {provider:classProviderInput.value,url:checked.url};
    localStorage.setItem(CLASS_KEY,JSON.stringify(bookmark));
    if (localStorage.getItem(CLASS_KEY) !== JSON.stringify(bookmark)) throw new Error('Browser storage is unavailable.');
    renderClassBookmark();
    classFeedback.textContent = checked.url
      ? 'Saved! Your TAI2ME icon can now reopen this private chat on this device.'
      : 'Saved provider only, not a specific conversation. Use this guide anytime to find your existing lesson in your AI chat history.';
    // Explicit confirmation before closing so the student sees what was saved.
  } catch(e) {
    classFeedback.textContent = e.message || 'Could not save this shortcut; use your AI provider chat history instead.';
  }
});
document.querySelector('#class-link-delete').addEventListener('click',()=>{
  try {localStorage.removeItem(CLASS_KEY);} catch(e) {}
  renderClassBookmark();
  classURLInput.value='';
  classFeedback.textContent='Removed the local bookmark. Your original chat at the AI provider has not been deleted.';
});
renderClassBookmark();

render();
