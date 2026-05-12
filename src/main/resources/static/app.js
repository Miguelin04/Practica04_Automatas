// =====================================================================
//  SVG HELPER FUNCTIONS
// =====================================================================

function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", height);
    return svg;
}

function svgText(svg, x, y, txt, color = "#93c5fd", size = 11) {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x); t.setAttribute("y", y);
    t.setAttribute("fill", color);
    t.setAttribute("font-family", "Fira Code, monospace");
    t.setAttribute("font-size", size);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("dominant-baseline", "central");
    t.textContent = txt;
    svg.appendChild(t);
    return t; // retornamos para poder cambiar el color en la animación
}

// Flecha inicial → (sin ID porque no hay transición animable)
function drawInitialArrow(svg, x, y, r) {
    const x2 = x - r;
    const x1 = x2 - 44;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y);
    line.setAttribute("x2", x2); line.setAttribute("y2", y);
    line.setAttribute("stroke", "#64748b");
    line.setAttribute("stroke-width", "2.5");
    line.setAttribute("marker-end", "url(#arr)");
    svg.appendChild(line);
}

// Flecha recta entre dos estados (con ID para animación)
function drawStraightArrow(svg, x1, y, x2, r, label, arrowId) {
    const sx = x1 + r, ex = x2 - r;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", sx); line.setAttribute("y1", y);
    line.setAttribute("x2", ex); line.setAttribute("y2", y);
    line.setAttribute("stroke", "#64748b");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arr)");
    if (arrowId) line.setAttribute("id", arrowId);
    svg.appendChild(line);
    const lbl = svgText(svg, (sx + ex) / 2, y - 14, label);
    if (arrowId) lbl.setAttribute("id", arrowId + "-lbl");
}

