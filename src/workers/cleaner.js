const log = require('../utils/log')
const {getValueInRootConfigs} = require("../utils");
const axios = require("axios");

function registerCleaner() {
  log.info('cleaner process is running...')
  process.on('message', async function (m) {
    if (m.type === 'close') {
      await unRegisterLib(m.pkgName)
      process.exit(1)
    }
  });
}

async function unRegisterLib(pkgName) {
  log.info(`listening stopped，the name is->${pkgName}...`)
  const port = getValueInRootConfigs('ChildProcessServerPort')
  try {
    await axios.post(`http://localhost:${port}/delete`, {pkgName})
    log.info(`${pkgName}had been stopped`)
  } catch (e) {
    throw e
  }
}

registerCleaner()

