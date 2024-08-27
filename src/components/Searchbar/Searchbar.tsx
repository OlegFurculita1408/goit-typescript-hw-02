import React, { useState, ChangeEvent, FormEvent } from "react";
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

// const SearchBar = ({onSubmit}) => {
//     const [searchQuery, setSearchQuery] = useState('')


//     const handleChange = (e) => {
//         setSearchQuery(e.currentTarget.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (searchQuery.trim() === '') {
//             toast.error('please enter a value to search!', {position: toast.POSITION.TOP_LEFT});
//             return
//         }
//         onSubmit(searchQuery)
//         setSearchQuery('')
//     }
        
//         return(
//             <header className={css.Searchbar}>
//                 <form className={css.SearchForm} onSubmit={handleSubmit}>
//                     <button type="submit" className={css.SearchFormButton}>
//                     <span className={css.SearchFormButtonLabel}>Search</span>
//                     </button>
//                     <input
//                     className={css.SearchFormInput}
//                     onChange={handleChange}
//                     value={searchQuery}
//                     type="text"
//                     // autocomplete="off"
//                     // autofocus
//                     placeholder="Search images and photos"
//                     />
//                 </form>
//             </header>
//         )

// }
// SearchBar.propTypes = {
//     onSubmit: PropTypes.func,
// }
// export default SearchBar

interface SearchBarProps {
    onSubmit: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            toast.error('Please enter a value to search!', { position: toast.POSITION.TOP_LEFT });
            return;
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    };

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                    className={css.SearchFormInput}
                    onChange={handleChange}
                    value={searchQuery}
                    type="text"
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};
export default SearchBar;