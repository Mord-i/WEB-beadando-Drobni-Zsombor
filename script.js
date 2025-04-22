const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

let data = [];

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
