const { name } = require("../../package.json");
const CONFIG = {
  serverAddress: "http://localhost:3000",
  useTokenAuthentication: true,
  projectName: name,
};
// CONFIG.serverAddress = 'https://smallpig.site'; // 服务器 
export default CONFIG;
