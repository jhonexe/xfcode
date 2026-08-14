(function () {
  if (document.getElementById('xf-mascot')) return;

  var css = `
    #xf-mascot { position: fixed; right: 24px; bottom: 18px; width: 170px; height: 263px; z-index: 9998; pointer-events: none; }
    #xf-mascot svg { width: 100%; height: 100%; overflow: visible; animation: xf-mascot-bob 4s ease-in-out infinite; }
    @keyframes xf-mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    #xf-mascot .m-shadow { animation: xf-mascot-shadow 4s ease-in-out infinite; }
    @keyframes xf-mascot-shadow { 0%, 100% { opacity: .3; transform: scaleX(1); } 50% { opacity: .15; transform: scaleX(.82); } }
    #xf-mascot .visor { overflow: hidden; }
    #xf-mascot .visor .visor-scan { animation: xf-scan 3.2s ease-in-out infinite; }
    @keyframes xf-scan { 0%, 100% { transform: translateX(-24px); opacity: 0; } 15% { opacity: .9; } 50% { transform: translateX(24px); opacity: .9; } 65% { opacity: 0; } }
    #xf-mascot .m-eye { animation: xf-eye 3.2s ease-in-out infinite; }
    @keyframes xf-eye { 0%, 88%, 100% { opacity: 1; } 93%, 96% { opacity: .15; } }
    #xf-mascot .chest-glow { animation: xf-chest 2.4s ease-in-out infinite; }
    @keyframes xf-chest { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
    @media (max-width: 767px) { #xf-mascot { width: 100px; height: 154px; right: 10px; bottom: 10px; } }
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 220 340');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.innerHTML = `
    <defs>
      <linearGradient id="xf-white" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="55%" stop-color="#f0f0f0"/>
        <stop offset="100%" stop-color="#d5d5d5"/>
      </linearGradient>
      <linearGradient id="xf-white-h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="60%" stop-color="#ececec"/>
        <stop offset="100%" stop-color="#d0d0d0"/>
      </linearGradient>
    </defs>

    <ellipse class="m-shadow" cx="110" cy="330" rx="58" ry="8" fill="#000" opacity=".3"/>

    <circle cx="70" cy="110" r="11" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="150" cy="110" r="11" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="50" y="122" width="18" height="44" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="152" y="122" width="18" height="44" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <circle cx="59" cy="170" r="8" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="161" cy="170" r="8" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="50" y="178" width="18" height="42" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="152" y="178" width="18" height="42" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <circle cx="59" cy="222" r="7" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="161" cy="222" r="7" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="52" y="228" width="14" height="22" rx="7" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="154" y="228" width="14" height="22" rx="7" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>

    <g id="m-body">
      <rect x="72" y="102" width="76" height="90" rx="16" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1.5"/>
      <rect x="80" y="112" width="60" height="36" rx="10" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/>
      <rect class="chest-glow" x="92" y="118" width="36" height="20" rx="6" fill="#141414" stroke="#000" stroke-width="1"/>
      <text x="110" y="132" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="9" font-weight="900" letter-spacing="0.5">
        <tspan fill="#ffffff">XF </tspan><tspan fill="#ff1a1a">CODE</tspan>
      </text>
      <rect x="84" y="154" width="52" height="26" rx="10" fill="#e8e8e8" stroke="#cfcfcf" stroke-width="1"/>
      <circle cx="98" cy="167" r="4" fill="#ff1a1a" opacity=".7"/>
      <circle cx="110" cy="167" r="4" fill="#ff1a1a" opacity=".4"/>
      <circle cx="122" cy="167" r="4" fill="#ff1a1a" opacity=".7"/>
    </g>

    <g id="m-head">
      <rect x="103" y="90" width="14" height="12" rx="4" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
      <rect x="82" y="38" width="56" height="52" rx="14" fill="url(#xf-white)" stroke="#bdbdbd" stroke-width="1.5"/>
      <g class="visor">
        <rect x="88" y="48" width="44" height="17" rx="8" fill="#111111" stroke="#000" stroke-width="1"/>
        <circle id="m-eye-l" class="m-eye" cx="99" cy="56.5" r="3" fill="#ff1a1a"/>
        <circle id="m-eye-r" class="m-eye" cx="121" cy="56.5" r="3" fill="#ff1a1a"/>
        <rect class="visor-scan" x="88" y="48" width="18" height="17" rx="8" fill="#ffffff" opacity=".08"/>
      </g>
      <rect x="90" y="70" width="40" height="4" rx="2" fill="#d0d0d0"/>
    </g>

    <circle cx="93" cy="195" r="10" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="127" cy="195" r="10" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="84" y="200" width="18" height="50" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="118" y="200" width="18" height="50" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <circle cx="93" cy="252" r="9" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="127" cy="252" r="9" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="84" y="260" width="18" height="46" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="118" y="260" width="18" height="46" rx="9" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <circle cx="93" cy="308" r="8" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <circle cx="127" cy="308" r="8" fill="#1c1c1c" stroke="#000" stroke-width="1"/>
    <rect x="76" y="314" width="30" height="12" rx="6" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
    <rect x="114" y="314" width="30" height="12" rx="6" fill="url(#xf-white-h)" stroke="#bdbdbd" stroke-width="1"/>
  `;
  var container = document.createElement('div');
  container.id = 'xf-mascot';
  container.appendChild(svg);
  document.body.appendChild(container);

  var head = document.getElementById('m-head');
  var eyeL = document.getElementById('m-eye-l');
  var eyeR = document.getElementById('m-eye-r');

  var targetX = 0, targetY = 0, curX = 0, curY = 0;

  window.addEventListener('mousemove', function (e) {
    targetX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
    targetY = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
  }, { passive: true });

  function tick() {
    curX += (targetX - curX) * 0.07;
    curY += (targetY - curY) * 0.07;
    head.setAttribute('transform',
      'translate(0 ' + (-Math.round(curY * 5)) + ') rotate(' + (curX * 16).toFixed(2) + ' 110 95)');
    var px = curX * 4;
    var py = curY * 2.5;
    eyeL.setAttribute('cx', (99 + px).toFixed(2));
    eyeR.setAttribute('cx', (121 + px).toFixed(2));
    eyeL.setAttribute('cy', (56.5 + py).toFixed(2));
    eyeR.setAttribute('cy', (56.5 + py).toFixed(2));
    requestAnimationFrame(tick);
  }
  tick();
})();
