import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import CountryList from "../countryList/CountryList";
import CountryDetails from "../countryDetails/CountryDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <div>Error 404</div>,
		children: [
			{
				path: "/",
				element: <CountryList />,
			},
			{
				path: "/country/:name",
				element: <CountryDetails />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

function Root() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-center mb-8 text-mainColor">
				Страны мира
			</h1>
			<Outlet />
		</div>
	);
}

export default App;
