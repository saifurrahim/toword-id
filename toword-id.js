/*------------------------------------------------
Author 		: Saifurrahim
Created 	: 2019/1/13
Description	: convert number to indonesian words
--------------------------------------------------*/

/*Rules		:
--------------------------------------------------------------------------------------------------------------------------------
		#1	: number '1' in hundreds position is called 'Seratus' instead of 'Satu Ratus'.
		#2	: number '1' in tens position 
				a.	followed by '0' is called 'Sepuluh' instead of 'Satu Puluh'.
				b.	followed by '1' is called 'Sebelas' instead of 'Satu Puluh Satu'.
				c.	followed by (x) is called '(x) Belas' instead of 'Satu Puluh (x)'. (x) = '2' to '9'.
		#3	: numbers are in units position if it located in the last of the triple and still have other triple following it.
		#4	: number '1' is called 'Seribu' when it has exactly one remained triple after it, 
			  and also hundreds and tens of its own triple are '0' or empty.
		#5	: any digits after point in decimal number are spelled as is, without applying units.
-------------------------------------------------------------------------------------------------------------------------------*/

function toWord_id(input){

	if(isNaN(input)){
		return 'Bukan angka';
	}

	var output = '';

	var numbers = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
	var units = [' Ribu ', ' Juta ', ' Miliar ', ' Triliun ', 
				' Kuadriliun ', ' Kuintiliun ', ' Sekstiliun ', ' Septiliun ', ' Oktiliun ', ' Noniliun ', ' Desiliun ' ];
	var small_units = [' Puluh ', ' Ratus '];
	var special_unit = ' Belas ';
	var special_namings = ['Sepuluh ', 'Sebelas ', 'Seratus ', 'Seribu '];

	var values = input.toString().split('.');
	var digits = values[0].split('');

	if(digits[0] == '-'){
		digits.shift();
		output += 'Negatif ';
	}

	for (var i = 0; i < digits.length; i++) {

		if((digits.length - 1 - i) % 3 == 2){ //hundreds
			
			if(parseInt(digits[i]) == 0){
				continue;
			}else if(parseInt(digits[i]) == 1){ //#1
				output += special_namings[2];
			}else{
				output += numbers[parseInt(digits[i])] + small_units[1];
			}
			
		}else if((digits.length - 1 - i) % 3 == 1){ //tens
			
			if(parseInt(digits[i]) == 0){
				continue;
			}else if(parseInt(digits[i]) == 1){ //#2
				
				if(parseInt(digits[i+1]) == 0){ //#2.a
					output += special_namings[0];
				}else if(parseInt(digits[i+1]) == 1){ //#2.b
					output += special_namings[1];
				}else{ //#2.c
					output += numbers[parseInt(digits[i+1])] + special_unit;
				}

			}else{
				output += numbers[parseInt(digits[i])] + small_units[0];
			}
			
		}else{ //units

			if(digits.length - 1 != i){ //#3			
				
				if((parseInt(digits[i]) == 1 && i == 0 && digits.length == 4) 
				|| (parseInt(digits[i]) == 1 && parseInt(digits[i-1]) == 0 && parseInt(digits[i-2]) == 0 && digits.length - i == 4) ){ //#4
					output += special_namings[3];
				}else if(parseInt(digits[i]) != 0 && parseInt(digits[i-1]) != 1){
					output += numbers[parseInt(digits[i])] + units[((digits.length - 1 - i)/3)-1];
				}else if(parseInt(digits[i-2]) != 0){
					output += units[((digits.length - 1 - i)/3)-1];
				}
				
			}
			else if(digits.length - 1 == i){
				if((parseInt(digits[i]) == 0 && output != '') || parseInt(digits[i-1]) == 1){
					continue;
				}else{
					output += numbers[parseInt(digits[i])];
				}
	
			}
		}

	}

	if(value[1] != null){
		var decimals = value[1].split('');
		output += ' Koma '
		for (var i = 0; i < decimals.length; i++) {
			output += numbers[parseInt(decimals[i])] +' '; //#5
		}	
	}
	

return output;
}
