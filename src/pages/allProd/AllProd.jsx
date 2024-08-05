import React, { useState } from 'react'
import style from './all.module.css';
import ReactFlagsSelect from 'react-flags-select';
import Slider from '@mui/material/Slider';
import Blogger from '../../component/Blogger';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function AllProd() {
    const [selected, setSelected] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCateg, setSelectedCateg] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const categories = ['Food', 'Travel', 'Fitness', 'Fashion'];
    const Age = ['10', '20', '30', '40', '50'];
    const [range, setRange] = useState([10, 100]);

    const handleSliderChange = (event, newValue) => {
        setRange(newValue);
    };
    return (
        <div className='container'>
            <div className="my-3">
                <h4>All Bloggers</h4>
            </div>
            <div className="row my-5">
                <div className="col-12 col-md-3 ">
                    <p className='fw-bold fs-4 fst-italic'>Filter</p>
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Country
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ReactFlagsSelect
                                        className={style.flag}
                                        selected={selected}
                                        onSelect={(code) => setSelected(code)}
                                        countries={["EG", "AE", "SA"]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Gender
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-column gap-3">
                                    <div
                                        className={`${style.gender} ${selectedGender === 'male' ? style.selectedGender : ''}`}
                                        selected={selectedGender === 'male'}
                                        onClick={() => setSelectedGender('male')}
                                    >
                                        male
                                    </div>
                                    <div
                                        className={`${style.gender} ${selectedGender === 'female' ? style.selectedGender : ''}`}
                                        selected={selectedGender === 'female'}
                                        onClick={() => setSelectedGender('female')}
                                    >
                                        female
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Age
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    {Age.map((age) => (
                                        <button
                                            key={age}
                                            className={`${style.button} ${selectedAge === age ? style.selectedSpecial : ''}`}
                                            onClick={() => setSelectedAge(age)}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Price
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
                        <div className="">
                            <h2 className="accordion-header">
                                <button className={`${style.accBtn} accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Specialization
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body d-flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={`${style.button} ${selectedCateg === category ? style.selectedSpecial : ''}`}
                                            onClick={() => setSelectedCateg(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-9 d-flex flex-column gap-3">
                    <div className="d-flex flex-column flex-md-row w-100 justify-content-end align-items-center row-gap-3 gap-4">
                        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                            <p className="m-0 fs-5">Sort</p>
                            <select className="form-select p-2" aria-label="Default select example" id={style.select} >
                                <option selected value={' '}>Default</option>
                                <option value={'-recommend'}>recommend low to high</option>
                                <option value={'recommend'}>recommend high to low</option>
                            </select>
                        </div>
                        <div className={style.input_wrapper}>
                            <button className={style.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#fff" d="M22 22L20 20" />
                                </svg>
                            </button>
                            <input placeholder="search.." className={style.input} name="text" type="text" />
                        </div>
                    </div>
                    <div className="row row-gap-3 p-2">
                        {[1, 2, 3, 4, 6, 5, 7].map((x) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4">
                                    <Blogger />
                                </div>
                            )
                        })}
                    </div>
                    <div className="row">
                        <Stack spacing={2}>
                            <Pagination
                                count={10}
                                page={1}
                                // onChange={handlePageChange}
                                showFirstButton
                                showLastButton
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                                style={{ margin: '1rem auto' }}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProd