const canvas = document.getElementById("estimateCanvas");
const ctx = canvas.getContext("2d");
const stateKey = "getGuttersEstimatorDraft";
const savedKey = "getGuttersSavedEstimates";
const jobStatuses = ["Estimate", "Approved", "Scheduled", "Installed", "Paid", "Lost"];
const paymentStatuses = ["Unpaid", "Deposit Paid", "Paid"];

const tools = {
  gutter: { label: "Gutter run", type: "line", color: "#2457ff" },
  downspout: { label: "Downspout", type: "line", color: "#0f0f0f" },
  insideMiter: { label: "ISM", type: "marker", color: "#2ce5f0", symbol: "ISM" },
  outsideMiter: { label: "OSM", type: "marker", color: "#ff4040", symbol: "OSM" },
  elbowA: { label: "A", type: "marker", color: "#d6a632", symbol: "A" },
  elbowB: { label: "B", type: "marker", color: "#f0d782", symbol: "B" },
  offset: { label: "2-4 Offset", type: "marker", color: "#b878ff", symbol: "OFF" },
  splashBlock: { label: "Splash Block", type: "marker", color: "#32cf67", symbol: "SB" },
  endCap: { label: "End Cap", type: "marker", color: "#ffffff", symbol: "CAP" },
  erase: { label: "Erase", type: "erase", color: "#e25757" }
};

const defaultPricing = {
  gutterLf: 12,
  downspoutLf: 8,
  insideMiter: 18,
  outsideMiter: 18,
  elbowA: 7,
  elbowB: 7,
  offset: 18,
  splashBlock: 14,
  endCap: 6,
  dripEdge: 4,
  screens: 9
};

let activeTool = "gutter";
let items = [];
let redoStack = [];
let draftLine = null;
let drawing = false;
let pricing = { ...defaultPricing };
let zoom = 1;
let currentRecordId = null;
const activePointers = new Map();
let pinchStartDistance = 0;
let pinchStartZoom = 1;

const fields = [
  "customerName", "customerPhone", "customerAddress", "customerEmail", "jobDate",
  "materialType", "gutterSize", "dripEdgeQty", "screensQty", "additionsCost", "jobNotes"
];

function $(id) {
  return document.getElementById(id);
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function roundFeet(value) {
  return Math.max(0, Math.round(value));
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const client = event.touches ? event.touches[0] : event;
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const screenX = (client.clientX - rect.left) * scaleX;
  const screenY = (client.clientY - rect.top) * scaleY;
  return screenToWorld(screenX, screenY);
}

function screenToWorld(screenX, screenY) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  return {
    x: centerX + (screenX - centerX) / zoom,
    y: centerY + (screenY - centerY) / zoom
  };
}

function visibleWorldBounds() {
  const topLeft = screenToWorld(0, 0);
  const bottomRight = screenToWorld(canvas.width, canvas.height);
  return {
    left: Math.min(topLeft.x, bottomRight.x),
    right: Math.max(topLeft.x, bottomRight.x),
    top: Math.min(topLeft.y, bottomRight.y),
    bottom: Math.max(topLeft.y, bottomRight.y)
  };
}

function snapToGrid(point) {
  const grid = 25;
  return {
    x: Math.round(point.x / grid) * grid,
    y: Math.round(point.y / grid) * grid
  };
}

function orthogonal(start, end, freeAngle) {
  if (freeAngle) return end;
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  return dx >= dy ? { x: end.x, y: start.y } : { x: start.x, y: end.y };
}

function lineFeet(line) {
  const px = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
  return roundFeet(px / 10);
}

function nearestItem(point) {
  let best = { index: -1, distance: Infinity };
  items.forEach((item, index) => {
    let distance;
    if (item.kind === "line") {
      distance = distanceToSegment(point, { x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 });
    } else {
      distance = Math.hypot(point.x - item.x, point.y - item.y);
    }
    if (distance < best.distance) best = { index, distance };
  });
  return best.distance < 28 ? best.index : -1;
}

