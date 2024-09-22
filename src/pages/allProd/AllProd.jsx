import React, { useEffect, useState, useMemo, useCallback } from 'react'; // Added useMemo and useCallback for optimization
import style from './all.module.css';
import ReactFlagsSelect from 'react-flags-select';
import Blogger from '../../component/Blogger';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, fetchFilteredBlogs, getFilterBlogger } from '../../redux/slices/Bloggers';

function AllProd() {
    const location = useLocation();
    const comingCategory = location.state;

    // Moved constants and state initialization to the top for readability
    const categories = ['Food', 'Islamic', 'Tech', 'Fashion'];
    const Age = ['10', '20', '30', '40', '50'];

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCateg, setSelectedCateg] = useState(comingCategory || null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [range, setRange] = useState([10, 100]); // Not currently used, consider removing or using it
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();
    const { blogs, loading, size } = useSelector((state) => state.Bloggers);
    const FilterBloggers = useSelector(getFilterBlogger);

    // Memoizing data for improved performance (only recalculated if FilterBloggers or blogs change)
    const bloggersToDisplay = useMemo(() => {
        return Array.isArray(FilterBloggers) && FilterBloggers.length > 0
            ? FilterBloggers
            : blogs?.content || [];
    }, [FilterBloggers, blogs]);

    const totalPages = useMemo(() => {
        return Array.isArray(FilterBloggers) && FilterBloggers.length > 0
            ? Math.ceil(FilterBloggers.length / size)
            : blogs?.totalPages;
    }, [FilterBloggers, blogs, size]);

    // Memoized filter change handler to prevent re-creating function on every render
    const handleFilterChange = useCallback(() => {
        dispatch(fetchFilteredBlogs({
            category: selectedCateg,
            country: selectedCountry,
            type: selectedGender,
            age: selectedAge,
        }));
    }, [dispatch, selectedCateg, selectedCountry, selectedGender, selectedAge]);

    // useEffect for fetching blogs and filtered blogs
    useEffect(() => {
        if (comingCategory) {
            dispatch(fetchFilteredBlogs({ category: comingCategory }));
        } else {
            dispatch(fetchBlogs({ page: currentPage, size }));
        }
    }, [dispatch, comingCategory, currentPage, size]);

    // Trigger filter changes only when selected filter states change
    useEffect(() => {
        handleFilterChange();
    }, [selectedCountry, selectedCateg, selectedGender, selectedAge, handleFilterChange]);

    // Memoized functions for toggling filters to avoid unnecessary re-renders
    const toggleCategory = useCallback((category) => {
        setSelectedCateg(prev => prev === category ? null : category);
    }, []);

    const toggleCountry = useCallback((code) => {
        setSelectedCountry(prev => prev === code ? "" : code);
    }, []);

    const toggleGender = useCallback((gender) => {
        setSelectedGender(prev => prev === gender ? null : gender);
    }, []);

    const toggleAge = useCallback((age) => {
        setSelectedAge(prev => prev === age ? null : age);
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };

    return (
        <div className='container'>
            <div className="my-3">
                <h4>All Bloggers {selectedCateg ? ` / ${selectedCateg}` : ''}</h4>
            </div>
            <div className="row my-5">
                <div className="col-12 col-md-3">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className='fw-bold fs-4 fst-italic'>Filter</p>
                        {bloggersToDisplay.length === 0 && (
                            <div className="alert alert-danger" role="alert">
                                No Filtered data
                            </div>
                        )}
                    </div>
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        {/* Accordion for filters */}
                        <div>
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Country
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ReactFlagsSelect
                                        className={style.flag}
                                        selected={selectedCountry}
                                        onSelect={toggleCountry}
                                        countries={["EG", "AE", "SA"]}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Gender Filter */}
                        <div>
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Gender
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-column gap-3">
                                    <div
                                        className={`${style.gender} ${selectedGender === 'male' ? style.selectedGender : ''}`}
                                        onClick={() => toggleGender('male')}
                                    >
                                        Male
                                    </div>
                                    <div
                                        className={`${style.gender} ${selectedGender === 'female' ? style.selectedGender : ''}`}
                                        onClick={() => toggleGender('female')}
                                    >
                                        Female
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Age Filter */}
                        <div>
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Age
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    {Age.map((age) => (
                                        <button
                                            key={age}
                                            className={`${style.button} ${selectedAge === age ? style.selectedSpecial : ''}`}
                                            onClick={() => toggleAge(age)}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Specialization Filter */}
                        <div>
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Specialization
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={`${style.button} ${selectedCateg === category ? style.selectedSpecial : ''}`}
                                            onClick={() => toggleCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bloggers List */}
                <div className="col-12 col-md-9 d-flex flex-column gap-3">
                    {bloggersToDisplay.length > 0 ? (
                        <>
                            <div className="row row-gap-3 p-2">
                                {bloggersToDisplay?.map((blog, index) => (
                                    <div key={index} className="col-12 col-sm-6 col-md-4">
                                        <Blogger
                                            name={blog.name}
                                            price={blog.instagramFollowers}
                                            instaLink={blog.instagramUrl}
                                            TikLink={blog.tiktokUrl}
                                            YouLink={blog.youtubeUrl}
                                            img={blog.image}
                                            id={blog.id}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage + 1}
                                        onChange={handlePageChange}
                                        showFirstButton
                                        showLastButton
                                        variant="outlined"
                                        shape="rounded"
                                        color="primary"
                                        style={{ margin: '1rem auto' }}
                                    />
                                </Stack>
                            </div>
                        </>
                    ) : (
                        <div>No Bloggers Available</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllProd;
