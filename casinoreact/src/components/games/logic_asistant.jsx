export const to_val = (string) => {
	switch (string) {
		case "one":
			return 1;
		case "five":
			return 5;
		case "ten":
			return 10;
		case "twentyfive":
			return 25;
		case "fifty":
			return 50;
		case "hundred":
			return 100;
		case "twohundred":
			return 200;
		case "fivehundred":
			return 500;
		case "thousand":
			return 1000;
		default:
			return string;
	}
};

export const to_string = (number) => {
	switch (number) {
		case "1":
			return "one";
		case "5":
			return "five";
		case "10":
			return "ten";
		case "25":
			return "twentyfive";
		case "50":
			return "fifty";
		case "100":
			return "hundred";
		case "200":
			return "twohundred";
		case "500":
			return "fivehundred";
		case "1000":
			return "thousand";
		default:
			return number;
	}
};

export const to_val_dict = (dict) => {
	let new_dict = {};

	for (let key in dict) new_dict[to_val(key)] = dict[key];

	return new_dict;
};

export const to_string_dict = (dict) => {
	let new_dict = {};

	for (let key in dict) new_dict[to_string(key)] = dict[key];

	return new_dict;
};

export const dif_dict = (dict_A, dict_B) => {
	let result = dict_A;

	let stringified = to_string_dict(dict_B);

	for (let key in stringified) {
		if (key in result) result[key] -= stringified[key];
		else result[key] = -stringified[key];
	}

	console.log(dict_A, stringified, result);

	return result;
};

export const value = (chip_cost) => {
	value = {
		raw: 0,
		compound: chip_cost,
	};

	for (let key in chip_cost) value.raw += key * chip_cost[key];

	return value;
};

export const balance_difference = (balance, difference) => {
	let formated_balance = to_val_dict(balance);

	for (let [value, amount] of Object.entries(difference))
		if (value in formated_balance) {
			if (amount > formated_balance[value]) return false;
		} else return false;
	return true;
};

export const do_bet_if_possible = (balance, cost, callback) => {
	if (balance_difference(balance, cost)) callback();
};
