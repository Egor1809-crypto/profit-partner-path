const worker = (await import('./dist/server/index.js')).default;
const res = await worker.fetch(new Request('http://localhost/'), {}, {});
console.log('status:', res.status);
const html = await res.text();
console.log('len:', html.length);
console.log('has <html:', html.includes('<html'));
console.log('snippet:', html.slice(0, 200).replace(/\n/g,' '));
