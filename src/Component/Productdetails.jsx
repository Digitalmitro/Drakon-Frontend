import ReactStars from 'react-rating-stars-component';
import Payment from '../assets/method.png';

import product1 from "../assets/pad.png";
const Productdetails = () => {

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating);
    };
    return (
        <>
            <div className="container my-5">

                <div className="row">
                    <div className="col-6">
                        <img src={product1} />
                    </div>
                    <div className="col-6">
                        <div className="details">
                            <h3 className="fs-1 text fw-normal" >Elbow Guard</h3>
                            <h5 className="pb-4"><b>Category: Guard</b></h5>
                            <p className='fw-bold' style={{ color: "#61ce70" }} ><span style={{ fontSize: "30px", color: "#858484", fontWeight: "500" }}>$265.00</span> IN STOCK</p>
                        </div>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={30}
                            isHalf={true}
                            value={4}
                            color="#ccc"
                            activeColor="#ffd700" />

                        <div class="product-counter d-flex gap-3 py-4">
                            <button id="decrease">-</button>
                            <span id="count">1</span>
                            <button id="increase">+</button>

                            <div className='d-flex' style={{ gap: "25px" }}>
                                <button type="submit" className="btn btn-primary orange">Buy Now</button>

                                <button type="submit" className="btn btn-primary black">Add to whishlist</button>
                            </div>

                        </div>
                        <div className='method'>
                            <img src={Payment} style={{ zoom: "1.1" }} />
                        </div>


                    </div>
                </div>
            </div>

         <section>
            <nav>
                <div style={{ borderBottom: "1px solid #dee2e6" }}>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist" style={{ width: "90%", margin: "auto" }}>

                        <button className="nav-link active tabs-btn" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">DESCRIPTION</button>
                        <button className="nav-link tabs-btn2" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">REVIEWS</button>
                    </div>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent" style={{ width: "90%", margin: "auto", padding: "40px " }}>

                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <h2 className='fs-2 text'>DESCRIPTION</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar</p>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <h2 className='fs-2 text'>REVIEWS</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar</p>

                </div>

            </div>

     </section>









        </>


    )
}
export default Productdetails;