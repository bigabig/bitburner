/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  let growthPercentage = (ns.getServerMoneyAvailable(target) + 750000) / ns.getServerMoneyAvailable(target);
  let growThreads = Math.ceil(ns.growthAnalyze(target, growthPercentage));
  let growSecurityIncrease = ns.growthAnalyzeSecurity(growThreads);

  let weakenThreads1 = 1;
  let weakenSecurityDecrease1 = ns.weakenAnalyze(weakenThreads1);
  while (weakenSecurityDecrease1 < growSecurityIncrease) {
    weakenThreads1 += 1;
    weakenSecurityDecrease1 = ns.weakenAnalyze(weakenThreads1);
  }

  let hackThreads = Math.floor(ns.hackAnalyzeThreads(target, 750000));
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

  // 2. finish
  // Weaken Time: 30
  ns.exec("scripts/superWeaken.js", "home", weakenThreads1, target);

  let sleep0 = 2000;
  await ns.sleep(sleep0);

  // 4.finish
  // Weaken Time: 30
  ns.exec("scripts/superWeaken.js", "home", weakenThreads2, target);

  let sleep1 = weakenTime - growTime - 1000 - sleep0;
  await ns.sleep(sleep1);

  // 1. finish
  // Grow Time: 20
  ns.exec("scripts/superGrow.js", "home", growThreads, target);

  let sleep2 = weakenTime - hackTime + 1000 - sleep1 - sleep0;
  await ns.sleep(sleep2);

  // 1. finish
  // Hack Time: 9
  ns.exec("scripts/superMoney.js", "home", hackThreads, target);
}
