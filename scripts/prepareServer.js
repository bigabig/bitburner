/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];
  const weakenAmount = 0.05; // documentation states 1 weaken equals to a security decrease of 0.05
  const DEBUG = false;

  let growTime = ns.getGrowTime(target);
  let weakenTime = ns.getWeakenTime(target);

  DEBUG && ns.tprint(growTime);
  DEBUG && ns.tprint(weakenTime);

  // grow to max money
  let growThreads = Math.max(1, Math.ceil(ns.growthAnalyze(target, ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target))));
  DEBUG && ns.tprint(growThreads);
  let growSecurityIncrease = ns.growthAnalyzeSecurity(growThreads);

  // weaken to min security level
  let serverSecurity = ns.getServerSecurityLevel(target) + growSecurityIncrease;
  let serverMinSecurity = ns.getServerMinSecurityLevel(target);
  let weakenThreads = Math.max(1, Math.ceil((serverSecurity - serverMinSecurity) / weakenAmount));
  DEBUG && ns.tprint(weakenThreads);

  let availableRam = ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname());
  let neededRAM = weakenThreads * ns.getScriptRam("scripts/superWeaken.js") + growThreads * ns.getScriptRam("scripts/superGrow.js");

  if (availableRam >= neededRAM) {
    ns.exec("scripts/superWeaken.js", ns.getHostname(), weakenThreads, target);
    await ns.sleep(weakenTime - growTime - 100);
    ns.exec("scripts/superGrow.js", ns.getHostname(), growThreads, target);
  } else {
    ns.tprint("NOT ENOUGH RAM");
  }
}
