const Promise = require('bluebird');
const rp = require('request-promise');
const _ = require('lodash');
const jsonfile = require('jsonfile');
const fs = Promise.promisifyAll(require('fs-extra'));
const colors = require('colors');

const re = {
  hex: /[0-9a-f]{6}/g,
  hexX4: /[0-9a-f]{24}/g
};

const MAX_POPULAR_STEP = 15;
const POST_URL = 'http://www.colorhunt.co/get.php';
function getReuestData(step, sort = 'popular') {
  return rp.post({ url: POST_URL, form: { step, sort } });
}

function parseResponseData(data) {
  return data
    .match(re.hexX4)
    .map((part) => part.match(re.hex).map((color) => `#${color}`));
}

const requests = [];
for (let index = 0; index < MAX_POPULAR_STEP; index++) {
  requests.push(getReuestData(index));
}

Promise.map(requests, parseResponseData)
  .then((data) => fs.writeJson('./public/package.json', _.flatten(data)))
  .then(() => console.log(`Scrapped data from ${'colorhunt.co'.green} placed to ${'public/package.json'.yellow}`))
