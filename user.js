let currentUser = null;
const COLORS = ['#3ecfb2','#5b8ef5','#c9a84c','#e85d75','#a78bfa','#f97316'];

// ── AUTH ─────────────────────────────────────────────────

async function doLogin() {
    const username = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-id").value.trim();
    if (!username || !password) { alert("please enter both username and password."); return; }

    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) { alert("invalid username or password."); return; }

    currentUser = await res.json();

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("sidebar-avatar").textContent = currentUser.username[0].toUpperCase();
    document.getElementById("sidebar-name").textContent = currentUser.username;
    document.getElementById("sidebar-id").textContent = "ID: " + currentUser.db_id;

    if (currentUser.role === "beneficiary") {
        document.getElementById("owner-nav").style.display = "none";
        document.getElementById("bene-nav").style.display = "block";
        document.getElementById("sidebar-role-tag").textContent = "Beneficiary";
        navigate("bene-dashboard", document.querySelector("#bene-nav .nav-item"));
        loadBeneDashboard();
    } else {
        document.getElementById("owner-nav").style.display = "block";
        document.getElementById("bene-nav").style.display = "none";
        document.getElementById("sidebar-role-tag").textContent = "Account Owner";
        navigate("dashboard", document.querySelector("#owner-nav .nav-item"));
        // Fix 1: update last_activity_date in access_trigger for this owner
        fetch(`/auth/activity/${currentUser.db_id}`, { method: "POST" }).catch(() => {});
        loadOwnerDashboard();
    }
}

async function doRegister() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const role = document.getElementById("reg-role").value;
    const db_id = document.getElementById("reg-dbid").value.trim();
    if (!username || !password || !db_id) { alert("please fill all registration fields."); return; }

    const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role, db_id })
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    alert("registration successful. please log in.");
    showLoginForm();
}

function doLogout() {
    currentUser = null;
    document.getElementById("app").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
}

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// ── HELPER ───────────────────────────────────────────────

function fmt(val) {
    if (val === null || val === undefined) return "—";
    return val;
}

function fmtDate(val) {
    if (!val) return "—";
    const d = new Date(val);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
}

function fmtCurrency(val) {
    if (!val && val !== 0) return "—";
    return "₹" + Number(val).toLocaleString('en-IN');
}

function typeIcon(type) {
    if (!type) return "◫";
    const t = type.toLowerCase();
    if (t === "financial") return "🏦";
    if (t === "social") return "📱";
    return "◫";
}

function typeClass(type) {
    if (!type) return "type-subscription";
    const t = type.toLowerCase();
    if (t === "financial") return "type-financial";
    if (t === "social") return "type-social";
    return "type-subscription";
}

// ── OWNER DASHBOARD ───────────────────────────────────────

