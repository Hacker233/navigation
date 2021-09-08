const { name } = require("../../package.json");
const CONFIG = {
  serverAddress: "http://localhost:3000",
  useTokenAuthentication: true,
  projectName: name,
};
export default CONFIG;