function distanceToSegment(p, a, b) {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  if (!l2) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * (b.x - a.x)), p.y - (a.y + t * (b.y - a.y)));
}

function pushItem(item) {
  items.push(item);
  redoStack = [];
  persistDraft();
  updateAll();
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#10131a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  const bounds = visibleWorldBounds();
  const minor = 25;
  const major = 100;
  const minorLeft = Math.floor(bounds.left / minor) * minor;
  const minorRight = Math.ceil(bounds.right / minor) * minor;
  const minorTop = Math.floor(bounds.top / minor) * minor;
  const minorBottom = Math.ceil(bounds.bottom / minor) * minor;
  const majorLeft = Math.floor(bounds.left / major) * major;
  const majorRight = Math.ceil(bounds.right / major) * major;
  const majorTop = Math.floor(bounds.top / major) * major;
  const majorBottom = Math.ceil(bounds.bottom / major) * major;

  ctx.strokeStyle = "rgba(214, 166, 50, 0.13)";
  ctx.lineWidth = 1;
  for (let x = minorLeft; x <= minorRight; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, minorTop);
    ctx.lineTo(x, minorBottom);
    ctx.stroke();
  }
  for (let y = minorTop; y <= minorBottom; y += minor) {
    ctx.beginPath();
    ctx.moveTo(minorLeft, y);
    ctx.lineTo(minorRight, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(240, 215, 130, 0.24)";
  ctx.lineWidth = 2;
  for (let x = majorLeft; x <= majorRight; x += major) {
    ctx.beginPath();
    ctx.moveTo(x, minorTop);
    ctx.lineTo(x, minorBottom);
    ctx.stroke();
  }
  for (let y = majorTop; y <= majorBottom; y += major) {
    ctx.beginPath();
    ctx.moveTo(minorLeft, y);
    ctx.lineTo(minorRight, y);
    ctx.stroke();
  }
}

function drawLine(item, ghost = false) {
  const config = tools[item.tool];
  ctx.save();
  ctx.strokeStyle = config.color;
  ctx.lineWidth = item.tool === "gutter" ? 5 : 4;
  ctx.globalAlpha = ghost ? 0.55 : 1;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(item.x1, item.y1);
  ctx.lineTo(item.x2, item.y2);
  ctx.stroke();

  const feet = lineFeet(item);
  const mx = (item.x1 + item.x2) / 2;
  const my = (item.y1 + item.y2) / 2;
  ctx.fillStyle = "#fff8e5";
  ctx.strokeStyle = "#090909";
  ctx.lineWidth = 5;
  ctx.font = "700 24px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText(`${feet}`, mx, my - 18);
  ctx.fillText(`${feet}`, mx, my - 18);
  ctx.restore();
}

function drawMarker(item) {
  const config = tools[item.tool];
  ctx.save();
  ctx.fillStyle = config.color;
  ctx.strokeStyle = "#070707";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(item.x, item.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = item.tool === "endCap" ? "#070707" : "#fff8e5";
  ctx.font = "900 20px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.strokeStyle = "#070707";
  ctx.lineWidth = 5;
  ctx.strokeText(config.symbol, item.x, item.y + 15);
  ctx.fillText(config.symbol, item.x, item.y + 15);
  ctx.restore();
}

function drawCanvas() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawBackground();
  ctx.restore();
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  drawGrid();
  items.forEach((item) => item.kind === "line" ? drawLine(item) : drawMarker(item));
  if (draftLine) drawLine(draftLine, true);
  ctx.restore();
}

function calculate() {
  const counts = {
    gutterLf: 0,
    downspoutLf: 0,
    insideMiter: 0,
    outsideMiter: 0,
    elbowA: 0,
    elbowB: 0,
    offset: 0,
    splashBlock: 0,
    endCap: 0
  };

  items.forEach((item) => {
    if (item.kind === "line" && item.tool === "gutter") counts.gutterLf += lineFeet(item);
    if (item.kind === "line" && item.tool === "downspout") counts.downspoutLf += lineFeet(item);
    if (item.kind === "marker" && counts[item.tool] !== undefined) counts[item.tool] += 1;
  });

  const dripEdge = Number($("dripEdgeQty").value || 0);
  const screens = Number($("screensQty").value || 0);
  const additions = Number($("additionsCost").value || 0);
  const materialTotal = Object.keys(counts).reduce((sum, key) => sum + counts[key] * (pricing[key] || 0), 0);
  const extraTotal = dripEdge * pricing.dripEdge + screens * pricing.screens + additions;
  return { counts, dripEdge, screens, additions, total: materialTotal + extraTotal };
}

function renderCounts() {
  const { counts, dripEdge, screens, additions, total } = calculate();
  $("totalFeet").textContent = counts.gutterLf;
  const rows = [
    ["Coil Footage", `${counts.gutterLf} LF`],
    ["DS Footage", `${counts.downspoutLf} LF`],
    ["Splash Guards", counts.splashBlock],
    ["ISM", counts.insideMiter],
    ["OSM", counts.outsideMiter],
    ["Custom Miters", 0],
    ["End Caps", `${counts.endCap} Sets`],
    ["A's", counts.elbowA],
    ["B's", counts.elbowB],
    ["Offsets", counts.offset],
    ["Splash Blocks", counts.splashBlock],
    ["Drip Edge", `${dripEdge} LF`],
    ["Screens", `${screens} LF`],
    ["Additions", money(additions)],
    ["Gutter and Ds", money(total)]
  ];
  const wrap = $("materialCounts");
  wrap.innerHTML = "";
  rows.forEach(([label, value]) => {
    const row = document.getElementById("countRowTemplate").content.firstElementChild.cloneNode(true);
    row.children[0].textContent = label;
    row.children[1].textContent = value;
    wrap.appendChild(row);
  });
  $("grandTotal").textContent = money(total);
}

function renderPricing() {
  const labels = {
    gutterLf: "Gutter / LF",
    downspoutLf: "Downspout / LF",
    insideMiter: "Inside miter",
    outsideMiter: "Outside miter",
    elbowA: "A elbow",
    elbowB: "B elbow",
    offset: "Offset",
    splashBlock: "Splash block",
    endCap: "End cap set",
    dripEdge: "Drip edge / LF",
    screens: "Screens / LF"
  };
  const wrap = $("pricingRules");
  wrap.innerHTML = "";
  Object.entries(labels).forEach(([key, label]) => {
    const field = document.createElement("label");
    field.textContent = label;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.5";
    input.value = pricing[key];
    input.addEventListener("input", () => {
      pricing[key] = Number(input.value || 0);
      persistDraft();
      updateAll();
    });
    field.appendChild(input);
    wrap.appendChild(field);
  });
}

function estimateData() {
  return {
    id: currentRecordId,
    fields: Object.fromEntries(fields.map((id) => [id, $(id).value])),
    items,
    pricing,
    counts: calculate().counts,
    total: calculate().total,
    savedAt: new Date().toISOString()
  };
}

function loadEstimate(data) {
  currentRecordId = data.id || null;
  fields.forEach((id) => {
    if (data.fields && data.fields[id] !== undefined) $(id).value = data.fields[id];
  });
  items = Array.isArray(data.items) ? data.items : [];
  pricing = { ...defaultPricing, ...(data.pricing || {}) };
  redoStack = [];
  renderPricing();
  updateAll();
}

function persistDraft() {
  localStorage.setItem(stateKey, JSON.stringify(estimateData()));
  $("saveState").textContent = "Draft saved";
}

function savedEstimates() {
  try {
    const saved = JSON.parse(localStorage.getItem(savedKey) || "[]");
    return Array.isArray(saved) ? saved.map(normalizeRecord) : [];
  } catch {
    return [];
  }
}

function persistRecords(records) {
  localStorage.setItem(savedKey, JSON.stringify(records.map(normalizeRecord)));
  renderSaved();
  renderDatabase();
}

function recordId() {
  return `job-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function stableRecordId(entry, fieldsData) {
  const basis = [
    entry.savedAt || entry.createdAt || "saved",
    fieldsData.customerName || "customer",
    fieldsData.customerPhone || "",
    fieldsData.customerAddress || ""
  ].join("-");
  return `job-${basis.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function normalizeRecord(entry) {
  const fieldsData = entry.fields || {};
  const now = new Date().toISOString();
  return {
    ...entry,
    id: entry.id || stableRecordId(entry, fieldsData),
    fields: fieldsData,
    items: Array.isArray(entry.items) ? entry.items : [],
    pricing: { ...defaultPricing, ...(entry.pricing || {}) },
    counts: entry.counts || {},
    total: Number(entry.total || 0),
    status: entry.status || "Estimate",
    paymentStatus: entry.paymentStatus || "Unpaid",
    balanceDue: Number(entry.balanceDue ?? entry.total ?? 0),
    lastContacted: entry.lastContacted || "",
    createdAt: entry.createdAt || entry.savedAt || now,
    savedAt: entry.savedAt || now,
    updatedAt: entry.updatedAt || entry.savedAt || now
  };
}

function currentCustomerName(record) {
  return record.fields.customerName || "Unnamed customer";
}

function updateRecord(id, changes) {
  const records = savedEstimates();
  const next = records.map((record) => record.id === id ? normalizeRecord({
    ...record,
    ...changes,
    updatedAt: new Date().toISOString()
  }) : record);
  persistRecords(next);
}

function renderSaved() {
  const wrap = $("savedList");
  const saved = savedEstimates();
  wrap.innerHTML = "";
  if (!saved.length) {
    wrap.innerHTML = '<p class="helper">Saved estimates will appear here on this device.</p>';
    return;
  }
  saved.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "saved-item";
    const name = currentCustomerName(entry);
    const total = money(entry.total || 0);
    item.innerHTML = `<div><strong>${escapeHtml(name)}</strong><span>${entry.status} · ${entry.paymentStatus} · ${total}</span></div>`;
    const load = document.createElement("button");
    load.type = "button";
    load.textContent = "Open";
    load.addEventListener("click", () => loadEstimate(entry));
    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      const next = savedEstimates().filter((_, i) => i !== index);
      persistRecords(next);
    });
    item.append(load, del);
    wrap.appendChild(item);
  });
}