async function loadOwnerDashboard() {
    const id = currentUser.db_id;
    const [assets, triggers, beneficiaries, financial] = await Promise.all([
        fetch(`/owner/assets/${id}`).then(r => r.json()),
        fetch(`/owner/triggers/${id}`).then(r => r.json()),
        fetch(`/owner/beneficiaries/${id}`).then(r => r.json()),
        fetch(`/owner/financial/${id}`).then(r => r.json())
    ]);

    // stat cards
    document.getElementById("dash-total-assets").textContent = assets.length;
    document.getElementById("dash-total-beneficiaries").textContent = beneficiaries.length;
    document.getElementById("dash-active-triggers").textContent =
        triggers.filter(t => (t.TRIGGER_STATUS || "").toLowerCase() === "active").length;

    const totalVal = financial.reduce((s, f) => s + (parseFloat(f.ASSET_VALUE) || 0), 0);
    document.getElementById("dash-total-value").textContent =
        totalVal >= 100000 ? (totalVal / 100000).toFixed(1) + "L" : fmtCurrency(totalVal);

    // asset breakdown by type
    const typeCounts = {};
    assets.forEach(a => {
        const t = (a.ASSET_TYPE || "other").toLowerCase();
        typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
    const breakdownEl = document.getElementById("dash-asset-breakdown");
    if (assets.length === 0) {
        breakdownEl.innerHTML = `<p style="color:var(--text-dim);font-size:13px">no assets found.</p>`;
    } else {
        breakdownEl.innerHTML = Object.entries(typeCounts).map(([type, count], i) => {
            const pct = Math.round((count / assets.length) * 100);
            return `<div style="margin-bottom:14px">
                <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                    <span style="font-size:13px;color:var(--text-dim)">${type}</span>
                    <span style="font-family:'DM Mono',monospace;font-size:12px">${count} assets · ${pct}%</span>
                </div>
                <div class="progress-bar" style="height:5px;margin-top:0">
                    <div class="progress-fill" style="width:${pct}%;background:${COLORS[i % COLORS.length]}"></div>
                </div>
            </div>`;
        }).join("");
    }

    // trigger status
    const triggerEl = document.getElementById("dash-trigger-status");
    if (triggers.length === 0) {
        triggerEl.innerHTML = `<p style="color:var(--text-dim);font-size:13px">no triggers configured.</p>`;
    } else {
        triggerEl.innerHTML = triggers.slice(0, 3).map(t => {
            const status = (t.TRIGGER_STATUS || "inactive").toLowerCase();
            const cls = status === "active" ? "status-active" : status === "fired" ? "status-inactive" : "status-pending";
            return `<div class="trigger-item">
                <div class="trigger-icon">◬</div>
                <div class="trigger-body">
                    <div class="trigger-name">${fmt(t.RULE_TYPE)}</div>
                    <div class="trigger-desc">${fmt(t.RULE_CONDITION)}</div>
                </div>
                <span class="trigger-status ${cls}">${status.toUpperCase()}</span>
            </div>`;
        }).join("");
    }

    // top financial assets
    const topEl = document.getElementById("dash-top-assets");
    if (financial.length === 0) {
        topEl.innerHTML = `<p style="color:var(--text-dim);font-size:13px">no financial assets found.</p>`;
    } else {
        const sorted = [...financial].sort((a, b) => (b.ASSET_VALUE || 0) - (a.ASSET_VALUE || 0));
        topEl.innerHTML = sorted.slice(0, 4).map(f => `
            <div class="asset-item">
                <div class="asset-type-dot type-financial">🏦</div>
                <div class="asset-info">
                    <div class="asset-name">${fmt(f.ASSET_NAME)}</div>
                    <div class="asset-meta">${fmt(f.INSTITUTION_NAME)} · ${fmt(f.CURRENCY)}</div>
                </div>
                <div class="asset-value">${fmtCurrency(f.ASSET_VALUE)}</div>
            </div>`).join("");
    }

    // recent beneficiaries
    const beneEl = document.getElementById("dash-recent-bene");
    if (beneficiaries.length === 0) {
        beneEl.innerHTML = `<p style="color:var(--text-dim);font-size:13px">no beneficiaries found.</p>`;
    } else {
        beneEl.innerHTML = beneficiaries.slice(0, 4).map(b => {
            const verified = (b.VERIFICATION_STATUS || "").toLowerCase() === "verified";
            return `<div class="asset-item">
                <div class="asset-type-dot" style="background:var(--blue-dim);font-size:16px;font-family:'Cormorant Garamond',serif;color:var(--blue)">
                    ${(b.FULL_NAME || "?")[0].toUpperCase()}
                </div>
                <div class="asset-info">
                    <div class="asset-name">${fmt(b.FULL_NAME)}</div>
                    <div class="asset-meta">${fmt(b.RELATIONSHIP_TO_OWNER)}</div>
                </div>
                <span class="verified-badge ${verified ? "verified" : "unverified"}">
                    ${verified ? "✓ verified" : "⏳ pending"}
                </span>
            </div>`;
        }).join("");
    }
}

// ── OWNER ASSETS ──────────────────────────────────────────

async function loadOwnerAssets() {
    const id = currentUser.db_id;
    const [assets, financial, social] = await Promise.all([
        fetch(`/owner/assets/${id}`).then(r => r.json()),
        fetch(`/owner/financial/${id}`).then(r => r.json()),
        fetch(`/owner/social/${id}`).then(r => r.json())
    ]);

    const subtitle = document.getElementById("assets-page-subtitle");
    if (subtitle) subtitle.textContent = `${assets.length} assets across your portfolio`;

    // all assets tab
    const allEl = document.getElementById("owner-assets-list");
    if (allEl) {
        allEl.innerHTML = assets.length === 0
            ? `<p style="color:var(--text-dim);padding:20px 0">no assets found.</p>`
            : assets.map(a => `
                <div class="asset-item" style="padding:18px 0">
                    <div class="asset-type-dot ${typeClass(a.ASSET_TYPE)}">${typeIcon(a.ASSET_TYPE)}</div>
                    <div class="asset-info">
                        <div class="asset-name">${fmt(a.ASSET_NAME)}</div>
                        <div class="asset-meta">${fmt(a.ASSET_TYPE)} · added ${fmtDate(a.CREATED_AT)}</div>
                    </div>
                    <span class="trigger-status status-active">active</span>
                </div>`).join("");
    }

    // financial tab
    const finEl = document.getElementById("owner-financial-list");
    if (finEl) {
        finEl.innerHTML = financial.length === 0
            ? `<p style="color:var(--text-dim);padding:20px 0">no financial assets found.</p>`
            : financial.map(f => `
                <div class="asset-item" style="padding:18px 0">
                    <div class="asset-type-dot type-financial">🏦</div>
                    <div class="asset-info">
                        <div class="asset-name">${fmt(f.ASSET_NAME)}</div>
                        <div class="asset-meta">${fmt(f.INSTITUTION_NAME)} · acc: ${fmt(f.ACCOUNT_NUMBER)}</div>
                    </div>
                    <div class="asset-value">${fmtCurrency(f.ASSET_VALUE)} <span style="color:var(--text-muted);font-size:11px">${fmt(f.CURRENCY)}</span></div>
                </div>`).join("");
    }

    // social tab
    const socEl = document.getElementById("owner-social-list");
    if (socEl) {
        socEl.innerHTML = social.length === 0
            ? `<p style="color:var(--text-dim);padding:20px 0">no social assets found.</p>`
            : social.map(s => `
                <div class="asset-item" style="padding:18px 0">
                    <div class="asset-type-dot type-social">📱</div>
                    <div class="asset-info">
                        <div class="asset-name">${fmt(s.ASSET_NAME)}</div>
                        <div class="asset-meta">${fmt(s.PLATFORM_NAME)} · @${fmt(s.USERNAME)}</div>
                    </div>
                    <a href="${s.PROFILE_URL || '#'}" target="_blank" style="font-family:'DM Mono',monospace;font-size:11px;color:var(--blue)">view profile →</a>
                </div>`).join("");
    }
}

// ── OWNER CREDENTIALS ─────────────────────────────────────

const credData = {};
const credRevealed = {};

function revealCred(id) {
    const el = document.getElementById(id);
    if (!el || credData[id] === undefined) return;
    if (credRevealed[id]) {
        const len = credData[id].length || 10;
        el.textContent = "•".repeat(Math.min(len, 12));
        el.style.color = "";
        credRevealed[id] = false;
    } else {
        el.textContent = credData[id] || "—";
        el.style.color = "var(--teal)";
        credRevealed[id] = true;
    }
}

async function loadOwnerCredentials() {
    const id = currentUser.db_id;
    const creds = await fetch(`/owner/credentials/${id}`).then(r => r.json());

    const countEl = document.getElementById("cred-count");
    const assetCountEl = document.getElementById("cred-asset-count");
    if (countEl) countEl.textContent = creds.length;
    if (assetCountEl) assetCountEl.textContent = new Set(creds.map(c => c.ASSET_NAME)).size;

    const container = document.getElementById("owner-credentials-list");
    if (!container) return;

    if (creds.length === 0) {
        container.innerHTML = `<p style="color:var(--text-dim)">no credentials found.</p>`;
        return;
    }

    // Store credential values in JS object, not in DOM attributes
    creds.forEach((c, i) => {
        credData[`cred-val-${i}`] = c.CREDENTIAL_VALUE || "";
        credRevealed[`cred-val-${i}`] = false;
    });

    container.innerHTML = creds.map((c, i) => `
        <div class="credential-item">
            <div class="cred-icon">🔑</div>
            <div class="cred-info">
                <div class="cred-name">${fmt(c.CREDENTIAL_TYPE)}</div>
                <div class="cred-asset">${fmt(c.ASSET_NAME)} · updated ${fmtDate(c.LAST_UPDATED)}</div>
            </div>
            <div class="cred-value" id="cred-val-${i}">${"•".repeat(Math.min((c.CREDENTIAL_VALUE || "").length || 10, 12))}</div>
            <button class="eye-btn" onclick="revealCred('cred-val-${i}')">👁</button>
        </div>`).join("");
}

// ── OWNER BENEFICIARIES ───────────────────────────────────

async function loadOwnerBeneficiaries() {
    const id = currentUser.db_id;
    const benes = await fetch(`/owner/beneficiaries/${id}`).then(r => r.json());

    const subtitle = document.getElementById("bene-page-subtitle");
    const verifiedCount = benes.filter(b => (b.VERIFICATION_STATUS || "").toLowerCase() === "verified").length;
    if (subtitle) subtitle.textContent = `${benes.length} designated heirs · ${verifiedCount} verified`;

    const container = document.getElementById("owner-beneficiaries-list");
    if (container) {
        container.innerHTML = benes.length === 0
            ? `<p style="color:var(--text-dim)">no beneficiaries found.</p>`
            : `<div class="bene-grid" style="margin-bottom:20px">${benes.map((b, i) => {
                const verified = (b.VERIFICATION_STATUS || "").toLowerCase() === "verified";
                return `<div class="bene-card">
                    <div class="bene-header">
                        <div class="bene-avatar" style="background:${COLORS[i % COLORS.length]}22;border-color:${COLORS[i % COLORS.length]}44;color:${COLORS[i % COLORS.length]}">
                            ${(b.FULL_NAME || "?")[0].toUpperCase()}
                        </div>
                        <div>
                            <div class="bene-name">${fmt(b.FULL_NAME)}</div>
                            <div class="bene-rel">${fmt(b.RELATIONSHIP_TO_OWNER)}</div>
                        </div>
                        <span class="verified-badge ${verified ? "verified" : "unverified"}" style="margin-left:auto">
                            ${verified ? "✓ Verified" : "⏳ Pending"}
                        </span>
                    </div>
                    <div class="bene-row"><span class="bene-key">Email</span><span class="bene-val">${fmt(b.EMAIL)}</span></div>
                    <div class="bene-row"><span class="bene-key">Beneficiary ID</span><span class="bene-val">${fmt(b.BENEFICIARY_ID)}</span></div>
                    <div class="bene-row"><span class="bene-key">Status</span>
                        <span class="bene-val" style="color:${verified ? "var(--teal)" : "var(--gold)"}">
                            ${fmt(b.VERIFICATION_STATUS)}
                        </span>
                    </div>
                </div>`;
            }).join("")}</div>`;
    }

    // inheritance distribution bar
    const barEl = document.getElementById("inherit-bar-container");
    if (barEl && benes.length > 0) {
        const pctPer = Math.floor(100 / benes.length);
        barEl.innerHTML = `
            <div class="inherit-bar-wrap">
                <div class="inherit-bar">
                    ${benes.map((b, i) => `<div class="inherit-segment" style="width:${pctPer}%;background:${COLORS[i % COLORS.length]}"></div>`).join("")}
                </div>
                <div class="inherit-legend">
                    ${benes.map((b, i) => `
                        <div class="inherit-legend-item">
                            <div class="inherit-legend-color" style="background:${COLORS[i % COLORS.length]}"></div>
                            ${fmt(b.FULL_NAME)}
                        </div>`).join("")}
                </div>
            </div>`;
    } else if (barEl) {
        barEl.innerHTML = `<p style="color:var(--text-dim);font-size:13px">no beneficiaries to display.</p>`;
    }
}

// ── OWNER TRIGGERS ────────────────────────────────────────

async function loadOwnerTriggers() {
    const id = currentUser.db_id;
    const triggers = await fetch(`/owner/triggers/${id}`).then(r => r.json());
    const container = document.getElementById("owner-triggers-list");
    if (!container) return;
    container.innerHTML = triggers.length === 0
        ? `<p style="color:var(--text-dim)">no triggers found.</p>`
        : triggers.map(t => {
            const status = (t.TRIGGER_STATUS || "inactive").toLowerCase();
            const cls = status === "active" ? "status-active" : status === "fired" ? "status-inactive" : "status-pending";
            return `<div class="trigger-item">
                <div class="trigger-icon">◬</div>
                <div class="trigger-body">
                    <div class="trigger-name">${fmt(t.RULE_TYPE)}</div>
                    <div class="trigger-desc">${fmt(t.RULE_CONDITION)}
                        <br>last activity: ${fmtDate(t.LAST_ACTIVITY_DATE)}
                    </div>
                </div>
                <span class="trigger-status ${cls}">${status.toUpperCase()}</span>
            </div>`;
        }).join("");
}

async function evaluateTriggers() {
    const id = currentUser.db_id;
    const res = await fetch(`/trigger/evaluate/${id}`, { method: "POST" });
    const data = await res.json();
    showToast(data.message);
    loadOwnerTriggers();
}

// ── OWNER MODAL SUBMITS ───────────────────────────────────

async function submitNewAsset() {
    const assetType = document.getElementById("modal-asset-type").value;
    const data = {
        asset_id: parseInt(document.getElementById("modal-asset-id").value),
        asset_name: document.getElementById("modal-asset-name").value,
        asset_type: assetType,
        description: document.getElementById("modal-asset-desc").value,
        owner_id: currentUser.db_id
    };
    if (!data.asset_id || !data.asset_name) { showToast("please fill in asset id and name."); return; }
    if (assetType === "financial") {
        data.institution_name = document.getElementById("modal-institution-name").value;
        data.account_number = document.getElementById("modal-account-number").value;
        data.asset_value = document.getElementById("modal-asset-value").value;
        data.currency = document.getElementById("modal-currency").value;
    }
    if (assetType === "social") {
        const selectedPlatform = document.getElementById("modal-social-platform").value;
        data.platform_name = selectedPlatform === "Others"
            ? (document.getElementById("modal-custom-platform").value.trim() || "Others")
            : selectedPlatform;
        data.username = document.getElementById("modal-social-username").value.trim();
        data.profile_url = document.getElementById("modal-social-url").value.trim();
        if (!data.platform_name) { showToast("please enter the platform name."); return; }
    }
    const res = await fetch("/owner/assets/add", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) { showToast(result.error || "failed to add asset."); return; }
    closeModal("add-asset-modal");
    showToast(result.message || "asset added.");
    loadOwnerAssets();
    loadOwnerDashboard();
}

async function submitNewBeneficiary() {
    const data = {
        beneficiary_id: parseInt(document.getElementById("modal-bene-id").value),
        full_name: document.getElementById("modal-bene-name").value,
        email: document.getElementById("modal-bene-email").value,
        relationship_to_owner: document.getElementById("modal-bene-rel").value,
        inheritance_percent: parseFloat(document.getElementById("modal-bene-pct").value) || 0,
        owner_id: currentUser.db_id
    };
    if (!data.beneficiary_id || !data.full_name || !data.email) {
        showToast("please fill in all required beneficiary fields."); return;
    }
    const res = await fetch("/owner/beneficiaries/add", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) { showToast(result.error || "failed to add beneficiary."); return; }
    closeModal("add-bene-modal");
    showToast(result.message || "beneficiary added.");
    loadOwnerBeneficiaries();
    loadOwnerDashboard();
}

async function submitNewTrigger() {
    const data = {
        trigger_id: Date.now() % 100000,
        owner_id: currentUser.db_id,
        rule_type: document.getElementById("modal-trigger-type").value,
        rule_condition: document.getElementById("modal-trigger-rule").value
    };
    if (!data.rule_condition) { showToast("please enter a trigger rule."); return; }
    const res = await fetch("/owner/triggers/add", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    });
    const result = await res.json();
    closeModal("add-trigger-modal");
    showToast(result.message || "trigger created.");
    loadOwnerTriggers();
    loadOwnerDashboard();
}

async function submitNewCredential() {
    const data = {
        asset_id: parseInt(document.getElementById("modal-cred-asset-id").value),
        credential_id: Date.now() % 100000,
        credential_type: document.getElementById("modal-cred-type").value,
        credential_value: document.getElementById("modal-cred-value").value
    };
    if (!data.asset_id || !data.credential_value) { showToast("please fill in all credential fields."); return; }
    const res = await fetch("/owner/credentials/add", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    });
    const result = await res.json();
    closeModal("add-cred-modal");
    showToast(result.message || "credential saved.");
    loadOwnerCredentials();
}

