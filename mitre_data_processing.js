const fs = require('fs');
const mispFilePath = 'MISP_events_2021Q1.json';

const rawData = fs.readFileSync(mispFilePath);
const mispEvents = JSON.parse(rawData).response;

const mitreAttackTags = {};

mispEvents.forEach(x => {
  const tags = x['Event']['Tag'];
  tags.forEach(tag => {
    if (tag.name.includes('misp-galaxy:mitre-attack-pattern')) {
      mitreAttackTags[tag.name] ? mitreAttackTags[tag.name] ++ : mitreAttackTags[tag.name] = 1;
    }
  });
});

//console.log(mitreAttackTags);
let mispResultData = '';

Object.entries(mitreAttackTags).forEach(([name, count]) => {
  //console.log(name, ',', count);
  mispResultData += `${name},${count}\n`;
});

fs.writeFile('C:\\Projects\\MISP\\MISP_Mitre_stat_2021Q1.txt', mispResultData, (err) => {
  if (err) throw err;
  console.log('my.txt saved.');
});
