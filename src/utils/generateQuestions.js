function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

/** 2-digit subtraction that requires borrowing (ones digit of a < ones digit of b) */
function genSubtraction2Digit() {
  let a, b;
  do {
    a = randInt(30, 99);
    b = randInt(10, a - 1);
  } while (a % 10 >= b % 10);
  return { a, b, op: '-', answer: a - b };
}

/** 3-digit subtraction that requires borrowing in at least one column */
function genSubtraction3Digit() {
  let a, b;
  do {
    a = randInt(200, 999);
    b = randInt(100, a - 1);
  } while (
    a % 10 >= b % 10 &&
    Math.floor(a / 10) % 10 >= Math.floor(b / 10) % 10
  );
  return { a, b, op: '-', answer: a - b };
}

/** 2-digit addition without carrying */
function genAdditionSimple() {
  let a, b;
  do {
    a = randInt(10, 49);
    b = randInt(10, 49);
  } while (
    (a % 10) + (b % 10) >= 10 ||
    Math.floor(a / 10) + Math.floor(b / 10) >= 10
  );
  return { a, b, op: '+', answer: a + b };
}

/** 2-digit addition with carrying (ones column sums to >= 10) */
function genAdditionCarrying() {
  let a, b;
  do {
    a = randInt(10, 99);
    b = randInt(10, 99);
  } while ((a % 10) + (b % 10) < 10);
  return { a, b, op: '+', answer: a + b };
}

/** Single-digit multiplication (factors 2-10) */
function genMultiplication() {
  const a = randInt(2, 10);
  const b = randInt(2, 10);
  return { a, b, op: '\u00d7', answer: a * b };
}

/** Division with whole number results */
function genDivision() {
  const divisor = randInt(2, 10);
  const quotient = randInt(2, 10);
  const dividend = divisor * quotient;
  return { a: dividend, b: divisor, op: '\u00f7', answer: quotient };
}

// ===== Word Problems =====

const NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Lucas', 'Mia', 'Ethan',
  'Sofia', 'Jack', 'Lily', 'Ben', 'Zoe', 'Sam', 'Anna', 'Leo',
  'Chloe', 'Ryan', 'Grace', 'Jake', 'Hannah', 'Max', 'Ruby', 'Tom',
  'Ella', 'James', 'Aria', 'Owen', 'Maya', 'Alex',
];
const ITEMS = [
  'apples', 'stickers', 'marbles', 'crayons', 'books', 'cookies',
  'candies', 'pencils', 'shells', 'flowers', 'beads', 'cards',
  'coins', 'ribbons', 'buttons', 'balloons', 'cupcakes', 'oranges',
  'stars', 'stamps', 'grapes', 'toys', 'cherries', 'pebbles',
];

function pickTwoNames() {
  const a = pick(NAMES);
  let b;
  do { b = pick(NAMES); } while (b === a);
  return [a, b];
}

function pickThreeNames() {
  const a = pick(NAMES);
  let b, c;
  do { b = pick(NAMES); } while (b === a);
  do { c = pick(NAMES); } while (c === a || c === b);
  return [a, b, c];
}

// --- Addition word problems ---

function wpAdditionBasic() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(5, 25);
  const b = randInt(3, 20);
  return {
    text: `${name} has ${a} ${item}. ${name} gets ${b} more. How many ${item} does ${name} have in all?`,
    answer: a + b,
  };
}

function wpAdditionCombine() {
  const [n1, n2] = pickTwoNames();
  const item = pick(ITEMS);
  const a = randInt(5, 25);
  const b = randInt(5, 25);
  return {
    text: `${n1} picked ${a} ${item} and ${n2} picked ${b} ${item}. How many ${item} did they pick altogether?`,
    answer: a + b,
  };
}

function wpAdditionThreeNumbers() {
  const [n1, n2, n3] = pickThreeNames();
  const item = pick(ITEMS);
  const a = randInt(3, 15);
  const b = randInt(3, 15);
  const c = randInt(3, 15);
  return {
    text: `${n1} has ${a} ${item}, ${n2} has ${b} ${item}, and ${n3} has ${c} ${item}. How many ${item} do they have altogether?`,
    answer: a + b + c,
  };
}

function wpAdditionMorning() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(5, 20);
  const b = randInt(3, 15);
  return {
    text: `${name} found ${a} ${item} in the morning and ${b} more in the afternoon. How many ${item} did ${name} find in total?`,
    answer: a + b,
  };
}

function wpAdditionShopping() {
  const name = pick(NAMES);
  const a = randInt(5, 30);
  const b = randInt(3, 20);
  const place1 = pick(['store', 'market', 'bakery', 'shop']);
  const place2 = pick(['store', 'market', 'bakery', 'shop']);
  const item = pick(ITEMS);
  return {
    text: `${name} bought ${a} ${item} from the ${place1} and ${b} more from the ${place2}. How many ${item} did ${name} buy in all?`,
    answer: a + b,
  };
}

function wpAdditionReadGoal() {
  const name = pick(NAMES);
  const done = randInt(5, 20);
  const more = randInt(3, 15);
  return {
    text: `${name} read ${done} pages of a book yesterday and ${more} pages today. How many pages has ${name} read so far?`,
    answer: done + more,
  };
}

// --- Subtraction word problems ---

function wpSubtractionBasic() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(15, 40);
  const b = randInt(3, a - 2);
  return {
    text: `${name} had ${a} ${item}. ${name} gave away ${b}. How many ${item} are left?`,
    answer: a - b,
  };
}

function wpSubtractionEat() {
  const name = pick(NAMES);
  const food = pick(['cookies', 'cupcakes', 'candies', 'grapes', 'cherries', 'oranges', 'apples']);
  const a = randInt(12, 30);
  const b = randInt(2, a - 3);
  return {
    text: `${name} baked ${a} ${food}. ${name}'s family ate ${b} of them. How many ${food} are left?`,
    answer: a - b,
  };
}

function wpSubtractionLost() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(15, 40);
  const b = randInt(3, a - 2);
  return {
    text: `${name} had ${a} ${item} in a box. ${b} of them fell out and got lost. How many ${item} are still in the box?`,
    answer: a - b,
  };
}

