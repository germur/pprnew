import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAreaSearch, matchesArea } from '../public/service-areas.js';

const cities = [
  { name: 'Miami', region: 'miami-dade', regionName: 'Miami-Dade' },
  { name: 'Miami Gardens', region: 'miami-dade', regionName: 'Miami-Dade' },
  { name: 'Fort Myers', region: 'southwest-florida', regionName: 'Southwest Florida' },
  { name: 'Fort Lauderdale', region: 'broward', regionName: 'Broward' },
  { name: 'Port St. Lucie', region: 'treasure-coast', regionName: 'Treasure Coast' },
  { name: 'St. Cloud', region: 'central-florida', regionName: 'Central Florida' },
];
const results = (query, region) => cities.filter(city => matchesArea(city, query, region)).map(city => city.name);

test('city search accepts accents, punctuation and common Fort/Saint variants', () => {
  assert.deepEqual(results('  MIAMÍ  '), ['Miami', 'Miami Gardens']);
  assert.deepEqual(results('Ft. Myers'), ['Fort Myers']);
  assert.deepEqual(results('Port Saint Lucie'), ['Port St. Lucie']);
  assert.deepEqual(results('St Cloud'), ['St. Cloud']);
  assert.equal(normalizeAreaSearch('Treasure-Coast'), 'treasure coast');
});
test('search can find a region and combine words in any order', () => {
  assert.deepEqual(results('Broward'), ['Fort Lauderdale']);
  assert.deepEqual(results('Florida southwest'), ['Fort Myers']);
  assert.deepEqual(results('Lucie Port'), ['Port St. Lucie']);
});
test('region selection and city search intersect instead of expanding coverage', () => {
  assert.deepEqual(results('Miami', 'broward'), []);
  assert.deepEqual(results('', 'broward'), ['Fort Lauderdale']);
  assert.deepEqual(results('Fort', 'southwest-florida'), ['Fort Myers']);
});
test('clearing search returns all entries; unknown places have no fabricated match', () => {
  assert.deepEqual(results(''), cities.map(city => city.name));
  assert.deepEqual(results('Tampa'), []);
  assert.deepEqual(results('<script>not-a-city</script>'), []);
});
