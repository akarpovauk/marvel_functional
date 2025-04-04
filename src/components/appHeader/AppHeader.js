import {Link, NavLink} from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
	const isActive = ({isActive})=> ({color: isActive? '#9f0013': 'inherit' });
	
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/characters'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
						<NavLink 
							// end
							style={isActive}
							to='/characters'>Characters</NavLink>
					</li>
                    /
                    <li>
						<NavLink  
							style={isActive}
							to='/comics'>Comics</NavLink>
					</li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;