
import pad2 from "../assets/pad2.png"
const Product = () => {


    return (
        <>
        <section>
            <div className="container-fliud">
                <div className="row">
                    <div className="col-md-3">
                        <div className="sidebar p-3 bg-light">

                            <div className="mb-3">
                                <label for="searchBox" className="form-label">Search</label>
                                <input type="text" className="form-control" id="searchBox" placeholder="Search products..." />
                            </div>

                            <div className="mb-3">
                                <h5>Categories</h5>
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action">Electronics</a>
                                    <a href="#" className="list-group-item list-group-item-action">Fashion</a>
                                    <a href="#" className="list-group-item list-group-item-action">Home & Kitchen</a>
                                    <a href="#" className="list-group-item list-group-item-action">Books</a>
                                    <a href="#" className="list-group-item list-group-item-action">Sports</a>
                                </div>
                            </div>


                            <div className="mb-3">
                                <h5>Filter by Price</h5>
                                <label for="priceRange" className="form-label">Price range: <span id="priceRangeValue">0 - 100</span></label>
                                <input type="range" className="form-range" min="0" max="100" step="1" id="priceRange" oninput="updatePriceRangeValue()" />
                            </div>
                        </div>
</div>
                   

       
            <div className="col-md-9 my-5">
            <div class="row ">
       
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title ">Wireless Headphones</h5>
                        <p class="card-text">$99.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span>
                        </p>
                    </div>
                </div>
            </div>
        
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Smartwatch</h5>
                        <p class="card-text">$199.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                        </p>
                    </div>
                </div>
            </div>
      
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Bluetooth Speaker</h5>
                        <p class="card-text">$49.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span>
                        </p>
                    </div>
                </div>
            </div>
       
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Laptop Stand</h5>
                        <p class="card-text"> $29.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span> 
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Smartphone</h5>
                        <p class="card-text">$699.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                        </p>
                    </div>
                </div>
            </div>
           
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Tablet</h5>
                        <p class="card-text">$399.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span>
                        </p>
                    </div>
                </div>
            </div>
           
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Camera</h5>
                        <p class="card-text">$299.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span> 
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Gaming Console</h5>
                        <p class="card-text">$499.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                        </p>
                    </div>
                </div>
            </div>
        
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Fitness Tracker</h5>
                        <p class="card-text">$149.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span>
                        </p>
                    </div>
                </div>
            </div>
          
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">E-Reader</h5>
                        <p class="card-text">$129.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span> 
                        </p>
                    </div>
                </div>
            </div>
        
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Drone</h5>
                        <p class="card-text"> $799.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐⭐</span>
                        </p>
                    </div>
                </div>
            </div>
         
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src={pad2}/>
                    <div class="card-body">
                        <h5 class="card-title">Smart Thermostat</h5>
                        <p class="card-text">$199.99</p>
                        <p class="card-text">
                            <span class="text-warning star">⭐⭐⭐⭐☆</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
      </div>
    </div>
</section>













        </>
    )

}
export default Product