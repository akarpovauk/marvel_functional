import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {loading, request, error, clearError} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apikey = 'apikey=10877f709e567804be49abd6a4c6cbcd';
	const _baseOffset = 210;

	const getAllCharacters = async(offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`
		);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res =  await request(
			`${_apiBase}characters/${id}?${_apikey}`
		);
		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = (char) => {
		// let str = char.description;
		// if (str.length > 100) {
		// 	str = str.slice(0, 220)+"...";
		// }
		// if (str.length === 0) {
		// 	str = 'Description is not available for this character'
		// }
		return {
			id: char.id,
			name: char.name,
			description: char.description ? char.description.length > 200 ? char.description.slice (0, 200) +"..." :  char.description:  'Description is not available for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
	return {loading, error, getAllCharacters, getCharacter, clearError}
}

// all
// https://gateway.marvel.com:443/v1/public/characters?apikey=10877f709e567804be49abd6a4c6cbcd

//limit 9 offset 210
// https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=10877f709e567804be49abd6a4c6cbcd


export default useMarvelService;