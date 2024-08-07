import { useEffect, useState } from "react";

import spinnerIcon from "../../assets/icons/spinner.svg";

import { Link } from "react-router-dom";
import { Country } from "../../shared/interfaces/types";
import { fetchCountries } from "../../api/api";

const CountryList = () => {
	const [countries, setCountries] = useState<Country[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCountries = async () => {
			try {
				const data = await fetchCountries();
				setCountries(data);
				setLoading(false);
			} catch (err) {
				setError("Не удалось загрузить список стран");
				setLoading(false);
			}
		};

		loadCountries();
	}, []);

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

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{countries.map((country) => (
				<Link
					key={country.name.common}
					to={`/country/${country.name.common}`}
					className="block p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white"
				>
					<img
						src={country.flags.png}
						alt={country.flags.alt}
						className="w-full h-40 object-cover mb-2 rounded"
					/>
					<h2 className="text-xl font-bold text-mainColor">
						{country.name.common}
					</h2>
					<p className="text-gray-600">
						Столица: {country.capital?.[0] || "Не указана"}
					</p>
				</Link>
			))}
		</div>
	);
};

export default CountryList;