function wpSubtractionSold() {
  const a = randInt(20, 50);
  const b = randInt(5, a - 3);
  const thing = pick(['apples', 'oranges', 'cookies', 'cupcakes', 'flowers', 'books', 'toys']);
  return {
    text: `A shop had ${a} ${thing}. They sold ${b} of them. How many ${thing} are left in the shop?`,
    answer: a - b,
  };
}

function wpSubtractionUsed() {
  const name = pick(NAMES);
  const a = randInt(15, 30);
  const b = randInt(3, a - 2);
  const item = pick(['stickers', 'beads', 'buttons', 'ribbons', 'stamps']);
  return {
    text: `${name} had ${a} ${item}. ${name} used ${b} of them for an art project. How many ${item} does ${name} have now?`,
    answer: a - b,
  };
}

function wpSubtractionLibrary() {
  const total = randInt(30, 60);
  const lost = randInt(3, 15);
  return {
    text: `There were ${total} books in the library. ${lost} books were lost. How many books are left in the library?`,
    answer: total - lost,
  };
}

// --- Comparison word problems ---

function wpComparisonMore() {
  const [n1, n2] = pickTwoNames();
  const item = pick(ITEMS);
  const a = randInt(12, 35);
  const b = randInt(3, a - 2);
  return {
    text: `${n1} has ${a} ${item}. ${n2} has ${b} ${item}. How many more ${item} does ${n1} have than ${n2}?`,
    answer: a - b,
  };
}

function wpComparisonFewer() {
  const [n1, n2] = pickTwoNames();
  const item = pick(ITEMS);
  const a = randInt(12, 35);
  const b = randInt(3, a - 2);
  return {
    text: `${n1} collected ${a} ${item} and ${n2} collected ${b} ${item}. How many fewer ${item} does ${n2} have?`,
    answer: a - b,
  };
}

function wpComparisonHeightAge() {
  const [n1, n2] = pickTwoNames();
  const a = randInt(100, 150);
  const b = randInt(90, a - 2);
  return {
    text: `${n1} is ${a} cm tall. ${n2} is ${b} cm tall. What is the difference in their heights?`,
    answer: a - b,
  };
}

function wpComparisonScores() {
  const [n1, n2] = pickTwoNames();
  const game = pick(['spelling test', 'math quiz', 'reading test', 'game']);
  const a = randInt(50, 100);
  const b = randInt(30, a - 2);
  return {
    text: `${n1} scored ${a} points on the ${game}. ${n2} scored ${b} points. How many more points did ${n1} score than ${n2}?`,
    answer: a - b,
  };
}

// --- Multiplication word problems ---

function wpMultiplicationGroups() {
  const groups = randInt(2, 8);
  const perGroup = randInt(2, 9);
  const item = pick(ITEMS);
  const container = pick(['bags', 'boxes', 'baskets', 'jars', 'packs', 'trays', 'plates']);
  return {
    text: `There are ${groups} ${container} with ${perGroup} ${item} in each. How many ${item} are there in all?`,
    answer: groups * perGroup,
  };
}

function wpMultiplicationRows() {
  const rows = randInt(2, 8);
  const perRow = randInt(2, 8);
  const thing = pick(['chairs', 'desks', 'plants', 'flowers', 'cups', 'books', 'blocks']);
  return {
    text: `There are ${rows} rows with ${perRow} ${thing} in each row. How many ${thing} are there in all?`,
    answer: rows * perRow,
  };
}

function wpMultiplicationLegs() {
  const animals = randInt(2, 8);
  const legs = pick([4, 4, 4, 2, 2, 8]);
  const animalName = legs === 2 ? pick(['birds', 'chickens', 'ducks']) : legs === 8 ? 'spiders' : pick(['dogs', 'cats', 'horses', 'cows']);
  return {
    text: `There are ${animals} ${animalName} in a yard. Each ${animalName.slice(0, -1)} has ${legs} legs. How many legs are there in all?`,
    answer: animals * legs,
  };
}

function wpMultiplicationWheels() {
  const count = randInt(2, 9);
  const vehicle = pick(['bicycles', 'tricycles', 'cars']);
  const wheels = vehicle === 'bicycles' ? 2 : vehicle === 'tricycles' ? 3 : 4;
  return {
    text: `There are ${count} ${vehicle} in the parking lot. How many wheels are there in total?`,
    answer: count * wheels,
  };
}

function wpMultiplicationPacks() {
  const packs = randInt(2, 7);
  const perPack = randInt(3, 10);
  const item = pick(['stickers', 'crayons', 'pencils', 'cards', 'candies', 'stamps']);
  const name = pick(NAMES);
  return {
    text: `${name} bought ${packs} packs of ${item}. Each pack has ${perPack} ${item}. How many ${item} does ${name} have in all?`,
    answer: packs * perPack,
  };
}

function wpMultiplicationDaily() {
  const name = pick(NAMES);
  const perDay = randInt(2, 8);
  const days = randInt(3, 7);
  const activity = pick(['pages', 'math problems', 'spelling words', 'laps around the track']);
  return {
    text: `${name} practices ${perDay} ${activity} every day. How many ${activity} does ${name} practice in ${days} days?`,
    answer: perDay * days,
  };
}

// --- Division word problems ---

function wpDivisionShare() {
  const divisor = randInt(2, 8);
  const quotient = randInt(2, 8);
  const total = divisor * quotient;
  const item = pick(ITEMS);
  return {
    text: `${total} ${item} are shared equally among ${divisor} children. How many ${item} does each child get?`,
    answer: quotient,
  };
}

function wpDivisionPacking() {
  const perBox = randInt(2, 8);
  const boxes = randInt(2, 8);
  const total = perBox * boxes;
  const item = pick(['apples', 'oranges', 'cookies', 'cupcakes', 'books', 'toys', 'eggs']);
  return {
    text: `A baker puts ${perBox} ${item} in each box. There are ${total} ${item} in all. How many boxes does the baker fill?`,
    answer: boxes,
  };
}

function wpDivisionTeams() {
  const teamSize = randInt(2, 6);
  const teams = randInt(2, 8);
  const total = teamSize * teams;
  return {
    text: `${total} students need to be divided into teams of ${teamSize}. How many teams will there be?`,
    answer: teams,
  };
}

