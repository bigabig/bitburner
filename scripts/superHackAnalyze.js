/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  let growthPercentage = (ns.getServerMoneyAvailable(target) + 1000000) / ns.getServerMoneyAvailable(target);
  let growThreads = Math.ceil(ns.growthAnalyze(target, growthPercentage));
  let growSecurityIncrease = ns.growthAnalyzeSecurity(growThreads);

  let weakenThreads1 = 1;
  let weakenSecurityDecrease1 = ns.weakenAnalyze(weakenThreads1);
  while (weakenSecurityDecrease1 < growSecurityIncrease) {
    weakenThreads1 += 1;
    weakenSecurityDecrease1 = ns.weakenAnalyze(weakenThreads1);
  }

  let hackThreads = Math.floor(ns.hackAnalyzeThreads(target, 1000000));
  let hackSecurityIncrease = ns.hackAnalyzeSecurity(hackThreads);

  let weakenThreads2 = 1;
  let weakenSecurityDecrease2 = ns.weakenAnalyze(weakenThreads2);
  while (weakenSecurityDecrease2 < hackSecurityIncrease) {
    weakenThreads2 += 1;
    weakenSecurityDecrease2 = ns.weakenAnalyze(weakenThreads2);
  }

  let growTime = ns.getGrowTime(target);
  let hackTime = ns.getHackTime(target);
  let weakenTime = ns.getWeakenTime(target);

  ns.tprint("Grow Time: " + Math.ceil(growTime / 1000) + "s");
  ns.tprint("Grow Threads: " + growThreads);
  ns.tprint("Grow SecurityIncrease: " + growSecurityIncrease);

  ns.tprint("Weaken 1 Time: " + Math.ceil(weakenTime / 1000) + "s");
  ns.tprint("Weaken 1 SecurityDecrease: " + weakenSecurityDecrease1);
  ns.tprint("Weaken 1 Threads: " + weakenThreads1);

  ns.tprint("Hack Time: " + Math.ceil(hackTime / 1000) + "s");
  ns.tprint("Hack Chance: " + ns.hackAnalyzeChance(target));
  ns.tprint("Hack SecurityIncrease: " + hackSecurityIncrease);
  ns.tprint("Hack Threads: " + hackThreads);

  ns.tprint("Weaken 2 Time: " + Math.ceil(weakenTime / 1000) + "s");
  ns.tprint("Weaken 2 SecurityDecrease: " + weakenSecurityDecrease2);
  ns.tprint("Weaken 2 Threads: " + weakenThreads2);
}
