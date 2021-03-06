let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");

const columns = {
  c1: [3, 2, 1],
  c2: [],
  c3: [],
};

let moves = [];

const minWidth = 60;
const stepWidth = 40;

const createDom = (arr, dom) => {
  dom.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    const div = document.createElement("div");
    div.style.width = minWidth + (n - 1) * stepWidth + "px";
    dom.appendChild(div);
  }
};

const render = () => {
  createDom(columns.c1, c1);
  createDom(columns.c2, c2);
  createDom(columns.c3, c3);
};

render();

let success = document.getElementsByClassName("success")[0];

let btns = document.querySelectorAll("button");

const solve = () => {
  hanoiIterate();
  columns.c3.reverse();
  render();
  success.style.opacity = 1;
  document.getElementById("moves").textContent =
    "You win🏆 Moves: " + (Math.pow(2, columns.c3.length) - 1);
};

const start = () => {
  document.getElementById("solve-button").disabled = true;
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = () => {
      let from = columns[btns[i].dataset.from];
      let to = columns[btns[i].dataset.to];
      move(from, to);
      moves.push({
        from: from,
        to: to,
      });
    };
  }
};

const move = (from, to) => {
  if (from.length === 0) {
    return;
  }
  if (to.length === 0) {
    to.push(from.pop());
    render();
  } else {
    check(from, to);
  }
};

const check = (from, to) => {
  const fromLast = from[from.length - 1];
  const toLast = to[to.length - 1];
  if (fromLast < toLast) {
    to.push(from.pop());
    render();
  } else {
    return;
  }

  if (columns.c1.length === 0 && columns.c2.length === 0) {
    success.style.opacity = 1;
    document.getElementById("moves").textContent =
      "You win🏆 Moves: " + (moves.length + 1);
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.opacity = 0;
    }
  }
};

const moveCheckRec = (numberOfDisc, from, to) => {
  moves.push({
    disk: numberOfDisc,
    from: from,
    to: to,
  });
};

const moveCheckItr = (count) => {
  count++;
};

const hanoi = (numberOfDisc, from, buf, to) => {
  if (numberOfDisc > 0) {
    hanoi(numberOfDisc - 1, from, to, buf);
    move(from, to);
    moveCheck(numberOfDisc, from, to);
    hanoi(numberOfDisc - 1, buf, from, to);
  }
};

const hanoiIterate = () => {
  let stack = [columns.c1.reverse(), columns.c2, columns.c3];

  const numberOfDisc = columns.c1.length;

  let x = numberOfDisc % 2 != 0 ? 2 : 1;
  let count = Math.pow(2, numberOfDisc) - 1;
  let firstColumn = 0;

  console.table(stack);

  while (count != 0) {
    stack[(firstColumn + x) % 3].unshift(stack[firstColumn].shift());
    firstColumn = (firstColumn + x) % 3;
    console.table(stack);
    count--;

    if (count !== 0) {
      if (
        stack[(firstColumn + 1) % 3].length === 0 ||
        (stack[(firstColumn + 2) % 3].length !== 0 &&
          stack[(firstColumn + 2) % 3][0] < stack[(firstColumn + 1) % 3][0])
      ) {
        stack[(firstColumn + 1) % 3].unshift(
          stack[(firstColumn + 2) % 3].shift()
        );
        console.table(stack);
      } else {
        stack[(firstColumn + 2) % 3].unshift(
          stack[(firstColumn + 1) % 3].shift()
        );
        console.table(stack);
      }
      count--;
    }
  }

  console.table(stack);
};
