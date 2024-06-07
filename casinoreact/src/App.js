import React from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/index.js";
import Pages from "./pages/Pages.jsx";

const App = () => {

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
			/>
			<Layout>
				<Pages/>
			</Layout>
		</>
	);
}

export default App;
