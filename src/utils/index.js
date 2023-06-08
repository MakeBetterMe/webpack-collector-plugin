const find = require("find-process");
const log = require('../utils/log')
const path = require("path");
const homeOrTemp = require('home-or-tmp')
const fs = require("fs-extra");
const fswin = require('fswin')

let PROJECT_NAME = null
const UNIQUE_CHILD_PROCESS_ID = 'PLUGIN_UNIQUE_CHILD_PROCESS_ID'
let DEV_SERVER_URL = null

//find current server process
async function findExistServerProcess() {
  const list = await find('name', 'node')
  if (list.length > 0) {
    const found = list.find(o => {
      return o.cmd.includes(UNIQUE_CHILD_PROCESS_ID)
    })
    if (found) {
      log.info('The project debug child_process is exist...')
      log.info(`The project running child_process_id is ${found.pid}`)
      return found
    }
  }
  return null
}

//user's mac，create hide directory for configs
function getPluginInHomeDirPath() {
  let rootPath = path.resolve(homeOrTemp, '.wpm/')
  fs.ensureDirSync(rootPath)
  if (isWin()) {
    log.info('The platform is windows')
    fswin.setAttributesSync(rootPath, {IS_HIDDEN: true});
  }
  let configFilePath = path.resolve(rootPath, 'configs.json')
  if (fs.pathExistsSync(configFilePath) === false) {
    fs.ensureFileSync(configFilePath)
    fs.writeJsonSync(configFilePath, {})
  }
  return rootPath
}

function getLocalConfigsFilePath() {
  const rootPath = getPluginInHomeDirPath()
  return path.resolve(rootPath, './configs.json')
}

function setValueInRootConfigs(key, value) {
  const configsPath = getLocalConfigsFilePath()
  const configs = require(configsPath)
  configs[key] = value
  fs.writeJsonSync(configsPath, configs)
}


function getValueInRootConfigs(key) {
  const configs = require(getLocalConfigsFilePath())
  return configs[key]
}

//缓存包名
function setProjectName(name) {
  PROJECT_NAME = name
}

function getProjectName() {
  return PROJECT_NAME
}

//check windows platform
function isWin() {
  return /^win/i.test(process.platform);
}

//开发环境下目前的url
function setDevServerUrl(url) {
  DEV_SERVER_URL = url
}

function getDevServerUrl() {
  return DEV_SERVER_URL
}


module.exports = {
  UNIQUE_CHILD_PROCESS_ID,
  setValueInRootConfigs,
  getValueInRootConfigs,
  getPluginInHomeDirPath,
  setProjectName,
  getProjectName,
  setDevServerUrl,
  getDevServerUrl,
  findExistServerProcess,
}