// ── BENEFICIARY DATA LOADERS ──────────────────────────────

async function loadBeneDashboard() {
    const id = currentUser.db_id;
    const [profile, assets, triggers] = await Promise.all([
        fetch(`/beneficiary/profile/${id}`).then(r => r.json()),
        fetch(`/beneficiary/assets/${id}`).then(r => r.json()),
        fetch(`/beneficiary/triggers/${id}`).then(r => r.json())
    ]);

    // welcome heading
    const nameEl = document.getElementById("bene-welcome-name");
    const subEl = document.getElementById("bene-dashboard-subtitle");
    if (nameEl) nameEl.textContent = fmt(profile.FULL_NAME) || currentUser.username;
    if (subEl && assets.length > 0) {
        const ownerName = assets[0].OWNER_NAME;
        subEl.textContent = `beneficiary portal · estate of ${ownerName}`;
    }

    // stat cards
    const totalAssetsEl = document.getElementById("bene-total-assets");
    const shareEl = document.getElementById("bene-inheritance-share");
    const lockedEl = document.getElementById("bene-locked-assets");
    const triggersEl = document.getElementById("bene-pending-triggers");

    if (totalAssetsEl) totalAssetsEl.textContent = assets.length;

    if (shareEl && assets.length > 0) {
        const avgPct = (assets.reduce((s, a) => s + (parseFloat(a.INHERITANCE_PERCENT) || 0), 0) / assets.length).toFixed(1);
        shareEl.textContent = avgPct + "%";
    } else if (shareEl) shareEl.textContent = "—";

    if (lockedEl) lockedEl.textContent = assets.length;

    if (triggersEl) triggersEl.textContent =
        triggers.filter(t => (t.TRIGGER_STATUS || "").toLowerCase() === "active").length;

    // dash triggers card
    const dashTrigEl = document.getElementById("bene-dash-triggers");
    if (dashTrigEl) {
        dashTrigEl.innerHTML = triggers.length === 0
            ? `<p style="color:var(--text-dim);font-size:13px">no triggers found.</p>`
            : triggers.slice(0, 3).map(t => {
                const status = (t.TRIGGER_STATUS || "inactive").toLowerCase();
                const cls = status === "active" ? "status-active" : status === "fired" ? "status-inactive" : "status-pending";
                return `<div class="trigger-item">
                    <div class="trigger-icon">◬</div>
                    <div class="trigger-body">
                        <div class="trigger-name">${fmt(t.RULE_TYPE)} · ${fmt(t.OWNER_NAME)}</div>
                        <div class="trigger-desc">${fmt(t.RULE_CONDITION)}</div>
                    </div>
                    <span class="trigger-status ${cls}">${status === "fired" ? "TRIGGERED" : status.toUpperCase()}</span>
                </div>`;
            }).join("");
    }

    // dash assigned assets card
    const dashAssetsEl = document.getElementById("bene-dash-assets");
    if (dashAssetsEl) {
        dashAssetsEl.innerHTML = assets.length === 0
            ? `<p style="color:var(--text-dim);font-size:13px">no assigned assets found.</p>`
            : assets.slice(0, 4).map(a => `
                <div class="inherited-asset">
                    <div class="lock-icon locked">🔒</div>
                    <div class="asset-info">
                        <div class="asset-name">${fmt(a.ASSET_NAME)}</div>
                        <div class="asset-meta">${fmt(a.ASSET_TYPE)} · access: ${fmt(a.ACCESS_LEVEL)}</div>
                    </div>
                    <div class="asset-value" style="font-size:12px">${fmt(a.INHERITANCE_PERCENT)}%</div>
                </div>`).join("");
    }
}

