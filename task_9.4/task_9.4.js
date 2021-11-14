// Модуль 9. Задание 4
/*
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число. При клике на кнопку происходит следующее:
- Если оба числа не попадают в диапазон от 100 до 300 или введено не число — 
выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
- Если числа попадают в диапазон от 100 до 300 — сделать запрос 
c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
После получения данных вывести ниже картинку на экран.
*/

let btn = document.querySelector('.js-btn-request');
let divNode = document.querySelector('.js-result');

function showImage() {
	let width = +document.querySelector('.valueIn_1').value;
	let height = +document.querySelector('.valueIn_2').value;

	if (width < 100 || height < 100 || width > 300 || height > 300 || isNaN(width) || isNaN(height)) {
		divNode.innerText = 'Одно из чисел вне диапазона от 100 до 300!';
		divNode.style.color = 'red';
	}
	else {
		fetch(`https://picsum.photos/${width}/${height}`)
			.then(response => divNode.innerHTML = `<img src='${response.url}' class='card-image'>`)
			.catch(() => console.log('error'));
	}
}

btn.addEventListener('click', showImage);