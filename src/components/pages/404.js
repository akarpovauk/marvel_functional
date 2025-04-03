import ErrorMessage from "../errorMessage/errorMessage";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Page404 = () => {
	return (
		<div>
			<Helmet>
				<meta
					name="description"
					content="This page is not found"/>
				<title>This page is not found</title>
			</Helmet>
			<ErrorMessage/>
			<p style={{'textAlign': 'center',
						'fontWeight': 'bold',
						'fontSize': '50px'
			}}>404</p>
			<p style={{'textAlign': 'center',
						'fontWeight': 'bold',
						'fontSize': '24px',
						'marginBottom': '10px'
			}}>Page doesn't exist</p>
			<Link to='/'
				style={{'display': 'block',
						'textAlign': 'center',
						'fontWeight': 'bold',
						'fontSize': '24px',
						'color': 'blue'
			}}>Back to main page </Link>
		</div>
	)
}
export default Page404;