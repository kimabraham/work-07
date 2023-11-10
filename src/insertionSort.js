import { AVAILABLE_SORTING_ALGORITHMS } from "./constants";
import { calculateStep, renderGraph } from "./utils";

const insertionSort = async (numbers) => {
  const array = numbers.slice();
  const domData = [];

  renderGraph(numbers, domData);

  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    const currentDom = domData[i];
    let j = i - 1;
    await renderTarget(currentDom, domData[j], 500);
    for (; j >= 0 && array[j] > current; j--) {
      await renderSort(domData[j], currentDom, 500);
      domData[j + 1] = domData[j];
      array[j + 1] = array[j];
    }
    domData[j + 1] = currentDom;
    array[j + 1] = current;
    await movingUp(currentDom, domData[i - 1], 500);
  }
  return array;
};

const renderTarget = (target, compare, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      target.classList.add("sort-choice");
      compare.classList.add("sort-select");
      resolve();
    }, delay);
  });
};

const renderSort = (compare, current, delay) => {
  return new Promise((resolve) => {
    compare.classList.add("sort-select");
    setTimeout(() => {
      compare.style.translate = calculateStep(
        compare,
        AVAILABLE_SORTING_ALGORITHMS.INSERTION,
        "right"
      );
      current.style.translate = calculateStep(
        current,
        AVAILABLE_SORTING_ALGORITHMS.INSERTION,
        "left"
      );
      compare.classList.remove("sort-select");
      compare.classList.add("sort-complete");
      resolve();
    }, delay);
  });
};

const movingUp = (target, compare, delay) => {
  return new Promise((resolve) => {
    const targetStep = parseInt(target.style.translate);

    setTimeout(() => {
      target.style.translate = `${targetStep}px 0px`;
      target.classList.remove("sort-select", "sort-choice");
      target.classList.add("sort-complete");
      compare.classList.remove("sort-select");
      compare.classList.add("sort-complete");
      resolve();
    }, delay);
  });
};

export default insertionSort;
