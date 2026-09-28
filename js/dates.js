// Loads tour dates from dates.csv, splits them into upcoming/past by comparing
// each row to today, renders both tables, and publishes MusicEvent structured
// data for the upcoming shows.

function parseCsvLine(line) {
  const firstComma = line.indexOf(',');
  const secondComma = line.indexOf(',', firstComma + 1);
  const thirdComma = line.indexOf(',', secondComma + 1);
  return {
    date: line.slice(0, firstComma).trim(),
    venue: line.slice(firstComma + 1, secondComma).trim(),
    city: line.slice(secondComma + 1, thirdComma).trim(),
    link: line.slice(thirdComma + 1).trim()
  };
}

function parseFrenchDate(dateStr) {
  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return new Date(year, month - 1, day);
}

function parseDatesCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter(function (line) {
    return line.trim() !== '';
  });
  const rows = lines.slice(1); // drop header row
  return rows.map(function (line) {
    const row = parseCsvLine(line);
    row.dateObj = parseFrenchDate(row.date);
    return row;
  });
}

function partitionShows(shows, today) {
  const upcoming = shows
    .filter(function (show) { return show.dateObj >= today; })
    .sort(function (a, b) { return a.dateObj - b.dateObj; });
  const past = shows
    .filter(function (show) { return show.dateObj < today; })
    .sort(function (a, b) { return b.dateObj - a.dateObj; });
  return { upcoming: upcoming, past: past };
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatIsoDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function buildMusicEventJsonLd(upcomingShows) {
  return upcomingShows.map(function (show) {
    return {
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: 'La Débâcle en concert - ' + show.venue,
      startDate: formatIsoDate(show.dateObj),
      location: {
        '@type': 'Place',
        name: show.venue,
        address: show.city
      },
      performer: { '@type': 'MusicGroup', name: 'La Débâcle' },
      url: show.link
    };
  });
}

function buildShowRow(show) {
  const tr = document.createElement('tr');

  const dateCell = document.createElement('td');
  dateCell.textContent = show.date;

  const venueCell = document.createElement('td');
  const span = document.createElement('span');
  span.className = 'white';
  const link = document.createElement('a');
  link.href = show.link;
  link.target = '_blank';
  link.textContent = show.venue;
  span.appendChild(link);
  venueCell.appendChild(span);

  const cityCell = document.createElement('td');
  cityCell.textContent = show.city;

  tr.appendChild(dateCell);
  tr.appendChild(venueCell);
  tr.appendChild(cityCell);
  return tr;
}

function buildMessageRow(message) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = 3;
  td.textContent = message;
  tr.appendChild(td);
  return tr;
}

function renderShowsTable(tbody, shows, emptyMessage) {
  tbody.innerHTML = '';
  if (shows.length === 0) {
    tbody.appendChild(buildMessageRow(emptyMessage));
    return;
  }
  shows.forEach(function (show) {
    tbody.appendChild(buildShowRow(show));
  });
}

function injectMusicEventJsonLd(upcomingShows) {
  const events = buildMusicEventJsonLd(upcomingShows);
  if (events.length === 0) {
    return;
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(events);
  document.head.appendChild(script);
}

async function initDates() {
  const upcomingBody = document.getElementById('upcoming-shows');
  const pastBody = document.getElementById('past-shows');
  if (!upcomingBody || !pastBody) {
    return;
  }

  try {
    const response = await fetch('dates.csv');
    const csvText = await response.text();
    const shows = parseDatesCsv(csvText);
    const partitioned = partitionShows(shows, startOfToday());

    renderShowsTable(upcomingBody, partitioned.upcoming, 'Aucune date pour l’instant.');
    renderShowsTable(pastBody, partitioned.past, 'Aucune date passée.');
    injectMusicEventJsonLd(partitioned.upcoming);
  } catch (error) {
    const message = location.protocol === 'file:'
      ? 'Aperçu local : ouvrez ce site via un serveur local (ex. python -m http.server) pour voir les dates. Cela fonctionne automatiquement une fois publié en ligne.'
      : 'Impossible de charger les dates pour le moment.';
    renderShowsTable(upcomingBody, [], message);
    renderShowsTable(pastBody, [], message);
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', initDates);
}

if (typeof module !== 'undefined') {
  module.exports = {
    parseCsvLine: parseCsvLine,
    parseFrenchDate: parseFrenchDate,
    parseDatesCsv: parseDatesCsv,
    partitionShows: partitionShows,
    buildMusicEventJsonLd: buildMusicEventJsonLd
  };
}
