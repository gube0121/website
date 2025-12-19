async function loadData() {
  const res = await fetch("data.json");
  return await res.json();
}

function search(query, data) {
  const q = query.toLowerCase();
  return data.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.content.toLowerCase().includes(q) ||
    item.tags.some(t => t.includes(q))
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData();
  const input = document.getElementById("q");
  const results = document.getElementById("results");

  input.addEventListener("input", () => {
    results.innerHTML = "";
    const matches = search(input.value, data);
    matches.forEach(m => {
      const li = document.createElement("li");
      li.textContent = m.title;
      results.appendChild(li);
    });
  });
});
