/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  // ns.tprint("Max Money: " + ns.getServerMaxMoney(target))

  // let moneyBefore = ns.getServerMoneyAvailable(target)
  // ns.tprint("Money Before: " + moneyBefore)

  // ns.tprint("Hacking...")
  let amount = await ns.hack(target);
  ns.tprint("Finished Hacking (" + ns.nFormat(amount, "(0.00 a)") + ")");

  // let moneyAfter = ns.getServerMoneyAvailable(target)
  // ns.tprint("Money After: " + moneyAfter)
  // ns.tprint("Money Difference: " + (moneyBefore - moneyAfter))
}
