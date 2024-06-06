const Account = () => {

    return (
        <>

            <div className="container-fluid profile-banner">
                <h2 className="text-center size">My Account</h2>
            </div>

            <section style={{ backgroundColor: "#F3F3F3" }}>

                <div className="container">
                    <div className="d-flex justify-content-start py-5" style={{gap:"50px"}} >
                        <div className="col-md-6">
                            <h2 className="fs-2 text p-4">Login</h2>
                            <div className="login-box">
                                <form>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Username or Email address *</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">Remember me</label>
                                    </div>
                                    
                            <button type="submit" className="btn btn-primary">Log in</button>
                            <div className="col-md-6 d-flex justify-content-center">
                            <a href="#!">Forgot password?</a></div>
                        </form>
                    </div>
                </div>


                <div className="col-md-6">

                    <h2 className="fs-2 text p-4">Register</h2>
                    <div className="login-box" >
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <p className="pb-2" style={{fontSize:"14px"}}>Your personal data will be used to support your experience throughout this website, to manage
                                access to your account, and for other purposes described in our <a href="#" style={{color:"#ff6702"}}>privacy policy.</a> </p>

                            <button type="submit" className="btn btn-primary">Log in</button>
                        </form>
                    </div>

                </div>
            </div>
        </div >
            </section >
        </>
    )

}
export default Account; 