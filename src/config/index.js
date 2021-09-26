const { name } = require("../../package.json");
const CONFIG = {
  serverAddress: "http://localhost:3000",
  useTokenAuthentication: true,
  projectName: name,
};
CONFIG.serverAddress = 'https://139.9.219.136:3000'; // 服务器
export default CONFIG;
