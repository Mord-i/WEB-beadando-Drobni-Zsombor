const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

let data = [
  { name: "Kovács Anna", email: "anna.kovacs@example.com", age: 23, city: "Budapest" },
  { name: "Nagy Péter", email: "peter.nagy@example.com", age: 34, city: "Szeged" },
  { name: "Tóth Réka", email: "reka.toth@example.com", age: 28, city: "Debrecen" },
  { name: "Szabó Dániel", email: "daniel.szabo@example.com", age: 31, city: "Győr" },
  { name: "Varga Noémi", email: "noemi.varga@example.com", age: 26, city: "Pécs" },
  { name: "Horváth Gábor", email: "gabor.horvath@example.com", age: 45, city: "Miskolc" },
  { name: "Farkas Emese", email: "emese.farkas@example.com", age: 22, city: "Kecskemét" },
  { name: "Kiss László", email: "laszlo.kiss@example.com", age: 39, city: "Nyíregyháza" },
  { name: "Balogh Júlia", email: "julia.balogh@example.com", age: 30, city: "Székesfehérvár" },
  { name: "Molnár Kristóf", email: "kristof.molnar@example.com", age: 27, city: "Zalaegerszeg" }
];

renderTable(data);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const age = form.age.value.trim();
  const city = form.city.value.trim();

  if (!name || !email || !age || !city) return;

  data.push({ name, email, age, city });
  renderTable(data);
  form.reset();
});

function renderTable(dataArray) {
  tableBody.innerHTML = '';
  dataArray.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td>${row.age}</td>
      <td>${row.city}</td>
      <td>
        <button onclick="editRow(${index})">Szerkeszt</button>
        <button onclick="deleteRow(${index})">Törlés</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function deleteRow(index) {
  data.splice(index, 1);
  renderTable(data);
}

function editRow(index) {
  const item = data[index];
  form.name.value = item.name;
  form.email.value = item.email;
  form.age.value = item.age;
  form.city.value = item.city;
  deleteRow(index);
}

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = data.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(query)
    )
  );
  renderTable(filtered);
});

// Sortable columns
document.querySelectorAll('th[data-column]').forEach(header => {
  header.addEventListener('click', () => {
    const column = header.getAttribute('data-column');
    const sorted = [...data].sort((a, b) =>
      a[column].toString().localeCompare(b[column].toString(), 'hu', { numeric: true })
    );
    renderTable(sorted);
  });
});