function wpDivisionCost() {
  const price = randInt(2, 9);
  const count = randInt(2, 8);
  const total = price * count;
  const item = pick(['notebooks', 'pens', 'erasers', 'rulers', 'folders']);
  return {
    text: `${count} identical ${item} cost ₱${total} in total. How much does one ${item.slice(0, -1)} cost?`,
    answer: price,
    answerText: `₱${price}`,
  };
}

function wpDivisionPlates() {
  const perPlate = randInt(2, 6);
  const plates = randInt(2, 8);
  const total = perPlate * plates;
  const food = pick(['cookies', 'cupcakes', 'sandwiches', 'slices of pizza', 'fruit pieces']);
  return {
    text: `Mom puts ${total} ${food} equally onto ${plates} plates. How many ${food} are on each plate?`,
    answer: perPlate,
  };
}

// --- Two-step word problems ---

function wpTwoStepAddSub() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(10, 25);
  const b = randInt(3, 12);
  const c = randInt(2, Math.min(a + b - 1, 15));
  return {
    text: `${name} had ${a} ${item}. ${name} bought ${b} more. Then ${name} gave ${c} to a friend. How many ${item} does ${name} have now?`,
    answer: a + b - c,
  };
}

function wpTwoStepAddAdd() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const a = randInt(5, 15);
  const b = randInt(3, 10);
  const c = randInt(3, 10);
  return {
    text: `In the morning, ${name} found ${a} ${item}. In the afternoon, ${name} found ${b} more, and in the evening ${c} more. How many ${item} did ${name} find in total?`,
    answer: a + b + c,
  };
}

function wpTwoStepSubSub() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const total = randInt(25, 45);
  const b = randInt(3, 12);
  const c = randInt(3, Math.min(total - b - 1, 12));
  return {
    text: `${name} had ${total} ${item}. ${name} lost ${b} at school and gave ${c} to a friend. How many ${item} does ${name} have left?`,
    answer: total - b - c,
  };
}

function wpTwoStepMultAdd() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const packs = randInt(2, 5);
  const perPack = randInt(3, 8);
  const extra = randInt(2, 10);
  return {
    text: `${name} bought ${packs} packs of ${item} with ${perPack} in each pack, plus ${extra} loose ${item}. How many ${item} does ${name} have?`,
    answer: packs * perPack + extra,
  };
}

// --- Grouping word problems ---

function wpGroupingBasic() {
  const groupSize = randInt(2, 6);
  const numGroups = randInt(2, 8);
  const total = groupSize * numGroups;
  return {
    text: `There are ${total} students in a class. The teacher puts them into groups of ${groupSize}. How many groups are there?`,
    answer: numGroups,
  };
}

function wpGroupingSeats() {
  const perTable = randInt(2, 6);
  const tables = randInt(2, 8);
  const total = perTable * tables;
  return {
    text: `A restaurant has tables that seat ${perTable} people each. ${total} people are coming for dinner. How many tables are needed?`,
    answer: tables,
  };
}

// --- Missing number word problems ---

function wpMissingSum() {
  const total = randInt(15, 40);
  const a = randInt(3, total - 3);
  const b = total - a;
  const [n1, n2] = pickTwoNames();
  const item = pick(ITEMS);
  return {
    text: `${n1} and ${n2} have ${total} ${item} together. ${n1} has ${a}. How many does ${n2} have?`,
    answer: b,
  };
}

function wpMissingAddend() {
  const name = pick(NAMES);
  const item = pick(ITEMS);
  const total = randInt(15, 40);
  const has = randInt(5, total - 3);
  return {
    text: `${name} wants to collect ${total} ${item}. ${name} already has ${has}. How many more does ${name} need?`,
    answer: total - has,
  };
}

function wpHowManyNeeded() {
  const name = pick(NAMES);
  const goal = randInt(15, 40);
  const done = randInt(5, goal - 3);
  return {
    text: `${name} set a goal to read ${goal} books this summer. So far, ${name} has read ${done}. How many more books does ${name} need to read?`,
    answer: goal - done,
  };
}

// --- Product / factor word problems ---

function wpProductFind() {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const product = a * b;
  return {
    text: `The product of two numbers is ${product}. If one number is ${a}, what is the other number?`,
    answer: b,
  };
}

// --- Classroom word problems ---

function wpClassroom() {
  const boys = randInt(8, 20);
  const girls = randInt(8, 20);
  const total = boys + girls;
  const groupSize = pick([2, 3, 4, 5, 6]);
  const remainder = total % groupSize;
  if (remainder !== 0) {
    const adjustedTotal = total - remainder;
    const adjustedGirls = adjustedTotal - boys;
    if (adjustedGirls < 5) return wpAdditionBasic();
    return {
      text: `There are ${boys} boys and ${adjustedGirls} girls in a class. The teacher groups them so each group has ${groupSize} members. How many groups are there?`,
      answer: adjustedTotal / groupSize,
    };
  }
  return {
    text: `There are ${boys} boys and ${girls} girls in a class. The teacher groups them so each group has ${groupSize} members. How many groups are there?`,
    answer: total / groupSize,
  };
}

// --- Money word problems (₱ Philippine Peso) ---

function wpMoneyChange() {
  const name = pick(NAMES);
  const paid = pick([20, 50, 100]);
  const cost = randInt(2, Math.floor(paid / 10) - 1) * 5;
  const thing = pick(['notebook', 'toy', 'book', 'pen', 'ruler', 'eraser']);
  const change = paid - cost;
  return {
    text: `${name} buys a ${thing} that costs ₱${cost}. ${name} pays with a ₱${paid} bill. How much change does ${name} get back?`,
    answer: change,
    answerText: `₱${change}`,
  };
}

function wpMoneySavings() {
  const name = pick(NAMES);
  const saved = randInt(2, 8) * 10;
  const earned = randInt(1, 5) * 10;
  const total = saved + earned;
  return {
    text: `${name} saved ₱${saved} from allowance and earned ₱${earned} doing chores. How much money does ${name} have now?`,
    answer: total,
    answerText: `₱${total}`,
  };
}

