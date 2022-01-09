import { superScan } from "scripts/superScan";
import { attack } from "scripts/attack";

/** @param {import(".").NS } ns */
export async function main(ns) {
  // find all servers
  const allServers = superScan(ns);
  ns.tprint("All Servers:");
  ns.tprint(allServers);
  await ns.sleep(1000);

  // find hackable servers
  const hackableServers = allServers.filter((server) => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel());
  ns.tprint("Hackable servers:");
  ns.tprint(hackableServers);
  await ns.sleep(1000);

  let hackedServers = [];
  for (let i = 0; i < hackableServers.length; i++) {
    let target = hackableServers[i];
    if (attack(ns, target)) {
      hackedServers.push(target);
    }
  }

  for (let i = 0; i < hackedServers.length; i++) {
    let target = hackedServers[i];
    ns.tprint("Server: " + target + " Growth: + " + ns.getServerGrowth(target) + " Max Money:" + ns.nFormat(ns.getServerMaxMoney(target), "(0.00 a)"));
  }
}
