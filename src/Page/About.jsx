import whyChooseUsImg from "../assets/new.png";
import hat from "../assets/Mask group.png";
import about from "../assets/about.png";

const About = () => {

    return (
        <>
            <div className="container-fluid about-banner">
                <h2 className="text-center size">About us</h2>
            </div>


            <section style={{ backgroundColor: "#f3f3f3" }}>
                <div>
                    <div
                        className="container mx-auto py-32 px-10 lg:px-0 hidden lg:block">

                        <h2 className="text-center text-2xl lg:text-6xl font-bold mb-10 lg:mb-32">
                            REASONS TO BUY WITH US
                        </h2>
                        <div
                            className="grid grid-cols-3 gap-y-5">
                            <div>
                                <h3 className="text-4xl font-bold">01</h3>
                                <h3 className="text-2xl font-bold mb-5">High quality</h3>
                                <p className="text-lg w-[60%] leading-9">
                                    Drakon Sports Apparel assures quality materials with breathable
                                    and skin-friendly fabrics.
                                </p>
                            </div>
                            <div className="w-[400px] h-[400px] lg-w-full lg:h-full lg:p-10 border-2 border-gray-400 rounded-[50%] flex justify-center items-center">
                                <img
                                    src={hat}
                                    alt=""
                                    className="rounded-[50%] p-10 border-2 border-gray-400 object-cover"
                                />
                            </div>
                            <div className=" ml-32">
                                <h3 className="text-4xl font-bold">03</h3>
                                <h3 className="text-2xl font-bold mb-5">MONEY BACK GUARANTEE</h3>
                                <p className="text-lg w-[90%] leading-9">
                                    We assure you a money-back guarantee if our products do not match
                                    your expectations.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold">02</h3>
                                <h3 className="text-2xl font-bold mb-5">FREE SHIPPING</h3>
                                <p className="text-lg w-[60%] leading-9">
                                    Enjoy free shipping on your orders across the United States. Terms
                                    and conditions applied.
                                </p>
                            </div>
                            <div></div>
                            <div className=" ml-32">
                                <h3 className="text-4xl font-bold">04</h3>
                                <h3 className="text-2xl font-bold mb-5">PROFESSIONAL SUPPORT</h3>
                                <p className="text-lg w-[90%] leading-9">
                                    Have questions and complaints regarding your orders? Reach out to
                                    our customer support team.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="container mx-auto py-32 px-10 lg:px-0 lg:hidden">


                        <h2 className="text-center text-5xl lg:text-6xl font-bold mb-10 lg:mb-32">
                            Why Choose Us
                        </h2>
                        <div className="grid  gap-y-5">
                            <div className="w-[400px] h-[400px] lg-w-full lg:h-full lg:p-10 border-2 border-gray-400 rounded-[50%] flex justify-center items-center">
                                <img
                                    src={whyChooseUsImg}
                                    alt=""
                                    className="rounded-[50%] p-10 border-2 border-gray-400 object-cover"
                                />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", alignContent: 'center' }} className="mt-[70px]  justify-center mb-[25px]">
                                <h3 className="text-4xl  font-bold">01</h3>
                                <h3 className="text-2xl font-bold mb-5">High quality</h3>
                                <p className="text-lg w-[60%] leading-9 text-center">
                                    Drakon Sports Apparel assures quality materials with breathable
                                    and skin-friendly fabrics.
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", alignContent: 'center' }} className="mb-[25px]">
                                <h3 className="text-4xl font-bold">02</h3>
                                <h3 className="text-2xl font-bold mb-5">FREE SHIPPING</h3>
                                <p className="text-lg w-[60%] leading-9 text-center">
                                    Enjoy free shipping on your orders across the United States. Terms
                                    and conditions applied.
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", alignContent: 'center' }} className="mb-[25px] ">
                                <h3 className="text-4xl font-bold">03</h3>
                                <h3 className="text-2xl font-bold mb-5">MONEY BACK GUARANTEE</h3>
                                <p className="text-lg w-[90%] leading-9 text-center">
                                    We assure you a money-back guarantee if our products do not match
                                    your expectations.
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center", alignContent: 'center' }} className="mb-[25px]">
                                <h3 className="text-4xl font-bold">04</h3>
                                <h3 className="text-2xl font-bold mb-5">PROFESSIONAL SUPPORT</h3>
                                <p className="text-lg w-[90%] leading-9 text-center">
                                    Have questions and complaints regarding your orders? Reach out to
                                    our customer support team.
                                </p>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

            <section>
                <div className="container">
                    <div className="row py-4">
                        <div className="col-md-6">
                            <h5 className="">OUR HISTORY</h5>
                            <h2 className="fs-1 text py-3 fw-bold" style={{color:"#f5743b"}}>HOW IT WAS</h2>
                            <p className="my-3" style={{lineHeight:"35px"}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                Ut wisi enim ad minim veniam, quis nostrud .
                                <br></br>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna. .
                                </p>
                                <button type="btn" className="orange">Learn more</button>

                        </div>
                        <div className="col-md-6">
                        <img src={about}></img>
                        </div>


                    </div>

                </div>


            </section>





        </>
    )
}
export default About;