/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  // ns.tprint("Max Money: " + ns.getServerMaxMoney(target))

  //let moneyBefore = ns.getServerMoneyAvailable(target)
  //ns.tprint("Money Before: " + moneyBefore)

  // ns.tprint("Growing...")
  await ns.grow(target);
  ns.tprint("Finished Growing  (" + Math.floor(100 * (ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target))) + "%)");

  //	let moneyAfter = ns.getServerMoneyAvailable(target)
  //	ns.tprint("Money After: " + moneyAfter)
  //	ns.tprint("Money Difference: " + (moneyAfter - moneyBefore))
}
