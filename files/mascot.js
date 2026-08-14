(function () {
  if (document.getElementById('xf-mascot')) return;

  var css = `
    #xf-mascot { position: fixed; right: 24px; bottom: 18px; width: 190px; height: 259px; z-index: 9998; pointer-events: none; }
    #xf-mascot svg { width: 100%; height: 100%; overflow: visible; animation: xf-mascot-bob 3.4s ease-in-out infinite; }
    @keyframes xf-mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    #xf-mascot .m-shadow { animation: xf-mascot-shadow 3.4s ease-in-out infinite; }
    @keyframes xf-mascot-shadow { 0%, 100% { opacity: .35; transform: scaleX(1); } 50% { opacity: .18; transform: scaleX(.8); } }
    #xf-mascot .m-eyes { transform-box: fill-box; transform-origin: center; animation: xf-mascot-blink 5.2s infinite; }
    @keyframes xf-mascot-blink { 0%, 92%, 100% { transform: scaleY(1); } 95%, 98% { transform: scaleY(.06); } }
    #xf-mascot .antenna-ball { animation: xf-antenna 1.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes xf-antenna { 0%, 100% { opacity: .55; transform: scale(.92); } 50% { opacity: 1; transform: scale(1.08); } }
    #xf-mascot .chest-glow { animation: xf-chest 2.2s ease-in-out infinite; }
    @keyframes xf-chest { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
    #xf-mascot .m-arm-r { transform-box: fill-box; transform-origin: top center; animation: xf-wave 4.2s ease-in-out infinite; }
    @keyframes xf-wave { 0%, 88%, 100% { transform: rotate(0deg); } 92% { transform: rotate(18deg); } 96% { transform: rotate(0deg); } }
    @media (max-width: 767px) { #xf-mascot { width: 110px; height: 150px; right: 10px; bottom: 10px; } }
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 220 300');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.innerHTML = `
    <ellipse class="m-shadow" cx="110" cy="288" rx="55" ry="8" fill="#000" opacity=".3"/>

    <line x1="110" y1="58" x2="110" y2="38" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>
    <circle class="antenna-ball" cx="110" cy="33" r="8" fill="#ff1a1a"/>
    <circle class="antenna-ball" cx="110" cy="33" r="14" fill="#ff1a1a" opacity=".25"/>

    <g class="m-arm-r">
      <circle cx="62" cy="152" r="9" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
      <line x1="62" y1="155" x2="52" y2="195" stroke="#2b2b2b" stroke-width="12" stroke-linecap="round"/>
      <circle cx="52" cy="195" r="6" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
      <line x1="52" y1="198" x2="58" y2="225" stroke="#2b2b2b" stroke-width="12" stroke-linecap="round"/>
      <circle cx="58" cy="229" r="8" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
    </g>

    <g id="m-body">
      <rect x="64" y="138" width="92" height="96" rx="14" fill="#3a0a0a" stroke="#ff1a1a" stroke-width="3"/>
      <path d="M82 138 L100 153 L118 138" fill="none" stroke="#ff1a1a" stroke-width="3" stroke-linecap="round"/>
      <line x1="110" y1="153" x2="110" y2="172" stroke="#ff1a1a" stroke-width="2" stroke-linecap="round"/>
      <circle cx="110" cy="160" r="1.6" fill="#ff1a1a"/>
      <circle cx="110" cy="166" r="1.6" fill="#ff1a1a"/>
      <text x="110" y="200" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="15" font-weight="900">
        <tspan fill="#ffffff">XF </tspan><tspan fill="#ff1a1a">CODE</tspan>
      </text>
      <circle class="chest-glow" cx="110" cy="222" r="5" fill="#ff1a1a"/>
    </g>

    <g id="m-head">
      <rect x="66" y="84" width="6" height="18" rx="3" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="1.5"/>
      <rect x="148" y="84" width="6" height="18" rx="3" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="1.5"/>
      <rect x="72" y="58" width="76" height="72" rx="16" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="3"/>
      <g class="m-eyes">
        <circle cx="95" cy="92" r="14" fill="#ffffff" stroke="#ff1a1a" stroke-width="2"/>
        <circle cx="125" cy="92" r="14" fill="#ffffff" stroke="#ff1a1a" stroke-width="2"/>
        <circle id="m-pupil-l" cx="95" cy="94" r="6" fill="#0a0505"/>
        <circle id="m-pupil-r" cx="125" cy="94" r="6" fill="#0a0505"/>
        <circle id="m-shine-l" cx="92" cy="89" r="2.2" fill="#ffffff"/>
        <circle id="m-shine-r" cx="122" cy="89" r="2.2" fill="#ffffff"/>
      </g>
      <line x1="102" y1="112" x2="102" y2="119" stroke="#ff1a1a" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="108" y1="112" x2="108" y2="119" stroke="#ff1a1a" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="114" y1="112" x2="114" y2="119" stroke="#ff1a1a" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <rect x="104" y="128" width="12" height="10" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="1.5"/>

    <rect x="90" y="234" width="16" height="42" rx="6" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
    <rect x="114" y="234" width="16" height="42" rx="6" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
    <rect x="84" y="272" width="28" height="12" rx="6" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
    <rect x="108" y="272" width="28" height="12" rx="6" fill="#2b2b2b" stroke="#ff1a1a" stroke-width="2"/>
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
      'translate(0 ' + (-Math.round(curY * 6)) + ') rotate(' + (curX * 20).toFixed(2) + ' 110 130)');
    var px = curX * 6;
    var py = curY * 4;
    pupilL.setAttribute('cx', (95 + px).toFixed(2));
    pupilR.setAttribute('cx', (125 + px).toFixed(2));
    pupilL.setAttribute('cy', (94 + py).toFixed(2));
    pupilR.setAttribute('cy', (94 + py).toFixed(2));
    shineL.setAttribute('cx', (92 + px).toFixed(2));
    shineR.setAttribute('cx', (122 + px).toFixed(2));
    shineL.setAttribute('cy', (89 + py).toFixed(2));
    shineR.setAttribute('cy', (89 + py).toFixed(2));
    requestAnimationFrame(tick);
  }
  tick();
})();
