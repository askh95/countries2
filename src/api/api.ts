import { Country } from "../shared/interfaces/types";

const BASE_URL = "https://restcountries.com/v3.1";

export const fetchCountries = async (): Promise<Country[]> => {
	const response = await fetch(`${BASE_URL}/all`);
	if (!response.ok) {
		throw new Error("Failed to fetch countries");
	}
	return response.json();
};

export const fetchCountryByName = async (name: string): Promise<Country> => {
	const response = await fetch(`${BASE_URL}/name/${name}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch country: ${name}`);
	}
	const data = await response.json();
	return data[0];
};