function wpMoneySpend() {
  const name = pick(NAMES);
  const had = randInt(3, 10) * 20;
  const spent = randInt(1, Math.floor(had / 20) - 1) * 10;
  const left = had - spent;
  const thing = pick(['a snack', 'a toy', 'a book', 'school supplies', 'a gift']);
  return {
    text: `${name} had ₱${had}. ${name} spent ₱${spent} on ${thing}. How much money does ${name} have left?`,
    answer: left,
    answerText: `₱${left}`,
  };
}

// --- Time/distance word problems ---

function wpTimeTravel() {
  const name = pick(NAMES);
  const a = randInt(10, 45);
  const b = randInt(5, 30);
  return {
    text: `${name} walked for ${a} minutes to the park and ${b} minutes back home. How many minutes did ${name} walk in total?`,
    answer: a + b,
    answerText: `${a + b} minutes`,
  };
}

function wpDistanceLeft() {
  const name = pick(NAMES);
  const total = randInt(30, 80);
  const done = randInt(10, total - 5);
  const left = total - done;
  return {
    text: `${name} needs to travel ${total} km to reach grandma's house. ${name} has already traveled ${done} km. How many more km does ${name} need to travel?`,
    answer: left,
    answerText: `${left} km`,
  };
}

// --- Food / party word problems ---

function wpPartySharing() {
  const item = pick(['cupcakes', 'cookies', 'sandwiches', 'juice boxes', 'candies']);
  const kids = randInt(3, 8);
  const each = randInt(2, 6);
  return {
    text: `At a party, each of the ${kids} children gets ${each} ${item}. How many ${item} are needed in total?`,
    answer: kids * each,
  };
}

function wpLeftover() {
  const name = pick(NAMES);
  const baked = randInt(20, 40);
  const eaten = randInt(5, 15);
  const givenAway = randInt(3, Math.min(baked - eaten - 1, 12));
  const food = pick(['cookies', 'cupcakes', 'brownies', 'muffins']);
  return {
    text: `${name} baked ${baked} ${food}. The family ate ${eaten}, and ${name} gave ${givenAway} to a neighbor. How many ${food} are left?`,
    answer: baked - eaten - givenAway,
  };
}

// ===== Math Fair / District Meet Style Problems =====

// --- Time helpers ---
function toAbsMin(h12, min, period) {
  let h24 = h12 % 12;
  if (period === 'PM') h24 += 12;
  return h24 * 60 + min;
}
function absMinToTimeStr(totalMin) {
  const h24 = Math.floor(totalMin / 60) % 24;
  const min = totalMin % 60;
  const period = h24 < 12 ? 'AM' : 'PM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(min).padStart(2, '0')} ${period}`;
}

function wpMFMoreThan() {
  // "What is X more than A − B?"
  const A = randInt(20, 60);
  const B = randInt(5, Math.min(A - 5, 30));
  const X = randInt(5, 25);
  const answer = (A - B) + X;
  return {
    text: `What is ${X} more than ${A} − ${B}?`,
    answer,
    answerText: String(answer),
  };
}

function wpMFPesoShortage() {
  // Two people have amounts, item costs more — how much more needed?
  const [n1, n2] = pickTwoNames();
  const amt1 = randInt(10, 30) * 10;
  const amt2 = randInt(10, 30) * 10;
  const have = amt1 + amt2;
  const cost = have + randInt(2, 8) * 10;
  const need = cost - have;
  return {
    text: `${n1} has ₱${amt1} and ${n2} has ₱${amt2}. They want to buy a toy that costs ₱${cost}. How much more money do they need?`,
    answer: need,
    answerText: `₱${need}`,
  };
}

function wpMFPesoTotalCost() {
  // "Bought A for ₱X and B for ₱Y. Total cost?"
  const name = pick(NAMES);
  const pairs = [
    ['apple', 'orange'], ['pen', 'notebook'], ['eraser', 'ruler'],
    ['mango', 'banana'], ['bread', 'butter'], ['soap', 'shampoo'],
  ];
  const [item1, item2] = pick(pairs);
  const p1 = randInt(2, 9) * 10;
  const p2 = randInt(2, 8) * 10;
  const total = p1 + p2;
  return {
    text: `${name} bought ${item1} worth ₱${p1} and ${item2} worth ₱${p2}. How much is the total cost?`,
    answer: total,
    answerText: `₱${total}`,
  };
}

function wpMFMissingAddendEq() {
  // "N + ___ = M. What number makes this true?"
  const missing = randInt(2, 15);
  const addend = randInt(3, 15);
  const sum = missing + addend;
  return {
    text: `What number makes this true? ${addend} + ___ = ${sum}`,
    answer: missing,
    answerText: String(missing),
  };
}

function wpMFTimePlusMins() {
  // "Started at H:MM AM/PM, spent N minutes. What time did they finish?"
  const period = pick(['AM', 'PM']);
  const startH = period === 'AM' ? randInt(7, 10) : randInt(1, 4);
  const startMin = pick([0, 15, 30]);
  const duration = pick([15, 20, 25, 30, 35, 40, 45, 50, 55]);
  const name = pick(NAMES);
  const activity = pick(['studying', 'reading', 'practicing piano', 'working on homework', 'drawing']);
  const startStr = `${startH}:${String(startMin).padStart(2, '0')} ${period}`;
  const endStr = absMinToTimeStr(toAbsMin(startH, startMin, period) + duration);
  return {
    text: `${name} started ${activity} at ${startStr} and spent ${duration} minutes. What time did ${name} finish?`,
    answer: 0,
    answerText: endStr,
  };
}

function wpMFTimeHoursAndMins() {
  // "Started at H o'clock. Finished H2 hours and M minutes later. What time?"
  const period = pick(['AM', 'PM']);
  const startH = period === 'AM' ? randInt(6, 9) : randInt(1, 4);
  const addH = randInt(1, 3);
  const addMin = pick([0, 30]);
  const subject = pick(['The children', 'The class', 'The students', 'The players', 'The group']);
  const activity = pick(['dancing', 'swimming', 'playing', 'the show', 'singing practice', 'the game']);
  const endStr = absMinToTimeStr(toAbsMin(startH, 0, period) + addH * 60 + addMin);
  const minPart = addMin === 0 ? '' : ` and ${addMin} minutes`;
  return {
    text: `${subject} start ${activity} at ${startH} o'clock ${period}. They finish ${addH} hour${addH > 1 ? 's' : ''}${minPart} later. What time do they finish?`,
    answer: 0,
    answerText: endStr,
  };
}

