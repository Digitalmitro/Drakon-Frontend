const Contact = () => {

    return (
        <>
            <div className="container-fluid contact-banner">
                <h2 className="text-center size">Contact</h2>
            </div>

            <section>
                <div className="container-fluid">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24232.082212780784!2d-74.28278459631291!3d40.60759690951231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1717064110358!5m2!1sen!2sin" width="100%" height="450" loading="lazy" ></iframe>
                </div>



                <div className="container my-5">
                    <div className="d-flex" style={{gap:"80px"}}> 
                        <div className="col-6 ms-1">
                            <h5 className="fs-6 text">Have a question? </h5>
                            <h3 className="fs-2 text pb-4 fw-bold">Send Message</h3>
                            <form>
                            <div className="d-flex" style={{gap:"20px"}}>
                            <input type="text" className="form-control" placeholder="Your Name"/>
                            <input type="email" className="form-control" placeholder="Your Email"/></div>
                           
                            <div className="py-4">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea></div>
                            
                            <button type="submit" className="btn btn-primary orange">Send message</button>
                            </form>
                        </div>

                        <div className="col-6">
                        <h5 className="fs-6 text pb-4">Address</h5>
                            <h3 className="fs-2 text pb-4 fw-bold">Find Us</h3>
                            <div style={{lineHeight:"40px"}}>
                            <p><span>Location:</span><br></br> 123, New Lenox Chicago, IL 60606</p>
                            <p><span>Email:</span><br></br> info@example.com</p>
                            <p><span>Phone:</span><br></br> 123-456-7890</p></div>
                        </div>




                    </div>
                </div>
            </section>











        </>
    )
}
export default Contact;