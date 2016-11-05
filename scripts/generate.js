/* eslint-disable no-console */
require('colors');

const Promise = require('bluebird');
const rp = require('request-promise');
const flatten = require('lodash').flatten;
const mkdirp = Promise.promisify(require('mkdirp'));
const writeJson = Promise.promisify(require('jsonfile').writeFile);


const MAX_POPULAR_STEP = 15;
const POST_URL = 'http://www.colorhunt.co/get.php';
const PUBLIC_FOLDER = './public';
const FILE_NAME = `${PUBLIC_FOLDER}/presets.json`;
const HEX_RE = {
  hex: /[0-9a-f]{6}/g,
  hexX4: /[0-9a-f]{24}/g,
};

function getReuestData(step, sort = 'popular') {
  return rp.post({ url: POST_URL, form: { step, sort } });
}

function parseResponseData(data) {
  return data
    .match(HEX_RE.hexX4)
    .map((part) => part.match(HEX_RE.hex).map((color) => `#${color}`));
}

const requests = [];
for (let index = 0; index < MAX_POPULAR_STEP; index++) {
  requests.push(getReuestData(index));
}

mkdirp('./public')
  .then(() => Promise.map(requests, parseResponseData))
  .then((data) => writeJson(FILE_NAME, flatten(data)))
  .then(() => console.log(`Scrapped data from ${POST_URL.green} placed to ${FILE_NAME.yellow}`));
