import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from '../scripts/companycam-pagination.mjs';

test('continues after a 50-item page even when 100 were requested', async () => {
  const pages = [Array.from({length:50},(_,id)=>({id})), [{id:50}], []];
  let calls=0;
  const result=await paginate(async page=>{calls++;return pages[page-1];});
  assert.equal(result.length,51);
  assert.equal(calls,3);
});
test('deduplicates overlapping pages', async () => {
  const pages=[[{id:1},{id:2}],[{id:2},{id:3}],[]];
  assert.deepEqual((await paginate(async p=>pages[p-1])).map(x=>x.id),[1,2,3]);
});
test('fails without replacing the catalog when the API repeats a page', async () => {
  await assert.rejects(paginate(async()=>[{id:1}]),/repeated/);
});
test('rejects malformed responses', async () => {
  await assert.rejects(paginate(async()=>({error:'invalid'})),/Unexpected/);
});
