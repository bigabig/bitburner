import { printHelloWorld } from "scripts/superScan";
import { superScan } from "scripts/superScan";
import { attack } from "scripts/attack";

/** @param {import(".").NS } ns */
export async function main(ns) {
  const hackTarget = ns.args[0];

  printHelloWorld(ns);

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
  await ns.sleep(1000);

  // copy script to all hacked servers
  // then execute script on all hacked servers
  const scriptName = "hack.js";
  for (let i = 0; i < hackedServers.length; i++) {
    let target = hackedServers[i];
    await ns.scp(scriptName, "home", target);
    await ns.sleep(500);
    if (ns.getServerMaxRam(target) - ns.getServerUsedRam(target) - ns.getScriptRam(scriptName) > 0) {
      ns.tprint("Executing " + scriptName + " on " + target);
      let numThreads = Math.floor((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) / ns.getScriptRam(scriptName));
      ns.exec(scriptName, target, numThreads, hackTarget);
    } else {
      ns.tprint("Not enough RAM on " + target + " to run " + scriptName);
    }
  }
}
