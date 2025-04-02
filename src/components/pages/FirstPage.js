import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from '../searchForm/SearchForm';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const FirstPage = () => {
	const [selectedChar, setChar] = useState(null);

	const onCharSelected = (id) => {
		setChar(id);
	}
	return(
		<>
			<Helmet>
				<meta
					name="description"
					content="Marvel information portal"/>
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar/>
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected}/>
				</ErrorBoundary>

				<aside className="char__aside">
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>

					<ErrorBoundary>
						<SearchForm/>
					</ErrorBoundary>
				</aside>

			</div>
			<img className="bg-decoration" 
				src={decoration} 
				alt="vision"/>
		</>
	)
}

export default FirstPage;