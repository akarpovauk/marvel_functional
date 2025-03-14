
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { FirstPage, ComicsPage } from "../pages";


const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>	
					<Routes>
						<Route path="/" element={<FirstPage/>} />
						<Route path="/comics" element={<ComicsPage/>} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App;