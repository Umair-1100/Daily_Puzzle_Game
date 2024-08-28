let setsComplete = document.querySelector(".set_1");
let holder = document.getElementById("images_holder");
let matchedSetsBody = document.getElementById("matched_sets");

let solutions = [
  [1, 5, 11],
  [8, 6, 1],
  [4, 10, 11],
  [10, 11, 12],
  [2, 5, 7],
  [12, 8, 4],
];

let count = 0;
const maxSelection = 3;
let selectIds = [];

const handleClick = (event) => {
  let id = parseInt(event.target.id);

  if (event.target.style.border !== "1px solid blue") {
    if (count < maxSelection) {
      count++;
      event.target.style =
        "border: 1px solid blue; box-shadow: rgba(4, 0, 255, 0.979) 0px 2px 15px;";
      selectIds.push(id);
    }
  } else {
    count--;
    event.target.style.border = "none";
    event.target.style.boxShadow = "none";
    selectIds = selectIds.filter((selectedId) => selectedId !== id);
  }

  if (count === maxSelection) {
    checkMatch();
  }
};

const checkMatch = () => {
  let matchFound = solutions.some((solution) =>
    solution.every((id) => selectIds.includes(id))
  );

  let findIndex = solutions.findIndex((solution) =>
    solution.every((id) => selectIds.includes(id))
);

if (solutions.length === 0) {
  alert("All sets found!");
  resetSelection();
}
if (matchFound && findIndex >= 0) {
  setTimeout(() => {
    alert("Set found!");
    addMatchedSetToTable(selectIds);
    resetSelection();
  }, 100);
  solutions.splice(findIndex , 1);
  } else {
    setTimeout(() => {
      alert("Set Not found!");
      resetSelection();
    }, 100);
  }
};

const addMatchedSetToTable = (matchedSet) => {
  let row = document.createElement("section");
  row.classList.add("create_div_main");
  matchedSet.forEach((id) => {
    let cell = document.createElement("div");
    cell.classList.add("images_flex-item");
    let img = document.getElementById(id).cloneNode();
    img.style.border = "none";
    img.style.boxShadow = "none";
    cell.appendChild(img);
    row.appendChild(cell);
  });
  matchedSetsBody.appendChild(row);
};

const resetSelection = () => {
  count = 0;
  selectIds = [];
  [...holder.getElementsByTagName("img")].forEach((img) => {
    img.style.border = "none";
    img.style.boxShadow = "none";
  });
};

holder.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    handleClick(event);
  }
});
