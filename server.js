const express = require("express");
const oracledb = require("oracledb");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const dbConfig = {
    user: "replace_with_user_name",
    password: "replace_with_pass",
    connectString: "localhost/replace_with_session"
};

async function getConnection() {
    return await oracledb.getConnection(dbConfig);
}

function loadUsers() {
    return JSON.parse(fs.readFileSync("users.json", "utf8"));
}

function saveUsers(data) {
    fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

function toRows(result) {
    const columns = result.metaData.map(col => col.name);
    return result.rows.map(row =>
        Object.fromEntries(columns.map((col, i) => [col, row[i]]))
    );
}

// ── SERVE PAGES ──────────────────────────────────────────

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin_control.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "user.html"));
});

// ── AUTH ─────────────────────────────────────────────────

app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    const { users } = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: "invalid username or password" });
    res.json({ username: user.username, role: user.role, db_id: user.db_id });
});

app.post("/auth/register", (req, res) => {
    const { username, password, role, db_id } = req.body;
    const data = loadUsers();
    const exists = data.users.find(u => u.username === username);
    if (exists) return res.status(400).json({ error: "username already exists" });
    data.users.push({ username, password, role, db_id: parseInt(db_id) });
    saveUsers(data);
    res.json({ message: "user registered successfully" });
});

app.post("/auth/activity/:owner_id", async (req, res) => {
    const owner_id = parseInt(req.params.owner_id);
    try {
        const conn = await getConnection();
        await conn.execute(
            "UPDATE access_trigger SET last_activity_date = SYSDATE WHERE owner_id = :id",
            { id: owner_id },
            { autoCommit: true }
        );
        await conn.close();
        res.json({ message: "activity updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ── ADMIN ROUTES (existing) ───────────────────────────────

app.get("/assets", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM digital_asset");
    await conn.close();
    res.json(toRows(result));
});

app.get("/assets/first", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM digital_asset WHERE ROWNUM = 1");
    await conn.close();
    res.json(toRows(result)[0]);
});

app.get("/assets/last", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM digital_asset WHERE asset_id = (SELECT MAX(asset_id) FROM digital_asset)"
    );
    await conn.close();
    res.json(toRows(result)[0]);
});

app.get("/assets/search", async (req, res) => {
    const keyword = req.query.keyword || "";
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM digital_asset WHERE LOWER(asset_name) LIKE :keyword",
        { keyword: `%${keyword.toLowerCase()}%` }
    );
    await conn.close();
    res.json(toRows(result));
});

app.post("/assets/insert", async (req, res) => {
    const { asset_id, asset_name, asset_type, description, owner_id } = req.body;
    const conn = await getConnection();
    await conn.execute(
        "INSERT INTO digital_asset VALUES (:asset_id, :asset_name, :asset_type, :description, SYSDATE, :owner_id)",
        { asset_id, asset_name, asset_type, description, owner_id },
        { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "record inserted successfully" });
});

app.post("/assets/update", async (req, res) => {
    const { asset_id, asset_name } = req.body;
    const conn = await getConnection();
    await conn.execute(
        "UPDATE digital_asset SET asset_name = :asset_name WHERE asset_id = :asset_id",
        { asset_id, asset_name },
        { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "record updated successfully" });
});

app.post("/assets/delete", async (req, res) => {
    const { asset_id } = req.body;
    const conn = await getConnection();
    await conn.execute(
        "DELETE FROM digital_asset WHERE asset_id = :asset_id",
        { asset_id },
        { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "record deleted successfully" });
});

