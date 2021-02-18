export function isValidNumbers(input) {
  let valid = true;
  if (input.length === 0) return { valid, validNums: [] };
  const validNums = input
    .split(/\s+|,+/)
    .filter(el => el !== '')
    .filter(el => {
      const validEl = /^[1-9][0-9]*$/g.test(el) && +el <= 100;
      if (!validEl) valid = false;
      return validEl;
    })
    .map(el => +el);
  return { valid, validNums: valid ? validNums : [] };
}
