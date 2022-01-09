import { superScan } from "scripts/superScan";

/** @param {import(".").NS } ns */
export async function main(ns) {
  // find all servers
  const allServers = superScan(ns);

  const waysToSum = function (data) {
    let ways = [];
    ways[0] = 1;

    for (let a = 1; a <= data; a++) {
      ways[a] = 0;
    }

    for (let i = 1; i <= data - 1; i++) {
      for (let j = i; j <= data; j++) {
        ways[j] += ways[j - i];
      }
    }

    return ways[data];
  };

  const sanitizeParanthesis = function (input) {
    let solutions = new Set();

    const isValid = function (str) {
      var nestLevel = 0;
      for (let character of str) {
        if (character == "(") {
          nestLevel++;
        } else if (character == ")") {
          nestLevel--;
        }
        if (nestLevel < 0) {
          return false;
        }
      }

      if (nestLevel == 0) {
        solutions.add(str);
      }
      return nestLevel == 0;
    };

    const removeCharacters = function (text, targetDepth, currentDepth = 0) {
      if (targetDepth == currentDepth) {
        isValid(text);
      } else if (currentDepth < targetDepth) {
        for (let i = 0; i < text.length; i++) {
          if (text[i] == "(" || text[i] == ")") {
            let newText = text.slice(0, i) + text.slice(i + 1, text.length);
            removeCharacters(newText, targetDepth, currentDepth + 1);
          }
        }
      }
    };

    let depth = 1;
    while (solutions.size == 0 && depth < input.length) {
      removeCharacters(input, depth);
      depth += 1;
    }
    return Array.from(solutions);
  };

  const solveTotalWaysToSum = function (input) {
    let ways = [];
    ways[0] = [];
    ways[1] = new Set(["1"]);
    ways[2] = new Set(["1+1"]);
    ways[3] = new Set(["2+1", "1+1+1"]);

    for (let number = 4; number <= input; number++) {
      ways[number] = new Set();
      for (let i = 1; i < number; i++) {
        let j = number - i;

        let combination = [i, j];
        combination.sort((a, b) => b - a);
        ways[number].add(combination.join("+"));

        ways[j].forEach((value) => {
          let temp2 = value.split("+");
          temp2.push(i);
          temp2.sort((a, b) => b - a);
          ways[number].add(temp2.join("+"));
        });

        ways[i].forEach((value) => {
          let temp2 = value.split("+");
          temp2.push(j);
          temp2.sort((a, b) => b - a);
          ways[number].add(temp2.join("+"));
        });
      }
      ns.tprint(number);
    }

    let result = ways.map((way) => Array.from(way).sort());
    return result;
  };

  const arrayJumping = function (data) {
    let solution = 0;

    const jump = function (data) {
      if (data.length == 1) {
        solution = 1;
      }
      let numJumps = data[0];
      if (numJumps > 0) {
        for (let i = 1; i <= numJumps; i++) {
          if (i < data.length) {
            jump(data.slice(i));
          }
        }
      }
    };

    jump(data);
    return solution;
  };

  const minimumPathSumTriangle = function (data) {
    let solutions = [];
    const path = function (data, maximumDepth, currentDepth, currentPosition, value) {
      if (currentDepth == maximumDepth) {
        solutions.push(value);
      } else if (currentDepth < maximumDepth) {
        path(data, maximumDepth, currentDepth + 1, currentPosition, value + data[currentDepth][currentPosition]);
        path(data, maximumDepth, currentDepth + 1, currentPosition + 1, value + data[currentDepth][currentPosition]);
      }
    };

    path(data, data.length, 0, 0, 0);
    return Math.min(...solutions);
  };

  const uniquePaths = function (input) {
    let solutions = [];

    const path = function (currentX, currentY, goalX, goalY, currentPath) {
      if (currentX == goalX && currentY == goalY) {
        solutions.push(currentPath);
      } else if (currentX <= goalX && currentY <= goalY) {
        let newPath = Array.from(currentPath);
        newPath.push([currentX + 1, currentY]);
        path(currentX + 1, currentY, goalX, goalY, newPath);

        let newPath2 = Array.from(currentPath);
        newPath2.push([currentX, currentY + 1]);
        path(currentX, currentY + 1, goalX, goalY, newPath2);
      }
    };

    path(0, 0, input[0] - 1, input[1] - 1, [[0, 0]]);

    let result = solutions.map((x) => {
      let temp = x.map((y) => y[0] + "," + y[1]);
      return temp.join("->");
    });

    return Array.from(new Set(result)).length;
  };

  const mergeOverlappingIntervals = function (inputData) {
    const checkOverlap = function (interval1, interval2) {
      return Math.max(interval1[0], interval2[0]) <= Math.min(interval1[1], interval2[1]);
    };

    const mergeIntervals = function (interval1, interval2) {
      return [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])];
    };

    const superFunction = function (data) {
      let hasMerged = false;
      let newList = Array.from(data);
      for (let i = 0; i < data.length; i++) {
        let interval1 = data[i];
        for (let j = 0; j < data.length; j++) {
          if (i == j) {
            continue;
          }
          let interval2 = data[j];
          if (checkOverlap(interval1, interval2)) {
            let mergedInterval = mergeIntervals(interval1, interval2);
            newList.splice(i, 1, mergedInterval);
            newList.splice(j, 1);
            hasMerged = true;
            break;
          }
        }
        if (hasMerged) {
          break;
        }
      }
      if (hasMerged) {
        return superFunction(newList);
      } else {
        return newList;
      }
    };

    return superFunction(inputData).sort((a, b) => a[0] - b[0]);
  };

  const spiralizeMatrix = function (data) {
    let solution = [];
    let height = data.length;
    let width = data[0].length;
    let steps = height * width;

    let currentStep = 0;
    let moveDir = 0;

    // [minX, minY, maxX, maxY]
    let minX = 0;
    let maxX = width - 1;
    let minY = 0;
    let maxY = height - 1;

    while (currentStep < steps) {
      // right
      if (moveDir == 0) {
        for (let i = minX; i <= maxX; i++) {
          solution.push(data[minY][i]);
          currentStep++;
        }
        minY += 1;
        moveDir = 1;

        // down
      } else if (moveDir == 1) {
        for (let i = minY; i <= maxY; i++) {
          solution.push(data[i][maxX]);
          currentStep++;
        }
        maxX -= 1;
        moveDir = 2;

        // left
      } else if (moveDir == 2) {
        for (let i = maxX; i >= minX; i--) {
          solution.push(data[maxY][i]);
          currentStep++;
        }
        maxY -= 1;
        moveDir = 3;

        // up
      } else if (moveDir == 3) {
        for (let i = maxY; i >= minY; i--) {
          solution.push(data[i][minX]);
          currentStep++;
        }
        minX += 1;
        moveDir = 0;
      }
    }
    return solution;
  };

  const generateIPAddresses = function (data) {
    let solutions = [];

    const isValidIP = function (text) {
      let groups = text.split(".");
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group.startsWith("0")) {
          return false;
        }
      }

      groups = groups.map((group) => parseInt(group));
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group > 255) {
          return false;
        }
      }

      return true;
    };

    for (let a = 1; a < data.length - 3; a++) {
      for (let b = a + 1; b < data.length - 2; b++) {
        for (let c = b + 1; c < data.length - 1; c++) {
          let ip = data.slice(0, a) + "." + data.slice(a, b) + "." + data.slice(b, c) + "." + data.slice(c, data.length);
          if (isValidIP(ip)) {
            solutions.push(ip);
          }
        }
      }
    }

    return solutions;
  };

  const findAllValidMathExpressions = function (data) {
    let inputNumbers = data[0];
    let target = data[1];
  };

  // go through all servers
  for (let i = 0; i < allServers.length; i++) {
    let server = allServers[i];
    let files = ns.ls(server);

    // find all files that end with .cct (for coding contract)
    files = files.filter((file) => file.endsWith(".cct"));
    for (let j = 0; j < files.length; j++) {
      ns.tprint("Server: " + server + " Contract: " + files[j] + " Type: " + ns.codingcontract.getContractType(files[j], server));

      let contractType = ns.codingcontract.getContractType(files[j], server);
      if (contractType == "Total Ways to Sum") {
        let solution = waysToSum(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Total Ways to Sum Contract: ${files[j]}`);
        }
      } else if (contractType == "Sanitize Parentheses in Expression") {
        let solution = sanitizeParanthesis(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Sanitize Parentheses in Expression Contract: ${files[j]}`);
        }
      } else if (contractType == "Array Jumping Game") {
        let solution = arrayJumping(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Array Jumping Game Contract: ${files[j]}`);
        }
      } else if (contractType == "Minimum Path Sum in a Triangle") {
        let solution = minimumPathSumTriangle(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Minimum Path Sum in a Triangle Contract: ${files[j]}`);
        }
      } else if (contractType == "Merge Overlapping Intervals") {
        let solution = mergeOverlappingIntervals(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Merge Overlapping Intervals Contract: ${files[j]}`);
        }
      } else if (contractType == "Unique Paths in a Grid I") {
        let solution = uniquePaths(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Unique Paths in a Grid I Contract: ${files[j]}`);
        }
      } else if (contractType == "Spiralize Matrix") {
        let solution = spiralizeMatrix(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Spiralize Matrix Contract: ${files[j]}`);
        }
      } else if (contractType == "Generate IP Addresses") {
        let solution = generateIPAddresses(ns.codingcontract.getData(files[j], server));
        let success = ns.codingcontract.attempt(solution, files[j], server);
        if (success) {
          ns.tprint(`Solved Generate IP Addresses Contract: ${files[j]}`);
        }
      }
    }
  }
}
