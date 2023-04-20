function Check_Cardno(cardno){
	var no_digit = cardno.length;
	var oddoeven = no_digit & 1;
	var sum = 0;
	
	if (cardno.substring(0, 1) != "3" && cardno.substring(0, 1) != "4" && cardno.substring(0, 1) != "5" && cardno.substring(0, 1) != "2") {
		return false;
	}
	
	for (var count = 0; count < no_digit; count++) {
		var digit = parseInt(cardno.charAt(count));
		if (!((count & 1) ^ oddoeven)) {
			digit *= 2;
			if (digit > 9)
				digit -= 9;
		}
		sum += digit;
	}
	
	if (sum % 10 != 0){
		return false;
	}
	return true;
}


