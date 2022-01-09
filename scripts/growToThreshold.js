/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  let moneyThreshold = ns.getServerMaxMoney(target) * 0.75;
  let currentMoney = ns.getServerMoneyAvailable(target);

  if (currentMoney > moneyThreshold) {
    ns.tprint("Nothing to do! Current money is " + ns.nFormat(currentMoney, "(0.00 a)") + " and threshold is " + ns.nFormat(moneyThreshold, "(0.00 a)"));
  } else {
    while (currentMoney < moneyThreshold) {
      let growthPercentage = moneyThreshold / ns.getServerMoneyAvailable(target);
      let growThreads = Math.ceil(ns.growthAnalyze(target, growthPercentage));
      let maxThreads = Math.floor(
        (ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) / ns.getScriptRam("/scripts/superGrow.js", ns.getHostname())
      );
      let growTime = ns.getGrowTime(target);
      ns.tprint("Grow Threads:" + growThreads);
      ns.tprint("Grow Threads:" + maxThreads);
      ns.tprint("Use Threads:" + Math.min(maxThreads, growThreads));
      ns.tprint("Grow Time:" + Math.ceil(growTime / 1000) + "s");
      ns.tprint("Current Money:" + currentMoney);
      ns.tprint("Wanted Money:" + moneyThreshold);

      ns.exec("/scripts/superGrow.js", ns.getHostname(), Math.min(maxThreads, growThreads), target);
      await ns.sleep(growTime + 100);

      moneyThreshold = ns.getServerMaxMoney(target) * 0.75;
      currentMoney = ns.getServerMoneyAvailable(target);
    }
    ns.tprint("Finished Growing :D Money is " + ns.nFormat(ns.getServerMoneyAvailable(target), "(0.00 a)"));
  }
}
