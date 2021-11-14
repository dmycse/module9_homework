// Модуль 9. Задание 5
/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».

При клике на кнопку происходит следующее:
- Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — 
выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
- Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — 
выводить ниже текст «Лимит вне диапазона от 1 до 10»;
- Если и первый, и второй input не в диапазонах или не являются числами — 
выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
- Если числа попадают в диапазон от 1 до 10 — сделать запрос 
по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page 
— это число из первого input, а GET-параметр limit — это введённое число второго input. 
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки 
из последнего успешно выполненного запроса (использовать localStorage).
*/

let btn = document.querySelector('.js-btn-request');
let divNode = document.querySelector('.js-result');

function addCards(apiData) {
	let cardBlock = '';
	apiData.forEach(elem => {
		let card = `<div class='card'>
			<img src='${elem.download_url}' class='card-image'>
			<p>${elem.author}</p>
			</div>`;
		cardBlock = cardBlock + card;
	});
	divNode.innerHTML = cardBlock;
	divNode.style.color = 'black';
}

function showPictures() {
	let pageNum = +document.querySelector('.valueIn_1').value;
	let imgLimit = +document.querySelector('.valueIn_2').value;

	if (pageNum < 1 || pageNum > 10 || isNaN(pageNum)) {
		
		if (imgLimit < 1 || imgLimit > 10 || isNaN(imgLimit)) {
			divNode.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10!';
			divNode.style.color = 'red';
		}
		else {
			divNode.innerText = 'Номер страницы вне диапазона от 1 до 10!';
			divNode.style.color = 'red';
		}
	}
	else if (imgLimit < 1 || imgLimit > 10 || isNaN(imgLimit)) {
		divNode.innerText = 'Лимит вне диапазона от 1 до 10!';
		divNode.style.color = 'red';
	}
	else {
		fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${imgLimit}`)
			.then(response => response.json())
			.then(data => {
				addCards(data);
				localStorage.setItem('myImgs', JSON.stringify(data));
			})
			.catch(() => console.log('error'));
	}	
}

btn.addEventListener('click', showPictures);

window.onload = () => {
	let myImgs = localStorage.getItem('myImgs');
	if (myImgs) addCards(JSON.parse(myImgs));
}