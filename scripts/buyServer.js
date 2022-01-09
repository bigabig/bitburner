/** @param {import(".").NS } ns */
export async function main(ns) {
  let name = ns.args[0];

  let money = ns.getServerMoneyAvailable("home");
  let ram = 1;
  while (ns.getPurchasedServerCost(Math.pow(2, ram + 1)) < money) {
    ram += 1;
  }

  let answer = await ns.prompt(`Purchase Server with ${Math.pow(2, ram)} RAM for ${ns.nFormat(ns.getPurchasedServerCost(Math.pow(2, ram)), "(0.00 a)")}?`);
  if (answer) {
    ns.purchaseServer(name, Math.pow(2, ram));
  }
}
