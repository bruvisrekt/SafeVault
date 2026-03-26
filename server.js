const express = require("express");
const oracledb = require("oracledb");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const dbConfig = {
    user: "SYSTEM",
    password: "nix06#",
    connectString: "localhost/xepdb1"
};

async function getConnection() {
    return await oracledb.getConnection(dbConfig);
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/assets", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM digital_asset");
    await conn.close();
    const columns = result.metaData.map(col => col.name);
    const rows = result.rows.map(row => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
    res.json(rows);
});

app.get("/assets/first", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM digital_asset WHERE ROWNUM = 1");
    await conn.close();
    const columns = result.metaData.map(col => col.name);
    res.json(Object.fromEntries(columns.map((col, i) => [col, result.rows[0][i]])));
});

app.get("/assets/last", async (req, res) => {
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM digital_asset WHERE asset_id = (SELECT MAX(asset_id) FROM digital_asset)"
    );
    await conn.close();
    const columns = result.metaData.map(col => col.name);
    res.json(Object.fromEntries(columns.map((col, i) => [col, result.rows[0][i]])));
});

app.get("/assets/search", async (req, res) => {
    const keyword = req.query.keyword || "";
    const conn = await getConnection();
    const result = await conn.execute(
        "SELECT * FROM digital_asset WHERE LOWER(asset_name) LIKE :keyword",
        { keyword: `%${keyword.toLowerCase()}%` }
    );
    await conn.close();
    const columns = result.metaData.map(col => col.name);
    const rows = result.rows.map(row => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
    res.json(rows);
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
    const columns = result.metaData.map(col => col.name);
    const rows = result.rows.map(row => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
    res.json(rows);
});

app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});