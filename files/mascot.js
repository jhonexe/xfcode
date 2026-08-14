(function () {
  if (document.getElementById('xf-mascot')) return;

  var css = `
    #xf-mascot { position: fixed; right: 20px; bottom: 14px; width: 120px; height: 144px; z-index: 9998; pointer-events: none; }
    #xf-mascot svg { width: 100%; height: 100%; overflow: visible; animation: xf-mascot-bob 3.4s ease-in-out infinite; }
    @keyframes xf-mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    #xf-mascot .m-shadow { animation: xf-mascot-shadow 3.4s ease-in-out infinite; }
    @keyframes xf-mascot-shadow { 0%, 100% { opacity: .35; transform: scaleX(1); } 50% { opacity: .18; transform: scaleX(.8); } }
    #xf-mascot .m-eyes { transform-box: fill-box; transform-origin: center; animation: xf-mascot-blink 5.2s infinite; }
    @keyframes xf-mascot-blink { 0%, 92%, 100% { transform: scaleY(1); } 95%, 98% { transform: scaleY(.05); } }
    #xf-mascot .antenna-ball { animation: xf-antenna 1.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes xf-antenna { 0%, 100% { opacity: .55; transform: scale(.92); } 50% { opacity: 1; transform: scale(1.08); } }
    #xf-mascot .chest-glow { animation: xf-chest 2.2s ease-in-out infinite; }
    @keyframes xf-chest { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
    #xf-mascot .m-arm-l, #xf-mascot .m-arm-r { transform-box: fill-box; transform-origin: top center; animation: xf-wave 4.2s ease-in-out infinite; }
    @keyframes xf-wave { 0%, 88%, 100% { transform: rotate(0deg); } 92% { transform: rotate(16deg); } 96% { transform: rotate(0deg); } }
    @media (max-width: 767px) { #xf-mascot { width: 72px; height: 86px; right: 8px; bottom: 8px; } }
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 240');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.innerHTML = `
    <ellipse class="m-shadow" cx="100" cy="228" rx="46" ry="8" fill="#000" opacity=".3"/>
    <line x1="100" y1="58" x2="100" y2="32" stroke="#0a0505" stroke-width="4" stroke-linecap="round"/>
    <circle class="antenna-ball" cx="100" cy="27" r="7" fill="#ff1a1a"/>
    <circle class="antenna-ball" cx="100" cy="27" r="12" fill="#ff1a1a" opacity=".25"/>
    <path class="m-arm-l" d="M61 168 L38 184" stroke="#1a0a0a" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path class="m-arm-r" d="M139 168 L162 184" stroke="#1a0a0a" stroke-width="10" stroke-linecap="round" fill="none"/>
    <g id="m-body">
      <rect x="58" y="148" width="84" height="72" rx="18" fill="#140808" stroke="#ff1a1a" stroke-width="3"/>
      <rect class="chest-glow" x="88" y="170" width="24" height="14" rx="7" fill="#ff1a1a"/>
      <circle cx="100" cy="202" r="4" fill="#ff1a1a" opacity=".8"/>
    </g>
    <g id="m-head">
      <rect x="55" y="70" width="90" height="80" rx="26" fill="#140808" stroke="#ff1a1a" stroke-width="3"/>
      <g class="m-eyes">
        <ellipse cx="78" cy="106" rx="16" ry="17" fill="#ffffff"/>
        <ellipse cx="122" cy="106" rx="16" ry="17" fill="#ffffff"/>
        <circle id="m-pupil-l" cx="78" cy="108" r="7" fill="#0a0505"/>
        <circle id="m-pupil-r" cx="122" cy="108" r="7" fill="#0a0505"/>
        <circle id="m-shine-l" cx="75" cy="102" r="2.5" fill="#ffffff"/>
        <circle id="m-shine-r" cx="119" cy="102" r="2.5" fill="#ffffff"/>
      </g>
      <path d="M88 132 Q100 140 112 132" fill="none" stroke="#ff1a1a" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <rect x="66" y="216" width="26" height="12" rx="6" fill="#140808" stroke="#ff1a1a" stroke-width="2"/>
    <rect x="108" y="216" width="26" height="12" rx="6" fill="#140808" stroke="#ff1a1a" stroke-width="2"/>
  `;
  var container = document.createElement('div');
  container.id = 'xf-mascot';
  container.appendChild(svg);
  document.body.appendChild(container);

  var head = document.getElementById('m-head');
  var pupilL = document.getElementById('m-pupil-l');
  var pupilR = document.getElementById('m-pupil-r');
  var shineL = document.getElementById('m-shine-l');
  var shineR = document.getElementById('m-shine-r');

  var targetX = 0, targetY = 0, curX = 0, curY = 0;

  window.addEventListener('mousemove', function (e) {
    targetX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
    targetY = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
  }, { passive: true });

  function tick() {
    curX += (targetX - curX) * 0.07;
    curY += (targetY - curY) * 0.07;
    head.setAttribute('transform',
      'translate(0 ' + (-Math.round(curY * 6)) + ') rotate(' + (curX * 20).toFixed(2) + ' 100 105)');
    var px = curX * 6;
    var py = curY * 4;
    pupilL.setAttribute('cx', (78 + px).toFixed(2));
    pupilR.setAttribute('cx', (122 + px).toFixed(2));
    pupilL.setAttribute('cy', (108 + py).toFixed(2));
    pupilR.setAttribute('cy', (108 + py).toFixed(2));
    shineL.setAttribute('cx', (75 + px).toFixed(2));
    shineR.setAttribute('cx', (119 + px).toFixed(2));
    shineL.setAttribute('cy', (102 + py).toFixed(2));
    shineR.setAttribute('cy', (102 + py).toFixed(2));
    requestAnimationFrame(tick);
  }
  tick();
})();
