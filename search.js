async function searchWiki(query) {
  if (!query) return [];

  const url =
    "https://en.wikipedia.org/w/api.php" +
    "?action=query" +
    "&list=search" +
    "&format=json" +
    "&origin=*" +
    "&srsearch=" + encodeURIComponent(query);

  const res = await fetch(url);
  const data = await res.json();
  return data.query.search;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("q");
  const results = document.getElementById("results");

  input.addEventListener("input", async () => {
    results.innerHTML = "";
    const items = await searchWiki(input.value);

    items.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.textContent = item.title;
      a.href = "https://en.wikipedia.org/wiki/" +
               encodeURIComponent(item.title);
      a.target = "_blank";
      a.rel = "noreferrer";

      li.appendChild(a);
      results.appendChild(li);
    });
  });
});

