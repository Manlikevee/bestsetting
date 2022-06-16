const headRow = [...document.querySelectorAll('table thead tr th')]
	.map(column => column.textContent.trim());

const rows = [...document.querySelectorAll('table tbody tr')]
	.map(tr => [...tr.querySelectorAll('td')]
		.map(td => td.textContent.trim())
	);

const content = [headRow, ...rows]
	.map(row => row.map(str => '"' + (str ? str.replace(/"/g, '""') : '') + '"'))
	.map(row => row.join(','))
	.join('\n');

const BOM = '\uFEFF'; // utf-8 byte-order-mark
const csvBlob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8' });

function showCsv(){
	console.log(content);
}

function download(){
	if (window.navigator.msSaveOrOpenBlob) { 
		// IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
		navigator.msSaveBlob(csvBlob, 'exampleTable.csv');
	} else {
		const objectUrl = URL.createObjectURL(csvBlob);
		const a = document.createElement('a');
		a.setAttribute('href', objectUrl);
		a.setAttribute('download', 'exampleTable.csv');

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);	
	}
}