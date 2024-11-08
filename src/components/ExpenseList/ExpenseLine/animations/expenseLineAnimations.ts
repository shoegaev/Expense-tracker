import classes from "../ExpenseLineStyle.module.scss";
export function expand(
  line: HTMLElement,
  desiredHeight: number,
): NodeJS.Timeout {
  line.style.height = `${desiredHeight}px`;
  const timerId = setTimeout(() => {
    line.style.height = "";
    line.classList.add(classes.ExpenseLine__open);
  }, 200);
  return timerId;
}

export function minimize(
  line: HTMLElement,
  desiredHeight: number,
): NodeJS.Timeout {
  line.style.height = `${line.clientHeight}px`;
  line.classList.remove(classes.ExpenseLine__open);
  setTimeout(() => {
    line.style.height = `${desiredHeight}px`;
  }, 0);
  const timerId = setTimeout(() => {
    line.style.height = "";
  }, 200);
  return timerId;
}