app.get("/assets/total-value", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT ao.full_name, SUM(fa.asset_value) AS total_value
        FROM financial_asset fa
        JOIN digital_asset da ON fa.asset_id = da.asset_id
        JOIN account_owner ao ON da.owner_id = ao.owner_id
        GROUP BY ao.full_name
        ORDER BY total_value DESC
    `);
    await conn.close();
    res.json(toRows(result));
});

// ── OWNER ROUTES ─────────────────────────────────────────

app.get("/owner/profile/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM account_owner WHERE owner_id = :id",
        { id: parseInt(req.params.id) }
    );
    await conn.close();
    const rows = toRows(result);
    res.json(rows[0] || {});
});

app.get("/owner/assets/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM digital_asset WHERE owner_id = :id",
        { id: parseInt(req.params.id) }
    );
    await conn.close();
    res.json(toRows(result));
});

app.get("/owner/financial/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT da.asset_name, fa.institution_name, fa.account_number,
               fa.asset_value, fa.currency
        FROM financial_asset fa
        JOIN digital_asset da ON fa.asset_id = da.asset_id
        WHERE da.owner_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

app.get("/owner/social/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT da.asset_name, sa.platform_name, sa.username, pp.profile_url
        FROM social_asset sa
        JOIN digital_asset da ON sa.asset_id = da.asset_id
        JOIN platform_profile pp ON sa.platform_name = pp.platform_name
            AND sa.username = pp.username
        WHERE da.owner_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

app.get("/owner/credentials/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT da.asset_name, ac.credential_id, ac.credential_type,
               ac.credential_value, ac.last_updated
        FROM asset_credential ac
        JOIN digital_asset da ON ac.asset_id = da.asset_id
        WHERE da.owner_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

app.get("/owner/beneficiaries/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT DISTINCT b.beneficiary_id, b.full_name, b.email,
               b.relationship_to_owner, b.verification_status
        FROM beneficiary b
        JOIN designated_heir dh ON b.beneficiary_id = dh.beneficiary_id
        JOIN digital_asset da ON dh.asset_id = da.asset_id
        WHERE da.owner_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

app.get("/owner/triggers/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM access_trigger WHERE owner_id = :id",
        { id: parseInt(req.params.id) }
    );
    await conn.close();
    res.json(toRows(result));
});

app.post("/owner/assets/add", async (req, res) => {
    const { asset_id, asset_name, asset_type, description, owner_id,
            institution_name, account_number, asset_value, currency,
            platform_name, username, profile_url } = req.body;
    const conn = await getConnection();
    try {
        await conn.execute(
            "INSERT INTO digital_asset VALUES (:asset_id, :asset_name, :asset_type, :description, SYSDATE, :owner_id)",
            { asset_id: parseInt(asset_id), asset_name, asset_type, description, owner_id: parseInt(owner_id) }
        );
        if (asset_type && asset_type.toLowerCase() === "financial" && institution_name) {
            await conn.execute(
                "INSERT INTO financial_asset VALUES (:asset_id, :institution_name, :account_number, :asset_value, :currency)",
                {
                    asset_id: parseInt(asset_id),
                    institution_name,
                    account_number: account_number || null,
                    asset_value: parseFloat(asset_value) || 0,
                    currency: currency || "INR"
                }
            );
        }
        if (asset_type && asset_type.toLowerCase() === "social") {
            const pName = platform_name || "Others";
            const uName = username || null;
            const pUrl  = profile_url  || null;

            // Insert into platform_profile if the row doesn't already exist
            await conn.execute(
                `MERGE INTO platform_profile pp
                 USING (SELECT :platform_name AS platform_name, :username AS username FROM dual) src
                 ON (pp.platform_name = src.platform_name AND pp.username = src.username)
                 WHEN NOT MATCHED THEN
                   INSERT (platform_name, username, profile_url)
                   VALUES (src.platform_name, src.username, :profile_url)`,
                { platform_name: pName, username: uName, profile_url: pUrl }
            );

            await conn.execute(
                "INSERT INTO social_asset (asset_id, platform_name, username) VALUES (:asset_id, :platform_name, :username)",
                { asset_id: parseInt(asset_id), platform_name: pName, username: uName }
            );
        }
        await conn.commit();
        await conn.close();
        res.json({ message: "asset added successfully" });
    } catch (err) {
        await conn.rollback().catch(() => {});
        await conn.close();
        res.status(500).json({ error: err.message });
    }
});

app.post("/owner/beneficiaries/add", async (req, res) => {
    const { beneficiary_id, full_name, email, relationship_to_owner, owner_id, inheritance_percent } = req.body;
    const conn = await getConnection();
    try {
        await conn.execute(
            "INSERT INTO beneficiary VALUES (:beneficiary_id, :full_name, :email, :relationship_to_owner, 'pending')",
            { beneficiary_id: parseInt(beneficiary_id), full_name, email, relationship_to_owner }
        );
        if (owner_id) {
            const assetsResult = await conn.execute(
                "SELECT asset_id FROM digital_asset WHERE owner_id = :owner_id",
                { owner_id: parseInt(owner_id) }
            );
            const assetRows = assetsResult.rows || [];
            for (const row of assetRows) {
                const asset_id = row[0];
                await conn.execute(
                    `INSERT INTO designated_heir (asset_id, beneficiary_id, inheritance_percent, access_level)
                     VALUES (:asset_id, :beneficiary_id, :inheritance_percent, :access_level)`,
                    {
                        asset_id,
                        beneficiary_id: parseInt(beneficiary_id),
                        inheritance_percent: parseFloat(inheritance_percent) || 0,
                        access_level: "view"
                    }
                );
            }
        }
        await conn.commit();
        await conn.close();
        res.json({ message: "beneficiary added successfully" });
    } catch (err) {
        await conn.close();
        res.status(500).json({ error: err.message });
    }
});

app.post("/owner/triggers/add", async (req, res) => {
    const { trigger_id, owner_id, rule_type, rule_condition } = req.body;
    const conn = await getConnection();
    await conn.execute(
        "INSERT INTO access_trigger VALUES (:trigger_id, :owner_id, :rule_type, :rule_condition, 'active', SYSDATE)",
        { trigger_id: parseInt(trigger_id), owner_id: parseInt(owner_id), rule_type, rule_condition },
        { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "trigger created successfully" });
});

app.post("/owner/credentials/add", async (req, res) => {
    const { asset_id, credential_id, credential_type, credential_value } = req.body;
    const conn = await getConnection();
    await conn.execute(
        "INSERT INTO asset_credential VALUES (:asset_id, :credential_id, :credential_type, :credential_value, SYSDATE)",
        { asset_id: parseInt(asset_id), credential_id: parseInt(credential_id), credential_type, credential_value },
        { autoCommit: true }
    );
    await conn.close();
    res.json({ message: "credential saved successfully" });
});

// ── BENEFICIARY ROUTES ────────────────────────────────────

app.get("/beneficiary/profile/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM beneficiary WHERE beneficiary_id = :id",
        { id: parseInt(req.params.id) }
    );
    await conn.close();
    res.json(toRows(result)[0] || {});
});

app.get("/beneficiary/assets/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT da.asset_id, da.asset_name, da.asset_type, da.description,
               dh.inheritance_percent, dh.access_level,
               ao.full_name AS owner_name
        FROM designated_heir dh
        JOIN digital_asset da ON dh.asset_id = da.asset_id
        JOIN account_owner ao ON da.owner_id = ao.owner_id
        WHERE dh.beneficiary_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

app.get("/beneficiary/triggers/:id", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(`
        SELECT DISTINCT at.trigger_id, at.rule_type, at.rule_condition,
               at.trigger_status, at.last_activity_date, ao.full_name AS owner_name
        FROM access_trigger at
        JOIN account_owner ao ON at.owner_id = ao.owner_id
        JOIN digital_asset da ON da.owner_id = ao.owner_id
        JOIN designated_heir dh ON dh.asset_id = da.asset_id
        WHERE dh.beneficiary_id = :id
    `, { id: parseInt(req.params.id) });
    await conn.close();
    res.json(toRows(result));
});

// ── TRIGGER EVALUATION ────────────────────────────────────

app.post("/trigger/evaluate/:owner_id", async (req, res) => {
    const owner_id = parseInt(req.params.owner_id);
    const conn = await getConnection();

    const triggerResult = await conn.execute(
        "SELECT * FROM access_trigger WHERE owner_id = :id AND trigger_status = 'active'",
        { id: owner_id }
    );
    const triggers = toRows(triggerResult);

    const fired = [];

    for (const trigger of triggers) {
        const lastActivity = new Date(trigger.LAST_ACTIVITY_DATE);
        const now = new Date();
        const daysSinceActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));

        const condition = trigger.RULE_CONDITION || "";
        const match = condition.match(/(\d+)\s*days?/i);
        const threshold = match ? parseInt(match[1]) : null;

        if (trigger.RULE_TYPE === "inactivity" && threshold && daysSinceActivity >= threshold) {
            await conn.execute(
                "UPDATE access_trigger SET trigger_status = 'fired' WHERE trigger_id = :id",
                { id: trigger.TRIGGER_ID },
                { autoCommit: true }
            );
            fired.push({
                trigger_id: trigger.TRIGGER_ID,
                rule_type: trigger.RULE_TYPE,
                days_inactive: daysSinceActivity,
                threshold
            });
        }
    }

    await conn.close();

    if (fired.length > 0) {
        res.json({ message: "triggers evaluated — some triggers have fired", fired });
    } else {
        res.json({ message: "triggers evaluated — no conditions met yet", fired: [] });
    }
});

app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