function wpMFUnitRate() {
  // "If X items cost ₱Y, how much do Z items cost?"
  const priceEach = randInt(2, 12) * 5;
  const count1 = randInt(2, 5);
  const count2 = randInt(count1 + 1, count1 + 6);
  const total1 = count1 * priceEach;
  const fruit = pick(['oranges', 'mangoes', 'apples', 'bananas', 'eggs', 'fish balls']);
  const answer = priceEach * count2;
  return {
    text: `If ${count1} ${fruit} cost ₱${total1}, how much do ${count2} ${fruit} cost?`,
    answer,
    answerText: `₱${answer}`,
  };
}

function wpMFPlaceValue() {
  // "What is the value of digit D in number N?"
  const use3Digit = Math.random() < 0.5;
  if (use3Digit) {
    const num = randInt(102, 999);
    const digits = [Math.floor(num / 100), Math.floor((num % 100) / 10), num % 10];
    const values = [digits[0] * 100, digits[1] * 10, digits[2]];
    // Pick a non-zero digit position
    const candidates = [0, 1, 2].filter(i => digits[i] !== 0);
    const pos = pick(candidates);
    return {
      text: `What is the value of the digit ${digits[pos]} in the number ${num}?`,
      answer: values[pos],
      answerText: String(values[pos]),
    };
  } else {
    const num = randInt(12, 99);
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    const pickTens = Math.random() < 0.6 && tens !== 0;
    const digit = pickTens ? tens : ones;
    const value = pickTens ? tens * 10 : ones;
    return {
      text: `What is the value of the digit ${digit} in the number ${num}?`,
      answer: value,
      answerText: String(value),
    };
  }
}

function wpMFFraction() {
  // "1 slice of food cut into N equal parts. What fraction?"
  const denom = pick([2, 3, 4, 5, 6, 8]);
  const food = pick(['pizza', 'cake', 'pie', 'bread loaf', 'chocolate bar', 'sandwich']);
  const name = pick(NAMES);
  const verb = pick(['eats', 'takes', 'gets']);
  return {
    text: `${name} ${verb} 1 slice of a ${food} cut into ${denom} equal slices. What fraction of the ${food} did ${name} eat?`,
    answer: 0,
    answerText: `1/${denom}`,
  };
}

function wpMFCoinShortage() {
  // "Has N coins of ₱X. Item costs ₱Y. How much more needed?"
  const coinValue = pick([5, 10, 25]);
  const numCoins = randInt(2, 6);
  const have = numCoins * coinValue;
  const extra = pick([5, 10, 15, 20]);
  const cost = have + extra;
  const name = pick(NAMES);
  const item = pick(['toy', 'book', 'pen', 'snack', 'notebook', 'pencil case']);
  return {
    text: `${name} has ${numCoins} ₱${coinValue}-coins. ${name} wants to buy a ${item} worth ₱${cost}. How much more money does ${name} need?`,
    answer: extra,
    answerText: `₱${extra}`,
  };
}

function wpMFSequenceMissing() {
  // "Write the missing number: A, B, ___, D" (arithmetic sequence)
  const step = randInt(1, 5);
  const start = randInt(2, 20);
  const isDesc = Math.random() < 0.4;
  if (isDesc) {
    const s = start + step * 3;
    return {
      text: `Write the missing number: ${s}, ${s - step}, ___, ${s - step * 3}`,
      answer: s - step * 2,
      answerText: String(s - step * 2),
    };
  }
  return {
    text: `Write the missing number: ${start}, ${start + step}, ___, ${start + step * 3}`,
    answer: start + step * 2,
    answerText: String(start + step * 2),
  };
}

