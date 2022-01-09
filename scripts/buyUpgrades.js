/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("sleep");

  const purchase = function (node, item, qty) {
    if (item == "New Node") {
      ns.hacknet.purchaseNode();
      ns.print("Purchasing New Node");
    }
    if (item == "LVL") {
      ns.hacknet.upgradeLevel(node, qty);
      ns.print("Purchasing LVL Upgrade for Node: " + node);
    }
    if (item == "RAM") {
      ns.hacknet.upgradeRam(node, qty);
      ns.print("Purchasing RAM Upgrade for Node: " + node);
    }
    if (item == "CPU") {
      ns.hacknet.upgradeCore(node, qty);
      ns.print("Purchasing CPU Upgrade for Node: " + node);
    }
  };

  const myMoney = function () {
    return ns.getServerMoneyAvailable("home");
  };

  const check_cheapest = async function () {
    let new_node_cost = ns.hacknet.getPurchaseNodeCost();
    let node = "Default";
    let item = "New Node";
    let qty = 1;
    let cheapest = new_node_cost;
    let node_qty = ns.hacknet.numNodes();

    for (let i = 0; i < node_qty; i++) {
      let node_lvl = ns.hacknet.getLevelUpgradeCost(i, 1);
      let node_ram = ns.hacknet.getRamUpgradeCost(i, 1);
      let node_cpu = ns.hacknet.getCoreUpgradeCost(i, 1);

      if (node_lvl < cheapest) {
        cheapest = node_lvl;
        node = i;
        item = "LVL";
      }
      if (node_ram < cheapest) {
        cheapest = node_ram;
        node = i;
        item = "RAM";
      }
      if (node_cpu < cheapest) {
        cheapest = node_cpu;
        node = i;
        item = "CPU";
      }
    }

    ns.print("");
    ns.print("Cheapest Hacknet Upgrade Available;");
    ns.print("Node             : " + node);
    ns.print("Item             : " + item);
    ns.print("Qty              : " + qty);
    ns.print("");
    ns.print("Current Balance  : $" + myMoney());
    ns.print("Upgrade Cost     : $" + cheapest);
    ns.print("");

    while (myMoney() < cheapest) {
      ns.print("Waiting for funds to increase");
      await ns.sleep(100);
    }

    purchase(node, item, qty);
  };

  while (true) {
    await check_cheapest();
  }
}
