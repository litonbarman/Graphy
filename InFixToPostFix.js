console.clear();

class Stack {
	
	items;
	
	constructor(){
		this.items = [];
	}
	
	push(node){
		this.items.push(node);
	}
	
	pop(){
		
		if( this.items.length == 0 ){
			return false;
		}	
		return this.items.pop();
	}
	
	peek(){
		return this.items[ this.items.length - 1 ];
	}
	
	isEmpty(){
		return ( this.items.length == 0 );
	}
}


class priorityTable {
	
	priority;
	
	constructor(){
		
		this.priority = [];
		
		this.priority[0] = '^';
		this.priority[1] = '*';
		this.priority[2] = '/';
		this.priority[3] = '+';
		this.priority[4] = '-';
	}
	
	getPriority(operator){
		
		var x = 0;
		
	    for( ; x < 5 && (this.priority[x] != operator); x++ );
		
		return (5-x);
	}
}


let postFixReverse = new Stack();


function intopo(string){
	
	let stack = new Stack();
	let table = new priorityTable();
	const str = string.split("");
	
	stack.push('(');
	str[str.length] = ')';
	
	var x = 0;
	
	while( x < str.length ){
		
		if( table.getPriority(str[x]) == 0 ){
			
			if( str[x] == '(' ){
				stack.push( str[x] );
			}
			else if( str[x] == ')' ){
				
				var hold  = stack.pop();
				
				while( hold != '(' ){
					
					postFixReverse.push( hold );	
					hold = stack.pop();
				}
			}
			else{
				postFixReverse.push(str[x]);
			}
		}
		else{
			
			if( table.getPriority( stack.peek() ) == 0 ){
				stack.push( str[x] );
			}
			else{
				
				if( table.getPriority( stack.peek() ) > table.getPriority( str[x] ) ){
					var hold = stack.pop();
					stack.push( str[x] );
					postFixReverse.push( hold );
				}
				else{
					stack.push( str[x] );
				}	
			}
		}
			
		x++;
	}	
}





intopo("A+(B*C-(D/E^F)*G)*H");


var postFix = new Stack();

var temp = postFixReverse.pop();

while( temp != false ){
	postFix.push( temp );
	temp = postFixReverse.pop();
}


if( postFix.isEmpty() ){
	console.log("Stack is empty");
}
else{
	
	var hold = postFix.pop();
	
	while( hold != false ){
	    console.log( hold );	
        hold = postFix.pop();
		
    }	
}