import React, { useEffect, useState } from 'react';
import Search from '../Atoms/Search';
import Button from '../Atoms/Button';
import { TEXT } from '../Constant/TextConstant';
import { useRecipeContext } from '../Context/AppContext';
import './ComponentStyle.scss'

const Header = () => {
    const { handleNewRecipe, handleSearchInput } = useRecipeContext();
    const [headerBackground, setHeaderground] = useState(false)



    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 10
            if (show) {
                setHeaderground(true)
            } else {
                setHeaderground(false)
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={headerBackground ? 'scroll-header' : 'header'}>
            <h1 className={'heading'}>{TEXT.HEADING}</h1>
            <Search
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder={TEXT.SEARCH_INPUT_PLACEHOLDER}
            />
            <Button
                title={TEXT.BUTTON_TEXT} handleClick={handleNewRecipe} />

        </header>
    );
};


export default Header;
