/** @param {import(".").NS } ns */
export function superScan(ns) {
  let foundServers = [];

  const recursiveScan = function (startPoint) {
    foundServers.push(startPoint);

    let targets = ns.scan(startPoint);
    let filteredTargets = targets.filter((tar) => foundServers.indexOf(tar) == -1);

    for (let i = 0; i < filteredTargets.length; i++) {
      recursiveScan(filteredTargets[i]);
    }
  };

  recursiveScan("home");

  return foundServers;
}