// Arco curvado por DEBAJO (con ID para animación)
function drawArcBelow(svg, x1, y, x2, r, label, drop, arrowId) {
    const sx = x1 + r, ex = x2 - r;
    const mx = (sx + ex) / 2, my = y + drop;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${sx},${y} Q${mx},${my} ${ex},${y}`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#64748b");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("marker-end", "url(#arr)");
    if (arrowId) path.setAttribute("id", arrowId);
    svg.appendChild(path);
    const lbl = svgText(svg, mx, my + 15, label);
    if (arrowId) lbl.setAttribute("id", arrowId + "-lbl");
}

// Self-loop en la parte superior (con ID para animación)
function drawSelfLoop(svg, cx, cy, r, label, arrowId) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const y0 = cy - r + 3;
    path.setAttribute("d",
        `M${cx - 11},${y0} C${cx - 36},${y0 - 50} ${cx + 36},${y0 - 50} ${cx + 11},${y0}`
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#64748b");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("marker-end", "url(#arr)");
    if (arrowId) path.setAttribute("id", arrowId);
    svg.appendChild(path);
    const lbl = svgText(svg, cx, y0 - 44, label);
    if (arrowId) lbl.setAttribute("id", arrowId + "-lbl");
}

// Dibuja un estado (círculo + etiqueta + anillo de aceptación)
function drawState(svg, x, y, r, label, isAccept, isInitial, stateId) {
    if (isInitial) drawInitialArrow(svg, x, y, r);

    const defStroke = isAccept ? "#10b981" : "#3b82f6";
    const defFill   = isAccept ? "rgba(4,40,18,0.85)" : "rgba(10,30,65,0.85)";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x); circle.setAttribute("cy", y); circle.setAttribute("r", r);
    circle.setAttribute("fill", defFill);
    circle.setAttribute("stroke", defStroke);
    circle.setAttribute("stroke-width", "2.5");
    circle.setAttribute("id", stateId);
    circle.setAttribute("data-def-stroke", defStroke);
    circle.setAttribute("data-def-fill", defFill);
    svg.appendChild(circle);

    if (isAccept) {
        const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        inner.setAttribute("cx", x); inner.setAttribute("cy", y); inner.setAttribute("r", r - 5);
        inner.setAttribute("fill", "none");
        inner.setAttribute("stroke", "#10b981");
        inner.setAttribute("stroke-width", "1.8");
        svg.appendChild(inner);
    }

    svgText(svg, x, y, label, "white", 13);
}

// =====================================================================
//  BUILD DIAGRAMS
// =====================================================================

function buildDiagramIDS() {
    const R = 28, W = 540, H = 155, cy = 95;
    const xs = [85, 210, 345, 470];
    const svg = createSVG(W, H);

    drawStraightArrow(svg, xs[0], cy, xs[1], R, "SYN", "arrow-ids-A-B");
    drawStraightArrow(svg, xs[1], cy, xs[2], R, "ACK", "arrow-ids-B-C");
    drawStraightArrow(svg, xs[2], cy, xs[3], R, "RST", "arrow-ids-C-D");
    drawSelfLoop(svg, xs[2], cy, R, "ACK", "arrow-ids-C-C");

    [
        [xs[0],"A",false,true, "state-ids-A"],
        [xs[1],"B",false,false,"state-ids-B"],
        [xs[2],"C",false,false,"state-ids-C"],
        [xs[3],"D",true, false,"state-ids-D"],
    ].forEach(([x,l,a,i,id]) => drawState(svg,x,cy,R,l,a,i,id));
    return svg;
}

function buildDiagramIoT() {
    const R = 28, W = 545, H = 220, cy = 105;
    const xs = [85, 210, 350, 475];
    const svg = createSVG(W, H);

    drawStraightArrow(svg, xs[0], cy, xs[1], R, "HDR", "arrow-iot-A-B");
    drawStraightArrow(svg, xs[1], cy, xs[2], R, "T/H", "arrow-iot-B-C");
    drawStraightArrow(svg, xs[2], cy, xs[3], R, "CRC", "arrow-iot-C-D");
    drawArcBelow(svg, xs[1], cy, xs[3], R, "CRC", 70, "arrow-iot-B-D");
    drawSelfLoop(svg, xs[2], cy, R, "T/H", "arrow-iot-C-C");

    [
        [xs[0],"A",false,true, "state-iot-A"],
        [xs[1],"B",false,false,"state-iot-B"],
        [xs[2],"C",false,false,"state-iot-C"],
        [xs[3],"D",true, false,"state-iot-D"],
    ].forEach(([x,l,a,i,id]) => drawState(svg,x,cy,R,l,a,i,id));
    return svg;
}

function buildDiagramBio() {
    const R = 28, W = 620, H = 220, cy = 105;
    const xs = [65, 175, 295, 415, 540];
    const svg = createSVG(W, H);

    drawStraightArrow(svg, xs[0], cy, xs[1], R, "K", "arrow-bio-A-B");
    drawStraightArrow(svg, xs[1], cy, xs[2], R, "G", "arrow-bio-B-C");
    drawStraightArrow(svg, xs[2], cy, xs[3], R, "X", "arrow-bio-C-D");
    drawStraightArrow(svg, xs[3], cy, xs[4], R, "F", "arrow-bio-D-E");
    drawArcBelow(svg, xs[2], cy, xs[4], R, "F", 70, "arrow-bio-C-E");
    drawSelfLoop(svg, xs[3], cy, R, "X", "arrow-bio-D-D");

    [
        [xs[0],"A",false,true, "state-bio-A"],
        [xs[1],"B",false,false,"state-bio-B"],
        [xs[2],"C",false,false,"state-bio-C"],
        [xs[3],"D",false,false,"state-bio-D"],
        [xs[4],"E",true, false,"state-bio-E"],
    ].forEach(([x,l,a,i,id]) => drawState(svg,x,cy,R,l,a,i,id));
    return svg;
}

document.getElementById("diagram-ids").appendChild(buildDiagramIDS());
document.getElementById("diagram-iot").appendChild(buildDiagramIoT());
document.getElementById("diagram-bio").appendChild(buildDiagramBio());

// =====================================================================
//  ANIMACIÓN ITERATIVA (estados + flechas)
// =====================================================================

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractStateSequence(path) {
    return path.map(step => step.split(' -> ').pop());
}

// Colorea una flecha y su etiqueta
function highlightArrow(arrowEl, strokeColor, markerRef, labelColor) {
    if (!arrowEl) return;
    arrowEl.setAttribute('stroke', strokeColor);
    arrowEl.setAttribute('stroke-width', strokeColor === '#64748b' ? '2' : '2.5');
    arrowEl.setAttribute('marker-end', markerRef);
    arrowEl.style.filter = strokeColor !== '#64748b' && strokeColor !== '#475569'
        ? `drop-shadow(0 0 4px ${strokeColor})` : '';

    const lbl = document.getElementById(arrowEl.id + "-lbl");
    if (lbl) lbl.setAttribute('fill', labelColor);
}

function resetDiagram(type) {
    // Resetear estados
    document.querySelectorAll(`[id^="state-${type}-"]`).forEach(el => {
        el.setAttribute('stroke', el.getAttribute('data-def-stroke'));
        el.setAttribute('fill',   el.getAttribute('data-def-fill'));
        el.style.filter = '';
    });
    // Resetear flechas
    document.querySelectorAll(`[id^="arrow-${type}-"]`).forEach(el => {
        if (!el.id.endsWith('-lbl')) {
            highlightArrow(el, '#64748b', 'url(#arr)', '#93c5fd');
        }
    });
}

async function animateStates(type, path, accepted) {
    resetDiagram(type);
    const states = extractStateSequence(path);
    await delay(150);

    for (let i = 0; i < states.length; i++) {
        const name = states[i];
        if (name === 'INVALID') break;

        const circleEl = document.getElementById(`state-${type}-${name}`);
        if (!circleEl) continue;

        const isLast = (i === states.length - 1);
        const color     = isLast ? (accepted ? '#10b981' : '#ef4444') : '#f59e0b';
        const fill      = isLast ? (accepted ? 'rgba(4,60,25,0.95)'  : 'rgba(60,5,5,0.95)')  : 'rgba(50,35,2,0.95)';
        const markerRef = isLast ? (accepted ? 'url(#arr-accept)'    : 'url(#arr-reject)')   : 'url(#arr-active)';

        // Iluminar estado actual
        circleEl.setAttribute('stroke', color);
        circleEl.setAttribute('fill', fill);
        circleEl.style.filter = `drop-shadow(0 0 ${isLast ? 12 : 8}px ${color})`;

        // Iluminar la flecha que llevó a este estado
        if (i > 0) {
            const prev = states[i - 1];
            const arrowEl = document.getElementById(`arrow-${type}-${prev}-${name}`);
            highlightArrow(arrowEl, color, markerRef, color);
        }

        await delay(500);

        // Después de avanzar: atenuar el estado y la flecha (si no es el último)
        if (!isLast) {
            circleEl.setAttribute('stroke', '#475569');
            circleEl.setAttribute('fill', 'rgba(20,20,20,0.8)');
            circleEl.style.filter = '';

            if (i > 0) {
                const prev = states[i - 1];
                const arrowEl = document.getElementById(`arrow-${type}-${prev}-${name}`);
                highlightArrow(arrowEl, '#475569', 'url(#arr-done)', '#64748b');
            }
        }
    }
}

// =====================================================================
//  TABS
// =====================================================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// =====================================================================
//  EJEMPLOS
// =====================================================================

function setExample(inputId, value) {
    const input = document.getElementById(inputId);
    input.value = value;
    input.style.borderColor = '#3b82f6';
    input.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.3)';
    setTimeout(() => { input.style.borderColor = ''; input.style.boxShadow = ''; }, 600);
}

// =====================================================================
//  VALIDACIÓN
// =====================================================================

async function validate(type, inputId) {
    const rawInput = document.getElementById(inputId).value;
    const resultDiv = document.getElementById(`result-${type}`);
    const sequence = rawInput.split(/[\s,]+/).filter(item => item.trim() !== '');

    if (sequence.length === 0) {
        showResult(resultDiv, false, "Por favor, ingresa una secuencia.", []);
        return;
    }

    resetDiagram(type);

    try {
        const response = await fetch(`/api/automata/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sequence })
        });
        if (!response.ok) throw new Error('Error del servidor');

        const data = await response.json();
        showResult(resultDiv, data.accepted, data.message, data.path);
        animateStates(type, data.path, data.accepted);

    } catch (err) {
        showResult(resultDiv, false, "Error al conectar con el servidor.", []);
        console.error(err);
    }
}

function showResult(element, accepted, message, path) {
    element.className = 'result ' + (accepted ? 'accepted' : 'rejected');
    const icon = accepted ? '✅' : '❌';
    let pathHtml = '';
    if (path && path.length > 0) {
        pathHtml = `<div class="path"><strong>Ruta:</strong><br>${path.join('  ➔  ')}</div>`;
    }
    element.innerHTML = `<div class="result-title">${icon} ${message}</div>${pathHtml}`;
}

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') validate(input.id.replace('input-', ''), input.id);
    });
});
