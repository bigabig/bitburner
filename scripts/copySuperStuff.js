/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];
  let files = [
    "/scripts/superGrow.js",
    "/scripts/superMoney.js",
    "/scripts/superWeaken.js",
    "/scripts/superManager.js",
    "/scripts/testStuff.js",
    "/scripts/prepareServer.js",
  ];

  await ns.scp(files, ns.getHostname(), target);
}