function wpMFSequenceNext() {
  // "What comes next? A, B, C, ___"
  const step = randInt(1, 5);
  const isDesc = Math.random() < 0.5;
  const start = isDesc ? randInt(step * 3 + 5, 50) : randInt(2, 20);
  const seq = [0, 1, 2].map(i => isDesc ? start - step * i : start + step * i);
  const next = isDesc ? start - step * 3 : start + step * 3;
  return {
    text: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ___`,
    answer: next,
    answerText: String(next),
  };
}

function wpMFTwoStepClassAbsent() {
  // "B boys + G girls. X boys + Y girls absent. How many in class?"
  const boys = randInt(15, 30);
  const girls = randInt(15, 30);
  const absentBoys = randInt(2, 8);
  const absentGirls = randInt(2, 8);
  const present = boys + girls - absentBoys - absentGirls;
  return {
    text: `In a class, there are ${boys} boys and ${girls} girls. One day, ${absentBoys} boys and ${absentGirls} girls were absent. How many learners were in the classroom that day?`,
    answer: present,
    answerText: String(present),
  };
}

function wpMFPartyTwoStep() {
  // "N people at party. M more arrived. K left. How many now?"
  const start = randInt(20, 50);
  const added = randInt(3, 15);
  const left = randInt(3, 12);
  const final = start + added - left;
  const group = pick(['children', 'students', 'girls', 'boys', 'guests']);
  return {
    text: `There were ${start} ${group} at the party. Then ${added} more ${group} arrived. Later, ${left} ${group} went home. How many ${group} were left?`,
    answer: final,
    answerText: String(final),
  };
}

function wpMFMultiSum() {
  // "What is the sum of A + B + C + D + E?"
  const n = randInt(4, 6);
  const start = randInt(10, 20);
  const nums = Array.from({ length: n }, (_, i) => start + i);
  const sum = nums.reduce((a, b) => a + b, 0);
  return {
    text: `What is the sum? ${nums.join(' + ')}`,
    answer: sum,
    answerText: String(sum),
  };
}

function wpMFHalfOfSum() {
  // "What is one-half of the sum of A and B?"
  let a = randInt(2, 14);
  let b = randInt(2, 14);
  if ((a + b) % 2 !== 0) b += 1; // ensure even sum
  const half = (a + b) / 2;
  return {
    text: `What is one-half of the sum of ${a} and ${b}?`,
    answer: half,
    answerText: String(half),
  };
}

function wpMFTakeAwayProduct() {
  // "What is left if you take away X [word]s from Z?"
  const numWords = ['', '', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const digitWords = { 2:'twos',3:'threes',4:'fours',5:'fives',6:'sixes',7:'sevens',8:'eights',9:'nines' };
  const X = randInt(2, 7);
  const Y = randInt(2, 9);
  const product = X * Y;
  const Z = product + randInt(5, 30);
  return {
    text: `What is left if you take away ${numWords[X]} ${digitWords[Y]} from ${Z}?`,
    answer: Z - product,
    answerText: String(Z - product),
  };
}

function wpMFTimeConversion() {
  // Seconds/minutes/days conversions (including half-minute variant)
  const type = randInt(0, 3);
  if (type === 0) {
    const mins = randInt(2, 6);
    return {
      text: `How many seconds are there in ${mins} minutes?`,
      answer: mins * 60,
      answerText: `${mins * 60} seconds`,
    };
  } else if (type === 1) {
    const hours = randInt(2, 5);
    return {
      text: `How many minutes are there in ${hours} hours?`,
      answer: hours * 60,
      answerText: `${hours * 60} minutes`,
    };
  } else if (type === 2) {
    const weeks = randInt(2, 4);
    return {
      text: `How many days are there in ${weeks} weeks?`,
      answer: weeks * 7,
      answerText: `${weeks * 7} days`,
    };
  } else {
    // Half-minute variant: e.g. "3 and a half minutes"
    const halfMins = randInt(2, 5);
    const totalSecs = halfMins * 60 + 30;
    return {
      text: `How many seconds are there in ${halfMins} and a half minutes?`,
      answer: totalSecs,
      answerText: `${totalSecs} seconds`,
    };
  }
}

function wpMFMissingPages() {
  // "Next to page X is page Y. How many pages are missing?"
  const X = randInt(5, 40);
  const gap = randInt(5, 20);
  const Y = X + gap + 1;
  return {
    text: `An old book has missing pages. Next to page ${X} is page ${Y}. How many pages are missing?`,
    answer: gap,
    answerText: String(gap),
  };
}

function wpMFChangeFromBill() {
  // "Has ₱N, buys item for ₱X. Change?"
  const name = pick(NAMES);
  const bill = pick([20, 50, 100, 200]);
  const cost = randInt(1, Math.floor(bill / 10) - 1) * 5;
  const change = bill - cost;
  const item = pick(['apple', 'banana', 'pen', 'eraser', 'candy', 'bread']);
  return {
    text: `${name} has ₱${bill} and buys a ${item} for ₱${cost}. How much money does ${name} have left?`,
    answer: change,
    answerText: `₱${change}`,
  };
}

function wpMFCompareSymbol() {
  // "What symbol makes this true: A ___ B? (>, <, or =)"
  const a = randInt(5, 30);
  const b = randInt(5, 30);
  const sym = a > b ? '>' : a < b ? '<' : '=';
  return {
    text: `What symbol makes this true? ${a} ___ ${b}   (use >, <, or =)`,
    answer: 0,
    answerText: sym,
  };
}

// --- Text-only geometry word problems (no diagram, goes in word problem section) ---

function wpGeoRectPerim() {
  const l = randInt(4, 20);
  const w = randInt(2, l - 1);
  const unit = pick(['cm', 'm']);
  const p = 2 * (l + w);
  const context = pick([
    `A rectangle is ${l} ${unit} long and ${w} ${unit} wide.`,
    `A rectangular garden is ${l} ${unit} long and ${w} ${unit} wide.`,
    `A rectangular room measures ${l} ${unit} by ${w} ${unit}.`,
    `A picture frame is ${l} ${unit} long and ${w} ${unit} wide.`,
  ]);
  return {
    text: `${context} What is its perimeter?`,
    answer: p,
    answerText: `${p} ${unit}`,
  };
}

function wpGeoRectArea() {
  const l = randInt(4, 15);
  const w = randInt(2, Math.min(l, 10));
  const unit = pick(['cm', 'm']);
  const a = l * w;
  const context = pick([
    `A rectangle is ${l} ${unit} long and ${w} ${unit} wide.`,
    `A rectangular wall is ${l} ${unit} long and ${w} ${unit} tall.`,
    `A rectangular floor is ${l} ${unit} by ${w} ${unit}.`,
    `A rectangular piece of paper is ${l} ${unit} long and ${w} ${unit} wide.`,
  ]);
  return {
    text: `${context} What is its area?`,
    answer: a,
    answerText: `${a} sq ${unit}`,
  };
}

function wpGeoSquarePerim() {
  const s = randInt(3, 15);
  const unit = pick(['cm', 'm']);
  const p = 4 * s;
  const context = pick([
    `A square tile has a side of ${s} ${unit}.`,
    `A square table has sides of ${s} ${unit}.`,
    `A square garden has sides of ${s} ${unit}.`,
    `A square piece of cloth has sides measuring ${s} ${unit}.`,
  ]);
  return {
    text: `${context} What is its perimeter?`,
    answer: p,
    answerText: `${p} ${unit}`,
  };
}

function wpGeoSquareArea() {
  const s = randInt(3, 12);
  const unit = pick(['cm', 'm']);
  const a = s * s;
  const context = pick([
    `A square tile has sides of ${s} ${unit}.`,
    `A square pool is ${s} ${unit} on each side.`,
    `A square classroom floor measures ${s} ${unit} on each side.`,
    `A square painting is ${s} ${unit} wide on each side.`,
  ]);
  return {
    text: `${context} What is its area?`,
    answer: a,
    answerText: `${a} sq ${unit}`,
  };
}

function wpGeoTriangleArea() {
  let b = randInt(4, 16);
  const h = b % 2 === 0 ? randInt(3, 12) : randInt(2, 6) * 2;
  const unit = pick(['cm', 'm']);
  const a = (b * h) / 2;
  const context = pick([
    `A triangular flag has a base of ${b} ${unit} and a height of ${h} ${unit}.`,
    `A triangular piece of land has a base of ${b} ${unit} and a height of ${h} ${unit}.`,
    `A triangle has a base of ${b} ${unit} and a height of ${h} ${unit}.`,
    `A triangular sign has a base of ${b} ${unit} and is ${h} ${unit} tall.`,
  ]);
  return {
    text: `${context} What is its area?`,
    answer: a,
    answerText: `${a} sq ${unit}`,
  };
}

function wpGeoMissingDimension() {
  // "Rectangle has perimeter P and one side is X. Find the other side."
  const l = randInt(5, 15);
  const w = randInt(3, l - 1);
  const p = 2 * (l + w);
  const unit = pick(['cm', 'm']);
  return {
    text: `A rectangle has a perimeter of ${p} ${unit}. One of its sides is ${w} ${unit} long. What is the length of the other side?`,
    answer: l,
    answerText: `${l} ${unit}`,
  };
}

function genWordProblem() {
  // Use category-based selection so every type of problem appears roughly equally.
  // First pick a category at random, then pick a generator within that category.
  const categories = [
    // 1. Basic addition stories
    [wpAdditionBasic, wpAdditionCombine, wpAdditionMorning, wpAdditionShopping,
     wpSubtractionBasic, wpSubtractionEat, wpSubtractionSold],
    // 2. Varied addition / subtraction
    [wpAdditionThreeNumbers, wpAdditionReadGoal,
     wpSubtractionLost, wpSubtractionUsed, wpSubtractionLibrary],
    // 3. Comparison ("how many more / fewer")
    [wpComparisonMore, wpComparisonFewer, wpComparisonHeightAge, wpComparisonScores],
    // 4. Multiplication
    [wpMultiplicationGroups, wpMultiplicationRows, wpMultiplicationLegs,
     wpMultiplicationWheels, wpMultiplicationPacks, wpMultiplicationDaily, wpPartySharing],
    // 5. Division & Grouping
    [wpDivisionShare, wpDivisionPacking, wpDivisionTeams,
     wpDivisionCost, wpDivisionPlates, wpGroupingBasic, wpGroupingSeats],
    // 6. Two-step Problems
    [wpTwoStepAddSub, wpTwoStepAddAdd, wpTwoStepSubSub, wpTwoStepMultAdd,
     wpLeftover, wpClassroom],
    // 7. Money (₱)
    [wpMoneyChange, wpMoneySavings, wpMoneySpend, wpMFPesoShortage,
     wpMFPesoTotalCost, wpMFCoinShortage, wpMFChangeFromBill, wpMFUnitRate],
    // 8. Time & Measurement
    [wpTimeTravel, wpDistanceLeft, wpMFTimePlusMins,
     wpMFTimeHoursAndMins, wpMFTimeConversion],
    // 9. Missing Numbers & Equations
    [wpMissingSum, wpMissingAddend, wpHowManyNeeded,
     wpMFMissingAddendEq, wpProductFind, wpMFMoreThan],
    // 10. Math Fair Logic (sequences, place value, fractions, compare)
    [wpMFPlaceValue, wpMFFraction, wpMFSequenceMissing, wpMFSequenceNext,
     wpMFCompareSymbol, wpMFHalfOfSum, wpMFTakeAwayProduct,
     wpMFMissingPages, wpMFMultiSum],
    // 11. Situational Multi-step (class, party events)
    [wpMFTwoStepClassAbsent, wpMFPartyTwoStep, wpTwoStepAddSub],
    // 12. Geometry Word Problems (text-only)
    [wpGeoRectPerim, wpGeoRectArea, wpGeoSquarePerim,
     wpGeoSquareArea, wpGeoTriangleArea, wpGeoMissingDimension],
  ];
  const category = pick(categories);
  return pick(category)();
}

// ===== Geometry =====

// --- Shape diagram problems ---

function geoRectPerimeter() {
  const l = randInt(3, 15);
  const w = randInt(2, l - 1);
  return {
    geoType: 'rect-perimeter',
    shape: 'rectangle',
    length: l,
    width: w,
    question: 'Find the perimeter of the rectangle.',
    answer: 2 * (l + w),
    answerText: `P = ${2 * (l + w)}`,
  };
}

function geoRectArea() {
  const l = randInt(3, 13);
  const w = randInt(2, Math.min(l, 10));
  return {
    geoType: 'rect-area',
    shape: 'rectangle',
    length: l,
    width: w,
    question: 'Find the area of the rectangle.',
    answer: l * w,
    answerText: `A = ${l * w}`,
  };
}

function geoSquarePerimeter() {
  const s = randInt(2, 15);
  return {
    geoType: 'square-perimeter',
    shape: 'square',
    side: s,
    question: 'Find the perimeter of the square.',
    answer: 4 * s,
    answerText: `P = ${4 * s}`,
  };
}

function geoSquareArea() {
  const s = randInt(2, 12);
  return {
    geoType: 'square-area',
    shape: 'square',
    side: s,
    question: 'Find the area of the square.',
    answer: s * s,
    answerText: `A = ${s * s}`,
  };
}

function geoTriangleArea() {
  let b = randInt(4, 16);
  const h = b % 2 === 0 ? randInt(3, 14) : randInt(2, 7) * 2;
  return {
    geoType: 'triangle-area',
    shape: 'triangle',
    base: b,
    height: h,
    question: 'Find the area of the triangle.',
    answer: (b * h) / 2,
    answerText: `A = ${(b * h) / 2}`,
  };
}

// --- Geometry word problems (with diagrams) ---

function geoRectFence() {
  const l = randInt(5, 20);
  const w = randInt(3, l - 1);
  return {
    geoType: 'rect-perimeter-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A garden is ${l} m long and ${w} m wide. How many meters of fence are needed to go around it?`,
    answer: 2 * (l + w),
    answerText: `${2 * (l + w)} m`,
  };
}

