/** @param {import(".").NS } ns */
export function attack(ns, target) {
  let requiredOpenPorts = ns.getServerNumPortsRequired(target);
  let openPorts = 0;

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    openPorts += 1;
  }

  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    openPorts += 1;
  }

  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    openPorts += 1;
  }

  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    openPorts += 1;
  }

  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    openPorts += 1;
  }

  if (requiredOpenPorts <= openPorts) {
    if (!ns.hasRootAccess(target)) {
      ns.nuke(target);
    }
    return true;
  } else {
    ns.tprint(
      `Cannot gain root access to ${target}. Required Ports: ${requiredOpenPorts} vs. Open Ports: ${openPorts}`
    );
    return false;
  }
}