async function loadBeneAssets() {
    const id = currentUser.db_id;
    const assets = await fetch(`/beneficiary/assets/${id}`).then(r => r.json());
    const container = document.getElementById("bene-assets-list");
    if (!container) return;
    container.innerHTML = assets.length === 0
        ? `<p style="color:var(--text-dim)">no assigned assets found.</p>`
        : assets.map(a => `
            <div class="asset-item" style="padding:18px 0">
                <div class="lock-icon locked" style="width:36px;height:36px;border-radius:10px;flex-shrink:0">🔒</div>
                <div class="asset-info">
                    <div class="asset-name">${fmt(a.ASSET_NAME)}</div>
                    <div class="asset-meta">${fmt(a.ASSET_TYPE)} · owner: ${fmt(a.OWNER_NAME)} · access: ${fmt(a.ACCESS_LEVEL)}</div>
                </div>
                <div class="asset-value">${fmt(a.INHERITANCE_PERCENT)}% share</div>
            </div>`).join("");
}

async function loadBeneTriggers() {
    const id = currentUser.db_id;
    const [triggers, profile] = await Promise.all([
        fetch(`/beneficiary/triggers/${id}`).then(r => r.json()),
        fetch(`/beneficiary/profile/${id}`).then(r => r.json())
    ]);

    const triggerEl = document.getElementById("bene-triggers-list");
    if (triggerEl) {
        triggerEl.innerHTML = triggers.length === 0
            ? `<p style="color:var(--text-dim)">no triggers found.</p>`
            : triggers.map(t => {
                const status = (t.TRIGGER_STATUS || "inactive").toLowerCase();
                const cls = status === "active" ? "status-active" : status === "fired" ? "status-inactive" : "status-pending";
                return `<div class="trigger-item">
                    <div class="trigger-icon">◬</div>
                    <div class="trigger-body">
                        <div class="trigger-name">${fmt(t.RULE_TYPE)} · ${fmt(t.OWNER_NAME)}</div>
                        <div class="trigger-desc">${fmt(t.RULE_CONDITION)}<br>last activity: ${fmtDate(t.LAST_ACTIVITY_DATE)}</div>
                    </div>
                    <span class="trigger-status ${cls}">${status === "fired" ? "TRIGGERED" : status.toUpperCase()}</span>
                </div>`;
            }).join("");
    }

    // verification status card
    const verEl = document.getElementById("bene-verification-status");
    if (verEl && profile) {
        const verified = (profile.VERIFICATION_STATUS || "").toLowerCase() === "verified";
        verEl.innerHTML = `
            <div class="bene-row" style="padding:8px 0;border-bottom:1px solid var(--border)">
                <span class="bene-key">Full Name</span><span class="bene-val">${fmt(profile.FULL_NAME)}</span>
            </div>
            <div class="bene-row" style="padding:8px 0;border-bottom:1px solid var(--border)">
                <span class="bene-key">Email</span><span class="bene-val">${fmt(profile.EMAIL)}</span>
            </div>
            <div class="bene-row" style="padding:8px 0;border-bottom:1px solid var(--border)">
                <span class="bene-key">Relationship</span><span class="bene-val">${fmt(profile.RELATIONSHIP_TO_OWNER)}</span>
            </div>
            <div class="bene-row" style="padding:8px 0;border-bottom:1px solid var(--border)">
                <span class="bene-key">Verification</span>
                <span class="verified-badge ${verified ? "verified" : "unverified"}">
                    ${verified ? "✓ Verified" : "⏳ Pending"}
                </span>
            </div>
            <div class="bene-row" style="padding:8px 0">
                <span class="bene-key">Beneficiary ID</span>
                <span class="bene-val">${fmt(profile.BENEFICIARY_ID)}</span>
            </div>`;
    }
}
