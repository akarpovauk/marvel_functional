import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo =(props) => {

	const [char, setChar] = useState(null);

	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [props.charId])

	const updateChar = () => {
		const {charId} = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(() => char);
	}

	const skeleton = char || loading || error ? null : <Skeleton/>;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error || !char) ? <View char = {char}/> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;
	let imgStyle = {
		'objectFit' : 'cover',
		'height': '100%'
	};
	if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = {'objectFit' : 'unset', 'height': '100%'};
	} else if (thumbnail.indexOf('.gif') > -1) {
		imgStyle = {'objectFit' : 'contain'};
	}

	let comicsSliced =  comics.length > 10 ? comics.slice(0, 10) : comics;
	
	return(
		<>
			<div className="char__basics">
				<img src={thumbnail} 
					alt={name} 
					style = {imgStyle}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comicsSliced.length > 0 ? null : 'Comics info is not available for this character'}
				{ comicsSliced.map((item, i) => {
					// let comicsId = (item.resourceURI.split('/').pop());
					return (
						<li key = {i} className="char__comics-item">
							{/* <Link to={`/comics/${comicsId}`}>
								{item.name}
							</Link> */}
							{item}
						</li>
					)
				})}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;