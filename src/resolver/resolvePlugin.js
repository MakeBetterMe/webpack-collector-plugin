const fs = require('fs-extra')
const path = require("path");
const log = require('../utils/log')
const {setProjectName} = require('../utils/index')
const {getPluginInHomeDirPath} = require("../utils/index");

let projectName = null

function resolvePlugin(options = {}) {
  //先把脚本依赖的本地目录生成下
  getPluginInHomeDirPath()
  if (options.projectName){
    projectName = options.projectName
  }else{
    const jsonPath = path.resolve(process.cwd(),'package.json')
    if (fs.pathExistsSync(jsonPath)){
      projectName = require(jsonPath).name
    }
  }
  if (projectName == null){
    throw 'No available project name was detected, please set the name parameter in the plugin, the field is name'
  }else{
    setProjectName(projectName)
    log.info(`project name detected：${projectName}`)
    log.info("Please ensure that the plugin configuration name, or the name setting in package.json")
  }
}

module.exports = resolvePlugin
