import {readFile,writeFile} from 'node:fs/promises';
const source=await readFile(new URL('../lib/sync-engine.mjs',import.meta.url),'utf8');
const body=source.replace(/^export .*$/gm,'');
await writeFile(new URL('../sync-engine.js',import.meta.url),"/* Generated from lib/sync-engine.mjs. */\n(function(root){'use strict';\n"+body+"\nroot.SyncEngine={clone,stable,equal,mergeProgress,cloudState,sanitizeState};\n})(globalThis);\n");
const controller=(await readFile(new URL('../lib/sync-controller.mjs',import.meta.url),'utf8')).replace(/^import .*$/gm,"const {clone,equal,cloudState,mergeProgress}=root.SyncEngine;").replace(/^export .*$/gm,'');
await writeFile(new URL('../sync-controller.js',import.meta.url),"/* Generated from lib/sync-controller.mjs. */\n(function(root){'use strict';\n"+controller+"\nroot.SyncController=SyncController;\n})(globalThis);\n");
