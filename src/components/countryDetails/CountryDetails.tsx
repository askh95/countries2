import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import spinnerIcon from "../../assets/icons/spinner.svg";
import { fetchCountryByName } from "../../api/api";
import { Country } from "../../shared/interfaces/types";

const CountryDetails = () => {
	const { name } = useParams();

	const [country, setCountry] = useState<Country | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCountry = async () => {
			try {
				if (name) {
					const data = await fetchCountryByName(name);
					setCountry(data);
					setLoading(false);
				}
			} catch (err) {
				setError("Не удалось загрузить информацию о стране");
				setLoading(false);
			}
		};

		loadCountry();
	}, [name]);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen">
				<img
					src={spinnerIcon}
					alt="Загрузка"
					className="w-12 h-12 animate-spin"
				/>
			</div>
		);
	if (error) return <div className="text-center text-red-500">{error}</div>;
	if (!country)
		return <div className="text-center text-mainColor">Страна не найдена</div>;

	return (
		<div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
			<Link to="/" className="text-mainColor hover:underline mb-4 block">
				&larr; Назад к списку
			</Link>
			<img
				src={country.flags.svg || ""}
				alt={country.flags.alt || "Не указано"}
				className="w-full h-auto mb-4 rounded-lg shadow"
			/>
			<h1 className="text-3xl font-bold mb-4 text-mainColor">
				{country.name.official || "Не указано"}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<p className="mb-2">
					<strong className="text-mainColor">Общее название:</strong>{" "}
					{country.name.common || "Не указано"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Столица:</strong>{" "}
					{country.capital?.[0] || "Не указана"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Население:</strong>{" "}
					{country.population.toLocaleString() || "Не указано"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Регион:</strong>{" "}
					{country.region || "Не указан"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Субрегион:</strong>{" "}
					{country.subregion || "Не указан"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Языки:</strong>{" "}
					{Object.values(country.languages).join(", ") || "Не указано"}
				</p>
				<p className="mb-2">
					<strong className="text-mainColor">Валюты:</strong>{" "}
					{Object.values(country.currencies)
						.map(
							(currency) =>
								`${currency.name} (${currency.symbol})` || "Не указано"
						)
						.join(", ")}
				</p>
			</div>
		</div>
	);
};

export default CountryDetails;
