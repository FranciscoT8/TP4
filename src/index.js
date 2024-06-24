import './styles.css';

document.addEventListener('DOMContentLoaded', function () {
  const API_URL = 'https://api.spacexdata.com/v5/launches';
  const mainContent = document.getElementById('main-content');
  const launchesGrid = document.getElementById('launches-grid');

  async function fetchLaunches() {
    try {
      const response = await fetch(API_URL);
      const launches = await response.json();
      displayLaunches(launches);
    } catch (error) {
      console.error('Error fetching launches:', error);
    }
  }

  function displayLaunches(launches) {
    launches.forEach(launch => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${launch.name}</h3>
        <img src="${launch.links.patch.small}" alt="${launch.name}">
      `;
      card.addEventListener('click', () => showDetails(launch));
      launchesGrid.appendChild(card);
    });
  }

  function showDetails(launch) {
    mainContent.innerHTML = `
      <div class="details">
        <img src="${launch.links.patch.small}" alt="${launch.name}">
        <p><strong>Launch name: </strong>${launch.name} </p>
        <p><strong>Flight number:</strong> ${launch.flight_number}</p>
        <p><strong>Launch date:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
        <p><strong>Launch details:</strong> ${launch.details || 'No details available'}</p>
        ${launch.failures.length > 0 ? `
          <p><strong>Failures:</strong></p>
          <ul>
            ${launch.failures.map(failure => `<li>${failure.reason}</li>`).join('')}
          </ul>
        ` : ''}
        <button onclick="window.location.reload()">Ir al inicio</button> 
      </div>
    `;
  }

  fetchLaunches();
});
