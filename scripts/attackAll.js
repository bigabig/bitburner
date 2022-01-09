import { superScan } from "scripts/superScan";
import { attack } from "scripts/attack";

/** @param {import(".").NS } ns */
export async function main(ns) {
  await attackAll(ns);
}

/** @param {import(".").NS } ns */
export async function attackAll(ns) {
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

  // try to hack servers
  let hackedServers = [];
  for (let i = 0; i < hackableServers.length; i++) {
    let target = hackableServers[i];
    if (attack(ns, target)) {
      hackedServers.push(target);
    }
  }
  ns.tprint("hacked servers:");
  ns.tprint(hackedServers);

  return hackedServers;
}