function geoRectFloor() {
  const l = randInt(4, 12);
  const w = randInt(3, Math.min(l, 10));
  return {
    geoType: 'rect-area-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A room is ${l} m long and ${w} m wide. What is the area of the floor?`,
    answer: l * w,
    answerText: `${l * w} sq m`,
  };
}

function geoSquareFence() {
  const s = randInt(3, 15);
  return {
    geoType: 'square-perimeter-word',
    shape: 'square',
    side: s,
    question: `A square playground has sides of ${s} m. What is the total distance around it?`,
    answer: 4 * s,
    answerText: `${4 * s} m`,
  };
}

function geoSquareGarden() {
  const s = randInt(3, 12);
  return {
    geoType: 'square-area-word',
    shape: 'square',
    side: s,
    question: `A square garden has sides of ${s} m. What is the area of the garden?`,
    answer: s * s,
    answerText: `${s * s} sq m`,
  };
}

function geoRectPainting() {
  const l = randInt(5, 15);
  const w = randInt(3, Math.min(l, 10));
  return {
    geoType: 'rect-area-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A wall is ${l} m long and ${w} m tall. What is the area to be painted?`,
    answer: l * w,
    answerText: `${l * w} sq m`,
  };
}

function geoRectTable() {
  const l = randInt(4, 12);
  const w = randInt(2, Math.min(l - 1, 8));
  const p = 2 * (l + w);
  return {
    geoType: 'rect-perimeter-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A rectangular table is ${l} cm long and ${w} cm wide. What is its perimeter?`,
    answer: p,
    answerText: `${p} cm`,
  };
}

