import { AVAILABLE_SORTING_ALGORITHMS } from "./constants";

export const validateNumbers = (input) => {
  const numbers = input.split(",").map((num) => Number(num.trim()));
  const sliceNumbersFromEmpty = numbers.slice(
    0,
    input.split(",").findIndex((el) => el === "") < 0
      ? numbers.length
      : input.split(",").findIndex((el) => el === "")
  );
  if (numbers.length < 5 || numbers.length > 10) {
    return { success: false, message: "Wrong number count!(5 ~ 10)" };
  }
  if (numbers.some((number) => isNaN(number))) {
    return { success: false, message: "Please input number!" };
  }
  return { success: true, data: sliceNumbersFromEmpty };
};

export const renderGraph = (numbers, domData) => {
  document.querySelector(".background")?.remove();
  const formElement = document.querySelector("form");

  const backGroundElement = document.createElement("div");
  backGroundElement.classList.add("background");
  formElement.after(backGroundElement);

  for (let i = 0; i < numbers.length; i++) {
    const BAR_WIDTH = calculateBarWidth(numbers);
    const BAR_HEIGHT = calculateBarHeight(numbers, i);

    const barElement = document.createElement("div");
    barElement.classList.add("number-bar");
    barElement.id = `number-bar-${i}`;
    barElement.style.width = `${BAR_WIDTH}px`;
    barElement.style.height = `${BAR_HEIGHT}px`;

    const barTitle = document.createElement("h1");
    barTitle.textContent = numbers[i];
    barElement.append(barTitle);
    backGroundElement.append(barElement);
    domData.push(barElement);
  }
};

export const renderErrorMessage = (isValid) => {
  const formElement = document.querySelector("form");
  const errorSpan = document.querySelector(".error-message");

  if (errorSpan) {
    errorSpan.textContent = isValid.message;
  } else {
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.textContent = isValid.message;
    formElement.after(errorElement);
  }
};

const calculateBarWidth = (array) => {
  const length = array.length;
  return (460 - (length - 1) * 10) / length;
};

const calculateBarHeight = (array, index) => {
  const max = Math.max(...array);
  const min = Math.min(...array);

  if (min >= 0) {
    return (340 / (max + 1)) * (array[index] + 1);
  }
  if (max < 0) {
    return (340 / Math.abs(min)) * (Math.abs(min) + array[index] + 1);
  }
  if (max >= 0 && min < 0) {
    return (
      (340 / (Math.abs(max - min) + 1)) * (array[index] + Math.abs(min) + 1)
    );
  }
};

export const calculateStep = (element, type, direct) => {
  const xValue = parseInt(element.style.translate);
  const yValue = type === AVAILABLE_SORTING_ALGORITHMS.BUBBLE ? 0 : 390;
  const step = element.clientWidth + 10;

  if (direct === "right" && xValue) {
    return `${xValue + step}px 0px`;
  }
  if (direct === "right" && !xValue) {
    return `${step}px 0px`;
  }
  if (direct === "left" && xValue) {
    return `${xValue - step}px ${yValue}px`;
  }
  if (direct === "left" && !xValue) {
    return `-${step}px ${yValue}px`;
  }
};
