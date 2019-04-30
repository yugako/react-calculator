import React from 'react';
import './App.css';

const formula = React.createRef();
const result = React.createRef();
const numbers = [1,2,3,4,5,6,7,8,9, '.', 0, 'Math.PI'];
const operations = ['+', '-', '*', '/'];

document.addEventListener('keyup', (e) => {
	if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 112)) {
		const value = e.key;
		handleValues(value);	
	}

	switch (e.keyCode) {
		case 13:
			execution();
			break;
		case 8:
			clearField();
			break;
		case 46:
			reduceOne();
			break;
	}
});

function fillLabel (e) {
	const value = e.target.innerHTML;
	handleValues(value);	
}

function handleValues(value) {
	const last = formula.current.innerHTML.split('').pop(),
		  pattern = /-|\+|\*|\/|\./,
		  test = pattern.test(last),
		  testValue  = pattern.test(value);

	if ((test && (last === value))) {
		return;
	} else if (test && testValue) {
		formula.current.innerHTML = formula.current.innerHTML.slice(0,formula.current.innerHTML.length-1) + value;
	} else if ((testValue && !formula.current.innerHTML)) {
		formula.current.innerHTML = `0${value}`; 
	} else {
		formula.current.innerHTML+=value;
	}
}

function execution ()  {
	if (formula.current.innerHTML) {
		try {
			let res = eval(formula.current.innerHTML);
			result.current.innerHTML = res.toFixed(2);
			formula.current.innerHTML = res.toFixed(2);
		} catch(e) {
			result.current.innerHTML = 'Incorrect data!';
		}
		
	} 
}
function clearField () {
	formula.current.innerHTML = '';
	result.current.innerHTML = '';
}

function reduceOne () {
	formula.current.innerHTML = formula.current.innerHTML.slice(0,formula.current.innerHTML.length-1);
}

function App() {
  	return (
	    <main className="calc">
	    	<section className='calc-execution' >
	    		<div className='calc-formula' ref={formula}></div>
	    		<div className='calc-result' ref={result}></div>
	    	</section>
	    	<section className='calc-operation'>
	    		{operations.map(operation => <button key={operation} className='operation' onClick={fillLabel}>{operation}</button>)}
	    	</section> 
	      	<section className="calc-field">      
	        	{numbers.map(num => <button key={num} className='num' onClick={fillLabel}>{num}</button>)}
	      	</section>
	      	
	      	<section className='calc-toolbar'>
		      	<div className='tool tool-clearAll' onClick={clearField}>AC</div>
		      	<div className='tool' onClick={reduceOne}>C</div>
		      	<div className='tool tool-equal' onClick={execution}>=</div>
		    </section>
	    </main>
  	);
}

export default App;