function geoTriangleSail() {
  let b = randInt(4, 14);
  const h = b % 2 === 0 ? randInt(3, 12) : randInt(2, 6) * 2;
  return {
    geoType: 'triangle-area-word',
    shape: 'triangle',
    base: b,
    height: h,
    question: `A triangular sail has a base of ${b} m and a height of ${h} m. What is its area?`,
    answer: (b * h) / 2,
    answerText: `${(b * h) / 2} sq m`,
  };
}

function geoSquareTiles() {
  const s = randInt(3, 10);
  return {
    geoType: 'square-area-word',
    shape: 'square',
    side: s,
    question: `Each tile is a square with sides of ${s} cm. What is the area of one tile?`,
    answer: s * s,
    answerText: `${s * s} sq cm`,
  };
}

function geoRectRibbon() {
  const l = randInt(5, 15);
  const w = randInt(3, Math.min(l, 10));
  return {
    geoType: 'rect-perimeter-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A photo frame is ${l} cm long and ${w} cm wide. How much ribbon is needed to go around it?`,
    answer: 2 * (l + w),
    answerText: `${2 * (l + w)} cm`,
  };
}

function geoRectFieldDouble() {
  const l = randInt(5, 15);
  const w = randInt(3, l - 1);
  const perimeter = 2 * (l + w);
  const laps = pick([2, 3, 4]);
  return {
    geoType: 'rect-perimeter-word',
    shape: 'rectangle',
    length: l,
    width: w,
    question: `A field is ${l} m long and ${w} m wide. ${pick(NAMES)} runs around it ${laps} times. How many meters does ${pick(NAMES)} run?`,
    answer: perimeter * laps,
    answerText: `${perimeter * laps} m`,
  };
}

function genGeometryProblem() {
  const generators = [
    // Basic diagram problems (5)
    geoRectPerimeter, geoRectArea, geoSquarePerimeter, geoSquareArea, geoTriangleArea,
    // Word problems with diagrams (10)
    geoRectFence, geoRectFloor, geoSquareFence, geoSquareGarden,
    geoRectPainting, geoRectTable, geoTriangleSail, geoSquareTiles,
    geoRectRibbon, geoRectFieldDouble,
  ];
  return generators[randInt(0, generators.length - 1)]();
}

// ===== Test assembly =====

function generateMany(genFn, count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(genFn());
  }
  return results;
}

export function generateTest(config) {
  const test = {};

  if (config.subtraction.enabled) {
    test.subtraction = {
      label: 'Subtraction with Borrowing',
      time: config.subtraction.timeMinutes,
      format: 'vertical',
      questions: [
        ...generateMany(genSubtraction2Digit, config.subtraction.twoDigit),
        ...generateMany(genSubtraction3Digit, config.subtraction.threeDigit),
      ],
    };
    test.subtraction.totalQuestions = test.subtraction.questions.length;
  }

  if (config.addition.enabled) {
    test.addition = {
      label: 'Addition',
      time: config.addition.timeMinutes,
      format: 'vertical',
      questions: [
        ...generateMany(genAdditionSimple, config.addition.simple),
        ...generateMany(genAdditionCarrying, config.addition.carrying),
      ],
    };
    test.addition.totalQuestions = test.addition.questions.length;
  }

  if (config.multiplication.enabled) {
    test.multiplication = {
      label: 'Multiplication',
      time: config.multiplication.timeMinutes,
      format: 'horizontal',
      questions: generateMany(genMultiplication, config.multiplication.count),
    };
    test.multiplication.totalQuestions = test.multiplication.questions.length;
  }

  if (config.division.enabled) {
    test.division = {
      label: 'Division',
      time: config.division.timeMinutes,
      format: 'horizontal',
      questions: generateMany(genDivision, config.division.count),
    };
    test.division.totalQuestions = test.division.questions.length;
  }

  if (config.wordProblems.enabled) {
    test.wordProblems = {
      label: 'Word Problems',
      time: config.wordProblems.timeMinutes,
      format: 'word',
      questions: generateMany(genWordProblem, config.wordProblems.count),
    };
    test.wordProblems.totalQuestions = test.wordProblems.questions.length;
  }

  if (config.geometry.enabled) {
    test.geometry = {
      label: 'Geometry',
      time: config.geometry.timeMinutes,
      format: 'geometry',
      questions: generateMany(genGeometryProblem, config.geometry.count),
    };
    test.geometry.totalQuestions = test.geometry.questions.length;
  }

  return test;
}

export const defaultConfig = {
  subtraction: { enabled: true, twoDigit: 24, threeDigit: 16, timeMinutes: 30 },
  addition: { enabled: true, simple: 10, carrying: 10, timeMinutes: 10 },
  multiplication: { enabled: true, count: 20, timeMinutes: 10 },
  division: { enabled: true, count: 20, timeMinutes: 10 },
  wordProblems: { enabled: true, count: 8, timeMinutes: 15 },
  geometry: { enabled: true, count: 6, timeMinutes: 10 },
};
