const numbers = document.querySelectorAll('.number');
//в переменную numbers записывается значение с классом number

const operations = document.querySelectorAll('.operator');
 //в переменную operations записывается значение с классом operator, символ опирации

const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');

const SqrtBtn = document.getElementById('sqrt');

const result = document.getElementById('result');

const display = document.getElementById('display');
let MemoryCurrentNumber = 0; //текущая цифра
let MemoryNewNumber = false; //Ввели ли мы новое число
let MemoryPendingOperation = ''; //Последняя сохранённая операция



for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);



function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') { // === это равно 0, а 0 как строка
      display.value = number; // значение импута присвоить значение цифры
    } else {
      display.value += number; //+= это добовляй цифру
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;
  let PowResult = 0;

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;


           //Возведение в степень
    }else if (MemoryPendingOperation === 'pow') {
     // MemoryNewNumber = false;
      //PowResult = localOperationMemory;
     
     // MemoryCurrentNumber = (Math.pow(localOperationMemory, MemoryCurrentNumber));
     MemoryCurrentNumber = (Math.pow(MemoryCurrentNumber,localOperationMemory));
      //MemoryPendingOperation = '=';
      display.value = PowResult;
  
      
        console.log(PowResult);
        console.log(MemoryCurrentNumber);
        console.log(MemoryPendingOperation);
    }
    
      
    else {
     
      MemoryCurrentNumber = +localOperationMemory; //кнопка =
      
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
  } //Извлечение корня
   if (MemoryPendingOperation === 'sqrt') {
    
      MemoryNewNumber = true;
      MemoryCurrentNumber = (Math.sqrt(localOperationMemory));
      MemoryPendingOperation = '='; 
      display.value = MemoryCurrentNumber;
      
      console.log(MemoryCurrentNumber);
      console.log(MemoryPendingOperation);

  }
 
  



}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}

