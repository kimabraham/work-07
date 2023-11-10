import "./style.css";
import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import { AVAILABLE_SORTING_ALGORITHMS } from "./constants";
import { renderErrorMessage, validateNumbers } from "./utils";

const formElement = document.querySelector("form");
const inputElement = document.querySelector("form input");
const selectElement = document.querySelector("form select");

let userInput = "";
let selectedAlgorithm = AVAILABLE_SORTING_ALGORITHMS.BUBBLE;

inputElement.addEventListener("change", function (ev) {
  userInput = ev.target.value;
});

selectElement.addEventListener("change", function (ev) {
  userInput = "";
  inputElement.value = "";
  selectedAlgorithm = ev.target.value;
});

formElement.addEventListener("submit", function (ev) {
  ev.preventDefault();

  const isValid = validateNumbers(userInput);

  if (!isValid.success) {
    renderErrorMessage(isValid);
  }

  if (isValid.success) {
    document.querySelector(".error-message")?.remove();
    if (selectedAlgorithm === AVAILABLE_SORTING_ALGORITHMS.BUBBLE) {
      bubbleSort(isValid.data);
    } else if (selectedAlgorithm === AVAILABLE_SORTING_ALGORITHMS.INSERTION) {
      insertionSort(isValid.data);
    } else {
      alert("Invalid Sorting Algorithm.");
    }
  }
});
