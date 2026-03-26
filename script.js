function displayResult(data) {
    const result = document.getElementById("result");

    if (!data || (Array.isArray(data) && data.length === 0)) {
        result.innerHTML = "<p>no records found.</p>";
        return;
    }

    if (!Array.isArray(data)) {
        data = [data];
    }

    const columns = Object.keys(data[0]);
    const colWidth = Math.floor(100 / columns.length) + "%";

    let table = "<table class='output-table'>";

    table += "<colgroup>";
    columns.forEach(() => {
        table += `<col style="width: ${colWidth}">`;
    });
    table += "</colgroup>";

    table += "<thead><tr>";
    columns.forEach(col => {
        table += `<th title="${col.toLowerCase()}">${col.toLowerCase()}</th>`;
    });
    table += "</tr></thead>";

    table += "<tbody>";
    data.forEach(row => {
        table += "<tr>";
        columns.forEach(col => {
            const value = row[col] !== null && row[col] !== undefined ? row[col] : "-";
            table += `<td title="${value}">${value}</td>`;
        });
        table += "</tr>";
    });
    table += "</tbody></table>";

    result.innerHTML = table;
}

function fetchAll() {
    fetch("/assets")
        .then(res => res.json())
        .then(data => displayResult(data));
}

function fetchFirst() {
    fetch("/assets/first")
        .then(res => res.json())
        .then(data => displayResult(data));
}

function fetchLast() {
    fetch("/assets/last")
        .then(res => res.json())
        .then(data => displayResult(data));
}

function searchAssets() {
    const keyword = document.getElementById("searchInput").value;
    fetch("/assets/search?keyword=" + keyword)
        .then(res => res.json())
        .then(data => displayResult(data));
}

function fetchTotalValue() {
    fetch("/assets/total-value")
        .then(res => res.json())
        .then(data => displayResult(data));
}

function insertAsset() {
    const data = {
        asset_id: parseInt(document.getElementById("ins_id").value),
        asset_name: document.getElementById("ins_name").value,
        asset_type: document.getElementById("ins_type").value,
        description: document.getElementById("ins_desc").value,
        owner_id: parseInt(document.getElementById("ins_owner").value)
    };
    fetch("/assets/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => displayResult(data));
}

function updateAsset() {
    const data = {
        asset_id: parseInt(document.getElementById("upd_id").value),
        asset_name: document.getElementById("upd_name").value
    };
    fetch("/assets/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => displayResult(data));
}

function deleteAsset() {
    const data = {
        asset_id: parseInt(document.getElementById("del_id").value)
    };
    fetch("/assets/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => displayResult(data));
}
