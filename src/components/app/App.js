import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";

const Page404 = lazy(() => import('../pages/404'));
const FirstPage = lazy(() => import('../pages/FirstPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>	
					<Suspense fallback={<Spinner/>}>
						<Routes>
							<Route path="/" element={<FirstPage/>} />
							<Route path="/comics" element={<ComicsPage/>} />
							<Route 
								path="/comics/:comicId" 
								element={<SingleComicPage/>} />
							<Route path="*" element={<Page404/>} />
						</Routes>
					</Suspense>
				</main>	
			</div>
		</Router>
	)
}

export default App;