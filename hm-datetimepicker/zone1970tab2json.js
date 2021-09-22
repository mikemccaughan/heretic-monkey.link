// This file converts the zone1970.tab file from the tzdata file of the IANA tzdb distribution to JSON format,
// making it easier to provide selection of time zones from a drop-down.
// The JSON will be stored in a file named zone1970.json in the same folder as this file, which must be in 
// the same folder as zone1970.tab, which is assumed to be in the same folder as DateHelper.mjs.
const fs = require('fs/promises');
const parser = require('node-html-parser');

(async () => {
  const zoneTab = await fs.readFile('zone1970.tab', { encoding: 'utf8' });
  const zoneWikiHtml = await fs.readFile('wikipedia-timezones.html');
  const table = parser.parse(zoneWikiHtml);
  const canonicalZones = Array.from(table.querySelectorAll('tr'))
    .filter((tr) =>
      Array.from(tr.querySelectorAll('td')).some((td) =>
        td.innerText.includes('Canonical')
      )
    )
    .map((tr) => {
      return {
        timeZoneName:
          tr.querySelector('td:nth-child(3)').querySelector('a')?.innerText ??
          tr.querySelector('td:nth-child(3)').innerText,
        utcOffsetStandard: tr
          .querySelector('td:nth-child(6)')
          ?.querySelector('a')?.innerText,
        utcOffsetDST: tr.querySelector('td:nth-child(7)')?.querySelector('a')
          ?.innerText,
      };
    });
  const aliasZones = Array.from(table.querySelectorAll('tr'))
    .filter((tr) => 
      Array.from(tr.querySelectorAll('td')).some((td) => 
        td.innerText.includes('Alias')
      )
    )
    .map((tr) => {
      return {
        timeZoneName:
          tr.querySelector('td:nth-child(3)').querySelector('a')?.innerText ??
          tr.querySelector('td:nth-child(3)').innerText,
        utcOffsetStandard: tr
          .querySelector('td:nth-child(6)')
          ?.querySelector('a')?.innerText,
        utcOffsetDST: tr.querySelector('td:nth-child(7)')?.querySelector('a')
          ?.innerText,
        linkTo: tr.querySelector('td:nth-child(8)')?.querySelector('a')?.innerText,
      };
    })
  const zoneTabLines = zoneTab
    .split('\n')
    .filter((line) => line[0] !== '#')
    .map((line) => line.split('\t'))
    .map(([countryCodes, coords, timeZoneName, comments]) => ({
      countryCodes,
      coords,
      timeZoneName,
      comments,
    }))
    .filter((obj) => obj.timeZoneName?.length)
    .map((obj) => {
      const canonicalZone = canonicalZones.find(
        (cZone) => cZone.timeZoneName?.trim() === obj.timeZoneName.trim()
      );
      if (canonicalZone) {
        obj.utcOffsetDST = canonicalZone.utcOffsetDST;
        obj.utcOffsetStandard = canonicalZone.utcOffsetStandard;
      }
      const aliasZone = aliasZones.find((aZone) => aZone.timeZoneName?.trim() === obj.timeZoneName?.trim());
      if (aliasZone) {
        obj.utcOffsetDST = aliasZone.utcOffsetDST;
        obj.utcOffsetStandard = aliasZone.utcOffsetStandard;
        obj.linkTo = aliasZone.linkTo;
      }
      return obj;
    });
  await fs.writeFile('zone1970.json', JSON.stringify(zoneTabLines, null, 2), {
    encoding: 'utf8',
    flag: 'w',
  });
  console.log('wrote zone1970.json');
})();
