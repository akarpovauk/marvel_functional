import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';


import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);
	const [pageEnded, setPageEnded] = useState(false);

	const {loading, error, getAllComics} = useMarvelService();

	useEffect(() => {
		pageScrollToTop();
		onRequest(offset, true);
		setTimeout(() => {
			window.addEventListener('scroll', onScroll);
		}, 150);
	}, []);

	useEffect(() => {
		if (pageEnded) {
			onRequest(offset);
		}
	}, [pageEnded]);

	const pageScrollToTop =() => {
		setTimeout(() => { 
			window.scroll({ top: -1, left: 0 });
		}, 100);
	}

	const onScroll = () => {
		const height = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const scroll =  window.scrollY;
		if (comicsEnded) {
			window.removeEventListener('scroll', onScroll);
		}
		if (scroll + clientHeight >= height - 5) {
			setPageEnded(true);
		}
	}

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if(newComicsList.length < 8) {
			ended = true;
		}

		setComicsList(comicsList => [...comicsList, ...newComicsList ]);
		setNewItemsLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(ended);
		setPageEnded(false);
	}

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li 
					className='comics__item'
					key = {i}
					tabIndex='0'>
					<a href="#">
						<img src={item.thumbnail} 
							alt={item.title}
							className="comics__item-img"/>
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</a>
				</li>
			)
		});

		return (
			<ul className="comics__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {/* <ul className="comics__grid">
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
            </ul> */}
			{errorMessage}
			{spinner}
			{items}
            <button className="button button__main button__long"
					disabled={newItemsLoading}
					style={{'display': comicsEnded? "none" : "block"}}
					onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;