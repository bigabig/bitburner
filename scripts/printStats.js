import { table } from "console";
import { superScan } from "scripts/superScan";

/** @param {import(".").NS } ns */
export async function main(ns) {
  // find all servers
  const allServers = superScan(ns);

  // find hackable servers
  const hackableServers = allServers.filter((server) => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());

  // find servers with money
  const cashServers = hackableServers.filter((server) => ns.getServerMaxMoney(server) > 0 && ns.getServerGrowth(server) > 0);

  let data = [];
  for (let i = 0; i < cashServers.length; i++) {
    let target = cashServers[i];
    let server = ns.getServer(target);
    server.hackDifficulty = server.minDifficulty;

    let money = ns.getServerMoneyAvailable(target);
    let maxMoney = ns.getServerMaxMoney(target);
    let moneyPercent = (money / maxMoney).toFixed(2);
    let security = ns.getServerSecurityLevel(target).toFixed(2);
    let securityAbove = (ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)).toFixed(2);
    let hackChance = ns.formulas.hacking.hackChance(server, ns.getPlayer()).toFixed(2);

    data.push({
      target,
      money: ns.nFormat(money, "(0.00 a)"),
      maxMoney: ns.nFormat(maxMoney, "(0.00 a)"),
      moneyPercent,
      security,
      securityAbove,
      hackChance,
    });
  }

  let keys = Object.keys(data[0]);
  let keyWidths = keys.map((key) => {
    let widths = data.map((x) => x[key].length);
    let maxWidth = Math.max(...widths, key.length);
    return [key, maxWidth];
  });

  ns.tprint(keyWidths);

  let tableHead = "";
  keyWidths.forEach((x) => {
    tableHead += x[0];
  });
}
