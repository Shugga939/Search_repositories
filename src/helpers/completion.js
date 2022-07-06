function completion(number) {
  let n = number % 100;

  if (n > 4 && n < 21) {
    return `${number} репозиториев`;
  } else {
    n = number % 10;
    if (n === 1) {
      return `${number} репозиторий`;
    }
    if (n > 1 && n < 5) {
      return `${number} репозитория`;
    } else {
      return `${number} репозиториев`;
    }
  }
}

export default completion