
const onlyLetter = (e) => {
  let char = String.fromCharCode(e.keyCode);
  if (/^[a-zA-Z\s]*$/.test(char)) return true;
  else e.preventDefault();
}

const getFormattedDate = (date, locale) => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

const stringToDate = (date_string) => {
  // string DD/MM/YYYY -> string MM/DD/YYYY -> Date
  var dateParts = date_string.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}


function removeById(arr, id) {
  const object = arr.findIndex((x) => x.id === id);

  if (object > -1) {
    arr.splice(object, 1);
  }

  return arr;
}

export { onlyLetter, getFormattedDate ,stringToDate ,removeById }
