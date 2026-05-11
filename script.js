var dictionaryData = [
    {"word":"Serendipity","pos":"noun","definition":"The occurrence of events by chance in a happy or beneficial way","example":"It was pure serendipity that we met at the coffee shop."},
    {"word":"Ephemeral","pos":"adjective","definition":"Lasting for a very short time; fleeting","example":"The beauty of cherry blossoms is ephemeral, lasting only a week."},
    {"word":"Eloquent","pos":"adjective","definition":"Fluent or persuasive in speaking or writing","example":"She gave an eloquent speech that moved the entire audience."},
    {"word":"Mellifluous","pos":"adjective","definition":"(of a voice or words) sweet or musical; pleasant to hear","example":"The mellifluous tones of the cello filled the concert hall."},
    {"word":"Labyrinth","pos":"noun","definition":"A complicated irregular network of passages or paths in which it is difficult to find one's way","example":"We wandered through the labyrinth of narrow streets in the old city."},
    {"word":"Quixotic","pos":"adjective","definition":"Exceedingly idealistic; unrealistic and impractical","example":"His quixotic quest to end world hunger inspired many volunteers."},
    {"word":"Surreptitious","pos":"adjective","definition":"Kept secret, especially because it would not be approved of","example":"She cast a surreptitious glance at his notes during the exam."},
    {"word":"Ubiquitous","pos":"adjective","definition":"Present, appearing, or found everywhere","example":"Smartphones have become ubiquitous in modern society."},
    {"word":"Voracious","pos":"adjective","definition":"Wanting or devouring great quantities of food; having a very eager approach to an activity","example":"He was a voracious reader, finishing three books a week."},
    {"word":"Zealous","pos":"adjective","definition":"Having or showing zeal; fervent and enthusiastic","example":"The zealous volunteers worked tirelessly through the night."}
];

function renderTable(data) {
    var tbody = document.getElementById("table-body");
    tbody.innerHTML = "";
    data.forEach(function(item, index) {
        var row = document.createElement("tr");
        row.className = "dict-row";
        row.innerHTML = 
            '<td class="w3-padding-16 w3-text-grey">' + (index + 1) + '</td>' +
            '<td class="word-cell w3-padding-16">' + escapeHtml(item.word) + '</td>' +
            '<td class="w3-padding-16 w3-text-teal">' + escapeHtml(item.pos) + '</td>' +
            '<td class="def-cell w3-padding-16">' + escapeHtml(item.definition) + '</td>' +
            '<td class="w3-padding-16 w3-text-grey w3-hide-small"><em>' + escapeHtml(item.example) + '</em></td>';
        row.querySelector(".word-cell").onclick = function() { openModal(item); };
        tbody.appendChild(row);
    });
    document.getElementById("entry-count").innerText = data.length;
}

function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function filterTable(query) {
    var rows = document.querySelectorAll(".dict-row");
    var lowerQuery = query.toLowerCase();
    rows.forEach(function(row) {
        var text = row.textContent.toLowerCase();
        row.style.display = text.indexOf(lowerQuery) > -1 ? "" : "none";
    });
}

function openModal(item) {
    document.getElementById("modal-word").innerText = item.word;
    document.getElementById("modal-pos").innerText = item.pos;
    document.getElementById("modal-def").innerText = item.definition;
    document.getElementById("modal-example").innerText = item.example;
    document.getElementById("def-modal").style.display = "block";
}

function copyJsonToClipboard() {
    var jsonText = JSON.stringify(dictionaryData, null, 2);
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(jsonText).then(function() { showToast("JSON copied to clipboard!"); })
        .catch(function() { fallbackCopy(jsonText); });
    } else { fallbackCopy(jsonText); }
}

function fallbackCopy(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; textArea.style.left = "-9999px";
    document.body.appendChild(textArea); textArea.focus(); textArea.select();
    try {
        var successful = document.execCommand("copy");
        showToast(successful ? "JSON copied to clipboard!" : "Failed to copy.");
    } catch (err) { showToast("Failed to copy. Please select and copy manually."); }
    document.body.removeChild(textArea);
}

function showToast(message) {
    var toast = document.getElementById("toast");
    toast.innerText = message; toast.classList.add("show");
    setTimeout(function() { toast.classList.remove("show"); }, 3000);
}

function toggleJsonPreview() {
    var preview = document.getElementById("json-preview");
    if (preview.style.display === "none") {
        preview.textContent = JSON.stringify(dictionaryData, null, 2);
        preview.style.display = "block";
    } else { preview.style.display = "none"; }
}

window.onclick = function(event) {
    var modal = document.getElementById("def-modal");
    if (event.target == modal) { modal.style.display = "none"; }
}

document.addEventListener("DOMContentLoaded", function() {
    renderTable(dictionaryData);
});
