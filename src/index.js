module.exports = function toReadable (number) {
  function unshiftDigit(digit) {
    result.unshift(words.digits[digit]);
  }
  function unshiftFrom11To19(digit) {
    result.unshift(words.from11To19[digit - 1]);
  }
  function unshiftDecade(decade) {
    result.unshift(words.decades[decade - 1]);
  }
  function unshiftHundred(hundred) {
    result.unshift(`${words.digits[hundred]} ${words.hundred}`);
  }

  const words = {
    digits: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    decades: ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    from11To19: ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    hundred: 'hundred',
  };
  const reversedArr = number.toString().split('').reverse();
  const result = [];

  const digit = reversedArr[0];
  const decade = reversedArr[1];
  const hundred = reversedArr[2];

  if(reversedArr.length === 1) {
    unshiftDigit(digit);
  } else {
    if(digit === '0') {
      if(decade !== '0') {
        unshiftDecade(decade);
      }
    } else {
      if(decade === '0') {
        unshiftDigit(digit);
      } else {
        if(decade === '1') {
          unshiftFrom11To19(digit);
        } else {
          unshiftDigit(digit);
          unshiftDecade(decade);
        }
      }
    }

    if(hundred) {
      unshiftHundred(hundred);
    }
  }

  return result.join(' ').trim();
}

//input: число
//output: строковая интерпретация числа

//first way
//1.Создать объект с массивами доступных слов (цифры (0-9), десятки (10-90), числа после 10 (11-19), сотня)
//2.Разбить число (input) на массив цифр и развернуть его в обратном порядке
//3.Создать пустой массив слов (результат)
//4.Если длина массива (п.2) равна 1, возвращаем соответствующую цифру
//5.Проверка на десяток или число между 10 и 20, если первый элемент массив не равен 0
//5.1.Если нулевой элемент массива (п.2) равен 0, то в результат (п.3) в начало вставляется соответствующий десяток (через первый элемент массива (п.2))
//5.2.Если первый элемент массива (п.2) равен 1, то в результат (п.3) в начало вставляется соответствующее обозначение числа между 10 и 20
//    (через нулевой элемент массива (п.2))
//6.Иначе вставляем в начало результата (п.3) цифру (через нулевой элемент массива (п.2))
//7.И вставляем в начало результата (п.3) десяток (через первый элемент массива (п.2))
//8.Если есть второй элемент массива (п.2), то вставить в начало результата (п.3) строку: "цифра (через второй элемент массива (п.2)) сотня"
//9.Вернуть результат в виде строки, разделитель - пробел
