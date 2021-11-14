// Модуль 9. Задание 1
/*
Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML (см. xmlString) в JS-объект и выводить его в консоль.
Результат JS-объект:
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

let xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
 </student>
</list>`;

function xmlToObject(xml) {
	let parser = new DOMParser();
	let xmlDom = parser.parseFromString(xml, 'text/xml');
	let studentNode = xmlDom.querySelectorAll('student');
	
	let list = [];
	let obj = {list};

	studentNode.forEach(student => {
		let nameNode = student.querySelector('name');
		let firstName = nameNode.querySelector('first').textContent;
		let secondName = nameNode.querySelector('second').textContent;
		let lang = nameNode.getAttribute('lang');
		let age = +student.querySelector('age').textContent;
		let prof = student.querySelector('prof').textContent;

		list.push({name: firstName + ' ' + secondName, age, prof, lang});
	});
	console.log(obj);
}

xmlToObject(xmlString);