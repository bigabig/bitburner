/** @param {import(".").NS } ns */
export async function main(ns) {
  let target = ns.args[0];

  // ns.tprint("Weaken...")
  await ns.weaken(target);
  ns.tprint("Finished Weaken (" + (ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) + ")");

  //ns.tprint("Security Level After: " + ns.getServerSecurityLevel(target))
}
