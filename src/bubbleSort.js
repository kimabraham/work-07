import { AVAILABLE_SORTING_ALGORITHMS } from "./constants";
import { calculateStep, renderGraph } from "./utils";

const bubbleSort = async (numbers) => {
  const array = numbers.slice();
  const domData = [];

  renderGraph(numbers, domData);

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      await renderSort(j, j + 1, array, domData);
      if (array[j] > array[j + 1]) {
        [domData[j], domData[j + 1]] = [domData[j + 1], domData[j]];
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    await renderMax(array.length - 1 - i, domData);
  }

  return array;
};

const addClassName = (target, compare, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      target.classList.add("sort-select");
      compare.classList.add("sort-select");
      resolve();
    }, delay);
  });
};

const removeClassName = (target, compare, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      target.classList.remove("sort-select");
      compare.classList.remove("sort-select");
      resolve();
    }, delay);
  });
};

const renderSwap = (target, compare, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      target.style.translate = calculateStep(
        target,
        AVAILABLE_SORTING_ALGORITHMS.BUBBLE,
        "right"
      );
      compare.style.translate = calculateStep(
        compare,
        AVAILABLE_SORTING_ALGORITHMS.BUBBLE,
        "left"
      );
      resolve();
    }, delay);
  });
};

const renderSort = async (target, compare, array, domData) => {
  const compareElement = domData[compare];
  const targetElement = domData[target];

  if (array[target] > array[compare]) {
    await addClassName(targetElement, compareElement, 500);
    await renderSwap(targetElement, compareElement, 500);
    await removeClassName(targetElement, compareElement, 300);
  } else {
    await addClassName(targetElement, compareElement, 500);
    await removeClassName(targetElement, compareElement, 800);
  }
};

const renderMax = (i, domData) => {
  const targetElement = domData[i];
  return new Promise((resolve) => {
    setTimeout(() => {
      targetElement.classList.add("sort-complete");
      resolve();
    }, 500);
  });
};

export default bubbleSort;
