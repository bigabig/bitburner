import { superScan } from "scripts/superScan";

/** @param {import(".").NS } ns */
export async function main(ns) {
  // find all servers
  const allServers = superScan(ns);

  // find hackable servers
  const hackableServers = allServers.filter((server) => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());

  // find servers with money
  const cashServers = hackableServers.filter((server) => ns.getServerMaxMoney(server) > 0 && ns.getServerGrowth(server) > 0);

  for (let i = 0; i < cashServers.length; i++) {
    let target = cashServers[i];
    let server = ns.getServer(target);
    server.hackDifficulty = server.minDifficulty;

    ns.tprint(
      "Server: " +
        target +
        " Money: " +
        ns.nFormat(ns.getServerMaxMoney(target), "(0.00 a)") +
        " Growth Rate:" +
        ns.getServerGrowth(target) +
        " Min Security: " +
        ns.getServerMinSecurityLevel(target) +
        " Hack Chance: " +
        ns.formulas.hacking.hackChance(server, ns.getPlayer())
    );
    ns.tprint(Math.ceil((ns.getServerMoneyAvailable(target) * ns.getServerGrowth(target)) / ns.getServerMinSecurityLevel(target)));
    await ns.sleep(100);
  }
}
