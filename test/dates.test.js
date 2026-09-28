// Basic tests for the pure CSV/date logic in js/dates.js.
// Run with: node test/dates.test.js

const assert = require('assert');
const {
  parseFrenchDate,
  parseDatesCsv,
  partitionShows,
  buildMusicEventJsonLd
} = require('../js/dates.js');

const csv = [
  'date,venue,city,link',
  '13/06/2026,Le Ravelin,Toulouse (31),https://example.com/ravelin',
  '07/12/2024,L\'Engrenage,Balma (31),https://example.com/engrenage'
].join('\n');

// parseFrenchDate
assert.deepStrictEqual(parseFrenchDate('13/06/2026'), new Date(2026, 5, 13));

// parseDatesCsv
const shows = parseDatesCsv(csv);
assert.strictEqual(shows.length, 2);
assert.strictEqual(shows[0].venue, 'Le Ravelin');
assert.strictEqual(shows[0].city, 'Toulouse (31)');
assert.strictEqual(shows[1].venue, 'L\'Engrenage');
assert.deepStrictEqual(shows[1].dateObj, new Date(2024, 11, 7));

// partitionShows: splits by today, sorts upcoming ascending / past descending
const today = new Date(2026, 8, 28); // 2026-09-28
const moreShows = parseDatesCsv([
  'date,venue,city,link',
  '13/06/2026,Le Ravelin,Toulouse (31),https://example.com/a',
  '24/01/2026,Ride\'n\'Rock,Montans (81),https://example.com/b',
  '13/06/2027,Futur Concert,Paris (75),https://example.com/c'
].join('\n'));
const partitioned = partitionShows(moreShows, today);
assert.strictEqual(partitioned.upcoming.length, 1);
assert.strictEqual(partitioned.upcoming[0].venue, 'Futur Concert');
assert.strictEqual(partitioned.past.length, 2);
assert.strictEqual(partitioned.past[0].venue, 'Le Ravelin'); // most recent past first
assert.strictEqual(partitioned.past[1].venue, 'Ride\'n\'Rock');

// buildMusicEventJsonLd
const events = buildMusicEventJsonLd(partitioned.upcoming);
assert.strictEqual(events.length, 1);
assert.strictEqual(events[0]['@type'], 'MusicEvent');
assert.strictEqual(events[0].startDate, '2027-06-13');
assert.strictEqual(events[0].location.name, 'Futur Concert');

console.log('All dates.js tests passed.');
