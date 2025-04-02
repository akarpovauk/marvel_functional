import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

	const [charList, setCharList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	// const [offset, setOffset] = useState(210);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);
	const [pageEnded, setPageEnded] = useState(false);

	const {loading, error, getAllCharacters} = useMarvelService();


	useEffect(() => {
		pageScrollToTop();
		onRequest(offset, true);
		setTimeout(() => {
			window.addEventListener('scroll', onScroll);
		}, 150);
	}, [])

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.onScroll);
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state.pageEnded && (this.state.pageEnded !== prevState.pageEnded)) {
	// 		this.onRequest(this.state.offset);
	// 	}
	// }

	useEffect(() => {
		if (pageEnded) {
			onRequest(offset);
		}
	}, [pageEnded])

    const pageScrollToTop =() => {
		setTimeout(() => { 
			window.scroll({ top: -1, left: 0 });
		}, 100);
	}

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	const onScroll = () => {
		const height = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		const scroll =  window.scrollY;
		if (charEnded) {
			window.removeEventListener('scroll', onScroll);
		}
		if (scroll + clientHeight >= height - 5) {
			setPageEnded(true);
		}
	}

	const onCharListLoaded = async (newCharList) => {

		let ended = false;
		if(newCharList.length < 9) {
			ended = true;
		}
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
		for (let char of newCharList) {
            await delay(1000);
            setCharList(charList => [...charList, char]);
        }

		// setCharList(charList => [...charList, ...newCharList ]);
		setNewItemsLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
		setPageEnded(false);
	}

	// console.log('render');
	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		try {
			itemRefs.current.forEach(item => {
				item.classList.remove('char__item_selected');
			})
		} catch {}
		itemRefs.current[id].classList.add('char__item_selected')
		itemRefs.current[id].focus();
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = {'objectFit' : 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'unset'};
			} else if (item.thumbnail.indexOf('.gif') > -1) {
				imgStyle = {'objectFit' : 'contain'};
			}
			
			return (
				<CSSTransition key = {item.id} classNames='char__item' timeout={500}>
					<li className='char__item'
						ref = {el => itemRefs.current[i] = el}
						tabIndex='0'
						onClick={() => {
							props.onCharSelected(item.id);
							focusOnItem(i);
						}}
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
							}
							if (e.key === "Enter" || e.key === ' ') {
								props.onCharSelected(item.id);
								focusOnItem(i);
							}
						}}>
						<img src={item.thumbnail} 
							alt={item.name}
							style = {imgStyle}
						/>
						<div className="char__name">{item.name}</div>
					</li>
				</CSSTransition>
			)
		});

		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>
			</ul>
		)
	}


	const items = renderItems(charList);
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemsLoading ? <Spinner/> : null;
	// const content = !(loading || error) ? items : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{/* {content} */}
			{items}
			<button 
				className="button button__main button__long"
				disabled={newItemsLoading}
				style={{'display': charEnded? "none" : "block"}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)

}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;
