const {fork} = require('child_process');
const path = require("path");
const {findExistServerProcess,getValueInRootConfigs,setValueInRootConfigs,UNIQUE_CHILD_PROCESS_ID, getProjectName} = require("../utils");
const log = require('../utils/log')
const find = require("find-process");

module.exports = async function(){
  try {
    if (await findExistServerProcess() != null) { //本地已经有这个进程了，不用启动了
      const wssPort = getValueInRootConfigs('ChildProcessWebsocketPort')
      const httpPort = getValueInRootConfigs('ChildProcessServerPort')
      log.alert(`💡💡💡💡💡💡 WPM websocket调试端口为 ${wssPort}，如需要，请在调试面板输入 💡💡💡💡💡💡`)
      log.alert(`💡💡💡💡💡💡 WPM http 端口为 ${httpPort}`)
      registerCleaner()
    } else {
      registerCleaner()
      const child = fork(path.resolve(__dirname, '../workers/server.js'), [`--key ${UNIQUE_CHILD_PROCESS_ID}`], {
        detached: true,//准备子进程独立于其父进程运行, 设为false，则父进程结束，子进程也销毁
      })
      child.unref() //解绑子进程，让父进程不用等待子进程
      log.info(`The collector plugin running child_process_id is ${child.pid}`)
      const list = await find('pid', child.pid)
      list[0].name = UNIQUE_CHILD_PROCESS_ID
    }
    process.on('beforeExit',()=>{

    })
  }catch (e) {
    console.log('e')
  }
}


function registerCleaner(){
  const cleanerProcess = fork(path.resolve(__dirname, '../workers/cleaner.js'), {
    detached: true,//准备子进程独立于其父进程运行, 设为false，则父进程结束，子进程也销毁
  })
  cleanerProcess.unref() //解绑子进程，让父进程不用等待子进程
  process.on('exit',()=>{
    cleanerProcess.send({'type':'close',pkgName:getProjectName()})
  })
}
