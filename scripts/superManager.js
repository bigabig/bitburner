/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  //while (true) {
  for (let i = 1; i <= 10; i++) {
    ns.exec("scripts/testStuff.js", ns.getHostname(), 1, target);
    await ns.sleep(400);
  }
}
