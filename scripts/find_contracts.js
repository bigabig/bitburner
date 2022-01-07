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

    ns.tprint("Depth: " + depth);

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

  const mergeOverlappingIntervals = function (data) {
    const checkOverlap = function (interval1, interval2) {
      return Math.max(interval1[0], interval2[0]) <= Math.min(interval1[1], interval2[1]);
    };

    const mergeIntervals = function (interval1, interval2) {
      return [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])];
    };

    let sortedData = data.sort((a, b) => b[0] - a[0]);
    let intervals = [sortedData[0]];
    for (let i = 1; i < sortedData.length; i++) {
      let interval1 = sortedData[i];

      let hasOverlap = false;
      for (let j = 0; j < intervals.length; j++) {
        let interval2 = intervals[j];

        if (checkOverlap(interval1, interval2)) {
          let newInterval = mergeIntervals(interval1, interval2);
          intervals[j] = newInterval;
          hasOverlap = true;
        }
      }

      if (!hasOverlap) {
        intervals.push(interval1);
      }
    }

    ns.tprint(intervals);
  };

  mergeOverlappingIntervals([
    [7, 13],
    [8, 9],
    [5, 6],
    [21, 29],
    [20, 24],
    [2, 12],
    [20, 26],
    [17, 21],
    [19, 22],
    [16, 22],
    [11, 13],
    [24, 30],
    [7, 12],
    [2, 6],
    [21, 30],
    [3, 7],
    [24, 28],
    [1, 4],
  ]);

  /*
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
      }
    }
  }
  */
}
