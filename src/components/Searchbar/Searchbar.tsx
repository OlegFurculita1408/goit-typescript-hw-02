import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';


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
            toast.error('Please enter a value to search!', { position: 'top-left' });
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