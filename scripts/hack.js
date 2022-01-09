/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.enableLog("weaken");
  ns.enableLog("hack");
  ns.enableLog("grow");

  let target = ns.args[0];

  while (true) {
    // let allServers = ns.scan("home")
    // let goodServers = allServers.filter(server => ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel())

    // let serverMPS = goodServers.map(servername => (ns.getServerMoneyAvailable(servername) * ns.hackAnalyze(servername) * ns.hackAnalyzeChance(servername)) / (ns.getHackTime(servername) / 1000));
    // let bestServer = goodServers[serverMPS.indexOf(Math.max(...serverMPS))]
    // ns.print("Best server is " + bestServer + ". Expected MPS: " + Math.max(...serverMPS))

    // Defines the "target server", which is the server
    // that we're going to hack. In this case, it's "n00dles"
    // var target = bestServer;
    // ns.print(goodServers)
    // var target = goodServers[Math.floor(Math.random() * goodServers.length)];
    // ns.print("Hacking server: " + target)

    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    // Infinite loop that continously hacks/grows/weakens the target server
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}
