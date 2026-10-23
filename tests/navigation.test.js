import test from 'node:test';
import assert from 'node:assert/strict';
import { initNavigation } from '../public/navigation.js';

function element() {
  const events=new Map(), attrs=new Map(), classes=new Set();
  return { events, inert:true, style:{},
    getClientRects:()=>[{}],
    addEventListener:(name,fn)=>events.set(name,fn),
    setAttribute:(key,value)=>attrs.set(key,value), getAttribute:key=>attrs.get(key),
    classList:{toggle:(key,value)=>value?classes.add(key):classes.delete(key)},
    focus(){document.activeElement=this;},
  };
}
test('services open with keyboard and close with Escape or outside click', () => {
  const original=globalThis.document;
  const button=element(),dropdown=element(),link=element(),parent=element(),events=new Map();
  button.parentElement=parent;parent.contains=node=>[button,dropdown,link].includes(node);dropdown.querySelector=()=>link;
  globalThis.document={querySelector:s=>s==='[data-services-toggle]'?button:s==='#services-dropdown'?dropdown:null,addEventListener:(name,fn)=>events.set(name,fn)};
  try {
    initNavigation();parent.events.get('keydown')({key:'ArrowDown',target:button,preventDefault(){}});
    assert.equal(button.getAttribute('aria-expanded'),'true');assert.equal(dropdown.inert,false);assert.equal(document.activeElement,link);
    parent.events.get('keydown')({key:'Escape'});assert.equal(dropdown.inert,true);assert.equal(document.activeElement,button);
    button.events.get('click')();events.get('click')({target:{}});assert.equal(button.getAttribute('aria-expanded'),'false');
  } finally { globalThis.document=original; }
});
test('mobile menu manages focus, traps Tab and restores scrolling', () => {
  const originalDocument=globalThis.document,originalWindow=globalThis.window;
  const burger=element(),menu=element(),first=element(),last=element(),call=element(),main=element(),events=new Map();let resize;
  menu.querySelector=()=>first;menu.querySelectorAll=()=>[first,last];
  globalThis.document={body:{style:{overflow:'auto'}},activeElement:burger,querySelector:s=>s==='.burger'?burger:s==='.mnav'?menu:null,querySelectorAll:s=>s==='main,footer,.util'?[main]:[call,burger],addEventListener:(name,fn)=>events.set(name,fn)};
  globalThis.window={matchMedia:()=>({addEventListener:(_,fn)=>{resize=fn;}})};
  try {
    initNavigation();burger.events.get('click')();assert.equal(burger.getAttribute('aria-expanded'),'true');assert.equal(menu.inert,false);assert.equal(main.inert,true);assert.equal(document.activeElement,first);assert.equal(document.body.style.overflow,'hidden');
    last.focus();let prevented=false;events.get('keydown')({key:'Tab',shiftKey:false,preventDefault(){prevented=true;}});assert.equal(prevented,true);assert.equal(document.activeElement,call);
    events.get('keydown')({key:'Escape',preventDefault(){}});assert.equal(menu.inert,true);assert.equal(main.inert,false);assert.equal(document.activeElement,burger);assert.equal(document.body.style.overflow,'auto');
    burger.events.get('click')();resize({matches:true});assert.equal(burger.getAttribute('aria-expanded'),'false');
  } finally {globalThis.document=originalDocument;globalThis.window=originalWindow;}
});
