import React, { useEffect, useState, useCallback } from 'react';
import style from './all.module.css';
import Blogger from '../../component/Blogger';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredBlogs, filterLoading, getFilterBlogger } from '../../redux/slices/Bloggers';
import Slider from '@mui/material/Slider';

function AllProd() {
    const location = useLocation();
    const comingCategory = location.state;

    const categories = ['Food', 'Islamic', 'Tech', 'Fashion'];
    const Age = ['10', '20', '30', '40', '50'];

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCateg, setSelectedCateg] = useState(comingCategory || null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [range, setRange] = useState([0, 1000]);
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();
    const FilterBloggers = useSelector(getFilterBlogger);
    const loading = useSelector(filterLoading);
    console.log(loading)
    // Function to build dynamic query params
    const buildQueryParams = () => {
        const params = {};
        if (selectedCateg) params.category = selectedCateg;
        if (selectedCountry) params.country = selectedCountry;
        if (selectedGender) params.type = selectedGender;
        if (selectedAge) params.age = selectedAge;
        if (range[0] !== 0 || range[1] !== 1000) {
            params.lowerPrice = range[0];
            params.upperPrice = range[1];
        }
        params.page = currentPage;
        return params;
    };

    // Memoized filter change handler
    const handleFilterChange = useCallback(() => {
        const queryParams = buildQueryParams();
        dispatch(fetchFilteredBlogs(queryParams));
    }, [dispatch, selectedCateg, selectedCountry, selectedGender, selectedAge, range, currentPage]);

    // Trigger filter changes when selected filter states change
    useEffect(() => {
        handleFilterChange();
    }, [selectedCountry, selectedCateg, selectedGender, selectedAge, range, currentPage]);

    const handleSliderChange = (event, newValue) => {
        setRange(newValue);
    };

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
                <button className={`btn btn-primary ms-3 d-lg-none ${style.filterButton}`} style={{ width: 'fit-content' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    Filter
                </button>
                <div className="col-12 col-md-3 d-none d-lg-block">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <p className='fw-bold fs-4 fst-italic'>Filter</p>
                        {FilterBloggers?.length === 0 && (
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
                                <div className="accordion-body d-flex flex-wrap gap-2">
                                    {["EG", "AE", "SA"].map((countryCode) => (
                                        <button
                                            key={countryCode}
                                            className={`${style.button} ${selectedCountry === countryCode ? style.selectedSpecial : ''}`}
                                            onClick={() => toggleCountry(countryCode)}
                                        >
                                            {countryCode === 'EG' ? 'Egypt' : countryCode === 'AE' ? 'UAE' : 'Saudi'}
                                        </button>
                                    ))}
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
                            <div id="collapseTwo" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                            <div id="collapseThree" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-2">
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

                        {/* Price Filter */}
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Price
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    <div className={style.rangeValue}>${range[0]} — ${range[1]}</div>
                                    <Slider
                                        value={range}
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={200}
                                        className={style.range}
                                    />
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
                            <div id="collapseFive" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-2">
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
                <div className="col-12 col-lg-9  d-flex flex-column gap-3">
                    {FilterBloggers && FilterBloggers.length > 0 ? (
                        <>
                            <div className="row row-gap-3 p-2">
                                {FilterBloggers?.map((blog, index) => (
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
                                        count={FilterBloggers?.totalPages}
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
                    ) : (loading ?
                        <p>loading....</p>
                        :
                        <div>No Bloggers Available</div>
                    )}
                </div>
            </div>
            {/* Offcanvas */}
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: "300px" }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div>
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Country
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-2">
                                    {["EG", "AE", "SA"].map((countryCode) => (
                                        <button
                                            key={countryCode}
                                            className={`${style.button} ${selectedCountry === countryCode ? style.selectedSpecial : ''}`}
                                            onClick={() => toggleCountry(countryCode)}
                                        >
                                            {countryCode === 'EG' ? 'Egypt' : countryCode === 'AE' ? 'UAE' : 'Saudi'}
                                        </button>
                                    ))}
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
                            <div id="collapseTwo" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                            <div id="collapseThree" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-2">
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

                        {/* Price Filter */}
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Price
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    <div className={style.rangeValue}>${range[0]} — ${range[1]}</div>
                                    <Slider
                                        value={range}
                                        onChange={handleSliderChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={200}
                                        className={style.range}
                                    />
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
                            <div id="collapseFive" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-2">
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
            </div>
        </div>
    );
}

export default AllProd;
