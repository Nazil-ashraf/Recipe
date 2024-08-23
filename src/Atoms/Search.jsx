
import SearchIcon from '../Assets/Icon/search.png';
import './atomStyle.scss';


const Search = ({ onChange, placeholder }) => {
    return (
        <div className='search-container'>

            <input
                type="text"
                placeholder={placeholder}
                className='search-container--input'
                onChange={onChange}
            />
            <img
                src={SearchIcon}
                alt="Search Icon"
                height="20px"
                width="20px"
                className='search-container--icon'
            />
        </div>
    );
};



export default Search;
