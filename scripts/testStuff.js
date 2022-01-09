/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];
  const DEBUG = false;

  let growTime = ns.getGrowTime(target);
  let weakenTime = ns.getWeakenTime(target);
  let hackTime = ns.getHackTime(target);

  DEBUG && ns.tprint(growTime);
  DEBUG && ns.tprint(weakenTime);
  DEBUG && ns.tprint(hackTime);

  // grow to max money
  let growThreads = Math.ceil(ns.growthAnalyze(target, 2.5));
  // let growThreads = Math.ceil(ns.growthAnalyze(target, ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target)));
  DEBUG && ns.tprint(growThreads);
  let growSecurityIncrease = ns.growthAnalyzeSecurity(growThreads);

  // weaken to min security level
  const weakenAmount = 0.05; // documentation states 1 weaken equals to a security decrease of 0.05
  let serverSecurity = ns.getServerSecurityLevel(target) + growSecurityIncrease;
  let serverMinSecurity = ns.getServerMinSecurityLevel(target);
  let weakenThreads = Math.ceil((serverSecurity - serverMinSecurity) / weakenAmount);
  DEBUG && ns.tprint(weakenThreads);

  // hack 50% of money
  let hackThreads = Math.max(1, Math.floor(0.5 / ns.hackAnalyze(target)));
  DEBUG && ns.tprint(hackThreads);
  let hackSecurityIncrease = ns.hackAnalyzeSecurity(hackThreads);

  // weaken to min security level
  let weakenThreads2 = Math.ceil(hackSecurityIncrease / weakenAmount);
  DEBUG && ns.tprint(weakenThreads2);

  let availableRam = ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname());
  let neededRAM =
    (weakenThreads + weakenThreads2) * ns.getScriptRam("scripts/superWeaken.js") +
    growThreads * ns.getScriptRam("scripts/superGrow.js") +
    hackThreads * ns.getScriptRam("scripts/superMoney.js");

  if (availableRam >= neededRAM) {
    let sleep = 0;
    ns.exec("scripts/superWeaken.js", ns.getHostname(), weakenThreads2, target);

    await ns.sleep(200);
    sleep += 200;
    ns.exec("scripts/superWeaken.js", ns.getHostname(), weakenThreads, target);

    await ns.sleep(weakenTime - growTime + 100 - sleep);
    sleep += weakenTime - growTime + 100 - sleep;
    ns.exec("scripts/superGrow.js", ns.getHostname(), growThreads, target);

    await ns.sleep(weakenTime - hackTime - 100 - sleep);
    ns.exec("scripts/superMoney.js", ns.getHostname(), hackThreads, target);
  } else {
    ns.tprint("Not enough RAM to execute batch!");
  }
}
