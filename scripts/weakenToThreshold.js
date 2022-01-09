/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  let securityLevel = ns.getServerSecurityLevel(target);
  let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
  let requiredSecurityDecrease = securityLevel - securityThresh;

  let weakenThreads2 = 1;
  let weakenSecurityDecrease2 = ns.weakenAnalyze(weakenThreads2);
  while (weakenSecurityDecrease2 < requiredSecurityDecrease) {
    weakenThreads2 += 1;
    weakenSecurityDecrease2 = ns.weakenAnalyze(weakenThreads2);
  }

  ns.tprint("Weaken Threads:" + weakenThreads2);
  ns.tprint("Current Security Level:" + securityLevel);
  ns.tprint("Wanted Security Level:" + securityThresh);

  ns.exec("scripts/superWeaken.js", "home", weakenThreads2, target);
}