function renderDatabase() {
  const list = $("databaseList");
  if (!list) return;
  const query = ($("databaseSearch").value || "").trim().toLowerCase();
  const statusFilter = $("databaseStatusFilter").value;
  const paymentFilter = $("databasePaymentFilter").value;
  const records = savedEstimates().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const filtered = records.filter((record) => {
    const haystack = [
      record.fields.customerName,
      record.fields.customerPhone,
      record.fields.customerEmail,
      record.fields.customerAddress,
      record.fields.jobNotes,
      record.status,
      record.paymentStatus,
      record.total
    ].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || record.paymentStatus === paymentFilter;
    return matchesQuery && matchesStatus && matchesPayment;
  });

  const unpaidTotal = records
    .filter((record) => record.paymentStatus !== "Paid")
    .reduce((sum, record) => sum + Number(record.balanceDue || record.total || 0), 0);
  const openJobs = records.filter((record) => !["Paid", "Lost"].includes(record.status)).length;
  $("databaseCount").textContent = `${filtered.length} of ${records.length} jobs`;
  $("databaseStats").innerHTML = `
    <div><span>Total Jobs</span><strong>${records.length}</strong></div>
    <div><span>Open Jobs</span><strong>${openJobs}</strong></div>
    <div><span>Unpaid Balance</span><strong>${money(unpaidTotal)}</strong></div>
  `;

  list.innerHTML = "";
  if (!filtered.length) {
    list.innerHTML = '<p class="helper database-empty">No customer records match this search.</p>';
    return;
  }

  filtered.forEach((record) => {
    const row = document.createElement("article");
    row.className = "database-row";
    const phone = record.fields.customerPhone || "";
    const email = record.fields.customerEmail || "";
    const address = record.fields.customerAddress || "";
    row.innerHTML = `
      <div class="database-main">
        <strong>${escapeHtml(currentCustomerName(record))}</strong>
        <span>${escapeHtml(phone || "No phone")} · ${escapeHtml(address || "No address")}</span>
        <span>${new Date(record.updatedAt).toLocaleDateString()} · ${money(record.total)} · ${record.counts?.gutterLf || 0} LF</span>
      </div>
      <div class="database-fields">
        <label>Status
          <select data-action="status">
            ${jobStatuses.map((status) => `<option value="${status}" ${record.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label>Payment
          <select data-action="payment">
            ${paymentStatuses.map((status) => `<option value="${status}" ${record.paymentStatus === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label>Balance
          <input data-action="balance" type="number" min="0" value="${Number(record.balanceDue || 0)}" />
        </label>
      </div>
      <div class="database-actions">
        <button data-action="open" type="button">Open</button>
        <a class="action-link" href="${phone ? `tel:${encodeURIComponent(phone)}` : "#"}">Call</a>
        <a class="action-link" href="${phone ? `sms:${encodeURIComponent(phone)}?&body=${encodeURIComponent(messageTemplate(record))}` : "#"}">Text</a>
        <a class="action-link" href="${email ? `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Get Gutters Estimate")}&body=${encodeURIComponent(messageTemplate(record))}` : "#"}">Email</a>
        <button data-action="contacted" type="button">Contacted</button>
      </div>
    `;
    row.querySelector('[data-action="open"]').addEventListener("click", () => {
      loadEstimate(record);
      showView("estimator");
    });
    row.querySelector('[data-action="status"]').addEventListener("change", (event) => {
      const status = event.target.value;
      updateRecord(record.id, {
        status,
        paymentStatus: status === "Paid" ? "Paid" : record.paymentStatus,
        balanceDue: status === "Paid" ? 0 : record.balanceDue
      });
    });
    row.querySelector('[data-action="payment"]').addEventListener("change", (event) => {
      const paymentStatus = event.target.value;
      updateRecord(record.id, {
        paymentStatus,
        status: paymentStatus === "Paid" ? "Paid" : record.status,
        balanceDue: paymentStatus === "Paid" ? 0 : record.balanceDue
      });
    });
    row.querySelector('[data-action="balance"]').addEventListener("change", (event) => {
      updateRecord(record.id, { balanceDue: Number(event.target.value || 0) });
    });
    row.querySelector('[data-action="contacted"]').addEventListener("click", () => {
      updateRecord(record.id, { lastContacted: new Date().toISOString() });
    });
    list.appendChild(row);
  });
}

function messageTemplate(record) {
  const name = record.fields.customerName ? ` ${record.fields.customerName}` : "";
  return `Hi${name}, this is Pablo with Get Gutters. I wanted to follow up on your gutter estimate for ${money(record.total)}.`;
}

function showView(view) {
  $("estimatorView").classList.toggle("is-hidden", view !== "estimator");
  $("databaseView").classList.toggle("is-hidden", view !== "database");
  $("estimatorBtn").classList.toggle("active-nav", view === "estimator");
  $("databaseBtn").classList.toggle("active-nav", view === "database");
  if (view === "database") renderDatabase();
  if (view === "estimator") drawCanvas();
}

function viewFromPath() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("view") === "database") return "database";
  return window.location.pathname.toLowerCase().includes("/database") ? "database" : "estimator";
}

function routeForView(view) {
  return view === "database" ? "/estimator-app.html?view=database" : "/estimator-app.html?view=estimate";
}

function navigateView(view) {
  showView(view);
  const route = routeForView(view);
  if (window.location.pathname !== route) {
    history.pushState({ view }, "", route);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function saveEstimate() {
  const data = estimateData();
  const saved = savedEstimates();
  const existing = data.id ? saved.find((record) => record.id === data.id) : null;
  const record = normalizeRecord({
    ...(existing || {}),
    ...data,
    id: existing?.id || data.id || recordId(),
    status: existing?.status || "Estimate",
    paymentStatus: existing?.paymentStatus || "Unpaid",
    balanceDue: existing?.paymentStatus === "Paid" ? 0 : Number(existing?.balanceDue ?? data.total),
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  currentRecordId = record.id;
  const next = existing
    ? saved.map((entry) => entry.id === record.id ? record : entry)
    : [record, ...saved];
  persistRecords(next.slice(0, 100));
  persistDraft();
  $("saveState").textContent = "Saved to database";
}

function exportEstimate() {
  const data = estimateData();
  data.total = calculate().total;
  data.counts = calculate().counts;
  const name = (data.fields.customerName || "get-gutters-estimate")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "get-gutters-estimate";
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  $("saveState").textContent = "Estimate exported";
}

function updateAll() {
  drawCanvas();
  renderCounts();
}

function setZoom(nextZoom) {
  zoom = Math.max(0.6, Math.min(2.2, nextZoom));
  $("zoomRange").value = Math.round(zoom * 100);
  $("zoomLabel").textContent = `${Math.round(zoom * 100)}%`;
  $("zoomResetBtn").textContent = `${Math.round(zoom * 100)}%`;
  drawCanvas();
}

function pointerDistance() {
  const points = [...activePointers.values()];
  if (points.length < 2) return 0;
  return Math.hypot(points[0].clientX - points[1].clientX, points[0].clientY - points[1].clientY);
}

function loadSample() {
  currentRecordId = null;
  items = [
    { kind: "line", tool: "gutter", x1: 125, y1: 165, x2: 385, y2: 165 },
    { kind: "line", tool: "gutter", x1: 385, y1: 165, x2: 385, y2: 270 },
    { kind: "line", tool: "gutter", x1: 385, y1: 270, x2: 725, y2: 270 },
    { kind: "line", tool: "gutter", x1: 725, y1: 270, x2: 725, y2: 780 },
    { kind: "line", tool: "gutter", x1: 725, y1: 780, x2: 910, y2: 780 },
    { kind: "line", tool: "downspout", x1: 950, y1: 600, x2: 1150, y2: 600 },
    { kind: "line", tool: "downspout", x1: 1150, y1: 600, x2: 1150, y2: 780 },
    { kind: "marker", tool: "outsideMiter", x: 725, y: 270 },
    { kind: "marker", tool: "insideMiter", x: 385, y: 270 },
    { kind: "marker", tool: "endCap", x: 125, y: 165 },
    { kind: "marker", tool: "splashBlock", x: 1150, y: 780 },
    { kind: "marker", tool: "elbowA", x: 725, y: 780 },
    { kind: "marker", tool: "offset", x: 910, y: 780 }
  ];
  redoStack = [];
  updateAll();
  persistDraft();
}

function pointerDown(event) {
  event.preventDefault();
  activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
  if (activePointers.size === 2) {
    pinchStartDistance = pointerDistance();
    pinchStartZoom = zoom;
    drawing = false;
    draftLine = null;
    return;
  }
  if (activePointers.size > 1) return;
  const point = snapToGrid(canvasPoint(event));
  const config = tools[activeTool];
  if (config.type === "erase") {
    const index = nearestItem(point);
    if (index >= 0) {
      redoStack = [];
      items.splice(index, 1);
      updateAll();
      persistDraft();
    }
    return;
  }
  if (config.type === "marker") {
    pushItem({ kind: "marker", tool: activeTool, x: point.x, y: point.y });
    return;
  }
  drawing = true;
  draftLine = { kind: "line", tool: activeTool, x1: point.x, y1: point.y, x2: point.x, y2: point.y };
  drawCanvas();
}

function pointerMove(event) {
  if (activePointers.has(event.pointerId)) {
    activePointers.set(event.pointerId, { clientX: event.clientX, clientY: event.clientY });
  }
  if (activePointers.size === 2 && pinchStartDistance) {
    event.preventDefault();
    setZoom(pinchStartZoom * (pointerDistance() / pinchStartDistance));
    return;
  }
  if (!drawing || !draftLine) return;
  event.preventDefault();
  const end = orthogonal({ x: draftLine.x1, y: draftLine.y1 }, snapToGrid(canvasPoint(event)), event.shiftKey);
  draftLine.x2 = end.x;
  draftLine.y2 = end.y;
  drawCanvas();
}

function pointerUp(event) {
  activePointers.delete(event.pointerId);
  if (activePointers.size < 2) {
    pinchStartDistance = 0;
  }
  if (!drawing || !draftLine) return;
  event.preventDefault();
  const line = { ...draftLine };
  drawing = false;
  draftLine = null;
  if (lineFeet(line) > 1) pushItem(line);
  else drawCanvas();
}

function init() {
  document.querySelectorAll(".tool").forEach((button) => {
    button.addEventListener("click", () => {
      activeTool = button.dataset.tool;
      document.querySelectorAll(".tool").forEach((node) => node.classList.toggle("active", node === button));
    });
  });

  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerUp);

  $("undoBtn").addEventListener("click", () => {
    const item = items.pop();
    if (item) redoStack.push(item);
    updateAll();
    persistDraft();
  });
  $("redoBtn").addEventListener("click", () => {
    const item = redoStack.pop();
    if (item) items.push(item);
    updateAll();
    persistDraft();
  });
  $("clearBtn").addEventListener("click", () => {
    if (confirm("Clear this drawing?")) {
      items = [];
      redoStack = [];
      updateAll();
      persistDraft();
    }
  });
  $("sampleBtn").addEventListener("click", loadSample);
  $("saveEstimateBtn").addEventListener("click", saveEstimate);
  $("estimatorBtn").addEventListener("click", () => navigateView("estimator"));
  $("databaseBtn").addEventListener("click", () => navigateView("database"));
  $("newEstimateBtn").addEventListener("click", () => {
    currentRecordId = null;
    fields.forEach((id) => {
      if (id === "jobDate") $("jobDate").valueAsDate = new Date();
      else if (["dripEdgeQty", "screensQty", "additionsCost"].includes(id)) $(id).value = 0;
      else if (id === "materialType") $(id).value = "Aluminum";
      else if (id === "gutterSize") $(id).value = '6" K-Style';
      else $(id).value = "";
    });
    items = [];
    redoStack = [];
    persistDraft();
    updateAll();
    navigateView("estimator");
  });
  $("exportBtn").addEventListener("click", exportEstimate);
  $("printBtn").addEventListener("click", () => window.print());
  $("zoomOutBtn").addEventListener("click", () => setZoom(zoom - 0.15));
  $("zoomInBtn").addEventListener("click", () => setZoom(zoom + 0.15));
  $("zoomResetBtn").addEventListener("click", () => setZoom(1));
  $("zoomRange").addEventListener("input", (event) => setZoom(Number(event.target.value) / 100));
  canvas.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    setZoom(zoom + (event.deltaY < 0 ? 0.1 : -0.1));
  }, { passive: false });

  fields.forEach((id) => $(id).addEventListener("input", () => {
    persistDraft();
    updateAll();
  }));
  ["databaseSearch", "databaseStatusFilter", "databasePaymentFilter"].forEach((id) => {
    $(id).addEventListener("input", renderDatabase);
    $(id).addEventListener("change", renderDatabase);
  });
  window.addEventListener("popstate", () => showView(viewFromPath()));

  renderPricing();
  const draft = localStorage.getItem(stateKey);
  if (draft) {
    try {
      loadEstimate(JSON.parse(draft));
    } catch {
      loadSample();
    }
  } else {
    $("jobDate").valueAsDate = new Date();
    loadSample();
  }
  renderSaved();
  renderDatabase();
  showView(viewFromPath());
  updateAll();
}

init();
