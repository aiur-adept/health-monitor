import { HealthMonitorDB, TS_GOOD } from './db.js';

const db = HealthMonitorDB.getInstance();
await db.load();

// TODO: create `headers` from data.entries.reduce()
const headers = ['date'];
for (const entry of db.entries) {
    for (const category in entry.data) {
        if (!headers.includes(category)) {
            headers.push(category);
        }
    }
}

let content = '';
content += `${headers.join(',')}\n`;

// TODO: output data in csv from data.entries.reduce()
for (const entry of db.entries) {
    let line = [];
    for (const category of headers) {
        if (category == 'date') {
            line.push(entry.date);
        } else {
            line.push(entry.data[category]);
        }
    }
    content += line.join(',') + '\n';
}

console.log(content);