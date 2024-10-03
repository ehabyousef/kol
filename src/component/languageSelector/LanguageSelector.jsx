import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { switchToEnglish, switchToArabic, getLanguage } from "../../redux/slices/language";
import style from './style.module.css';
import { MdLanguage } from "react-icons/md";

const langs = [
    { code: 'en', lang: 'English' },
    { code: 'ar', lang: 'Arabic' },
];

// Helper function to get the direction (LTR or RTL)
const getDirection = (lng) => {
    return lng === 'ar' ? 'rtl' : 'ltr';
};

export default function LanguageSelector() {
    const dispatch = useDispatch();
    const language = useSelector(getLanguage);

    // Function to handle language change
    const changeLanguage = (lng) => {
        if (lng === 'en') {
            dispatch(switchToEnglish());
        } else if (lng === 'ar') {
            dispatch(switchToArabic());
        }
    };

    // Use effect to update document direction based on selected language
    useEffect(() => {
        document.body.dir = getDirection(language);
    }, [language]);

    return (
        <>
            <label className={style.popup}>
                <input type="checkbox" />
                <div tabIndex={0} className={style.burger}>
                    <MdLanguage size={20} color='white' />
                </div>
                <nav className={style.popup_window}>
                    <ul>
                        {langs.map((x) => (
                            <li key={x.code}>
                                <button onClick={() => changeLanguage(x.code)}>
                                    <span>{x.lang}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </label>
        </>
    );
}
