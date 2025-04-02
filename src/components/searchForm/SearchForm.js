import { useState } from 'react';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import './searchForm.scss';


const SearchForm = () => {
	const [char, setChar] = useState(null);
	const {loading, error, clearError, getCharacterByName} = useMarvelService();

	const onCharLoaded = (char) => {
		setChar(() => char);
	}

	const updateChar = (name) => {
		clearError();
		getCharacterByName(name)
			.then(onCharLoaded);
	}

	const errorMessage = error ? <div className='form__error'>
									<ErrorMessage/>
								</div> : null;
	const results = !char ? null : char.length > 0 ? 
		<div className='form__wrapper'>
			<div className='form__success'>
				There is! Visit {char[0].name} page?
			</div>
			<Link to={`/characters/${char[0].id}`}
				className="button button__secondary">
				<div className="inner">TO PAGE</div>
			</Link>
		</div> :
		<div className='form__error'>
			The character was not found. Check the name and try again
		</div>

	return (
		<Formik  
			initialValues = {{
				charName: ''
			}}
			validationSchema= {Yup.object({
				charName: Yup.string().required('This field is required')
			})}
			onSubmit={({charName}) => {
				updateChar(charName);
			}} >
			<Form 
				className='form'>
				<label className='form__header'>
					Or find a character by name:
				</label>
				<div className='form__wrapper'>
					<Field
						className='form__search'
						placeholder='Enter name'
						id="charName"
						name="charName"
						type='search'
					/>
					<button
						className="button button__main"
						type='submit'
						disabled = {loading}>
						<div className="inner">FIND</div>
					</button>
				</div>
				<FormikErrorMessage 
					className='form__error'
					name='charName'
					component='div'/>
				{errorMessage}
				{results}
			</Form>
		</Formik>
	)
}

export default SearchForm;