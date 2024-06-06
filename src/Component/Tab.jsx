import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import product1 from "../assets/product1.png"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "auto" }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}>

                <Tab className='sidenav' label="Address"  {...a11yProps(0)} />
                <Tab className='sidenav' label="Profile" {...a11yProps(3)} />
                <Tab className='sidenav' label="Order" {...a11yProps(4)} />
                <Tab className='sidenav' label="account details"  {...a11yProps(5)} />
                <Tab className='sidenav' label="BILLING DETAILS" {...a11yProps(1)} />
                <Tab className='sidenav' label="Logout"  {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={1}>

                <div className="past-order" style={{ marginLeft: "170px" }} >
                    <div className="past-order-box" style={{ width: "500px" }}>

                        <form>
                            <div class="mb-3">
                                <label for="username" className="form-label fs-5 text">Username</label>
                                <input type="text" className="form-control" id="username" required />
                            </div>
                            <div class="mb-3">
                                <label for="name" className="form-label fs-5 text">Name</label>
                                <input type="text" className="form-control" id="name" required />
                            </div>
                            <div class="mb-3">
                                <label for="email" className="form-label  fs-5 text">Email</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div class="mb-3">
                                <label for="phone" className="form-label  fs-5 text">Phone Number</label>
                                <input type="tel" className="form-control" id="phone" required />
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                        </form>
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2}>

                <div className="past-order" style={{ marginLeft: "170px" }} >
                    <div className="past-order-box" style={{ width: "500px" }}>

                        <form>
                            <div class="mb-3">
                                <label for="email" className="form-label  fs-5 text">Email</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div class="mb-3">
                                <label for="postalCode" class="form-label">Postal Code</label>
                                <input type="text" class="form-control" id="postalCode" required />
                            </div>
                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" required/>
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                        </form>
                    </div>
                </div>

            </TabPanel>

            <TabPanel value={value} index={0}>
                <div className="past-order" style={{ marginLeft: "170px" }} >
                    <h2 className='fw-bold fs-2 text my-4'>Manage Address</h2>

                    <div className="address1" style={{ marginBottom: "40px" }}>
                        <span><i class="fa-solid fa-location-dot"></i> <h2>Home</h2> </span>
                        <p>5198 Commons Dr, Rocklin, CA 95677, USA</p>
                        <button className="address-btn" type="button">Edit</button>
                        <button className="address-btn" type="button">Delete</button>
                    </div>

                    <div className="address1">
                        <span><i class="fa-solid fa-location-dot"></i> <h2>Work</h2> </span>
                        <p>5198 Commons Dr, Rocklin, CA 95677, USA</p>
                        <button className="address-btn" type="button">Edit</button>
                        <button className="address-btn" type="button">Delete</button>
                    </div>


                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className="past-order" style={{ marginLeft: "170px" }} >
                    <h2 className="mb-4 fs-2 text">Account Details</h2>
                    <div className="past-order-box" style={{ width: "500px" }}>
                        <form>

                            <div class="mb-3">
                                <label for="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter your username" required />
                            </div>
                            <div class="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </TabPanel>
            <TabPanel value={value} index={4}>

                <div className="past-order" style={{ marginLeft: "170px" }} >
                    <h2 className='fs-1 text my-3' >Past Orders</h2>
                    <div className="past-order-box">
                        <div className="wrap">
                            <img src={product1}></img>
                            <div className="burger-text">
                                <p className='text-end pb-4'>Delivered on sat, mar 25, 2024 07:15 pm <i class="fa-solid fa-circle-check"></i></p>
                                <h3 className='fs-2 text fw-bold'>Full sleev Jacket</h3>
                                <br></br>
                                <span>order#14524156451268  sat, mar 22, 2024, 5:00 pm</span>
                                <br></br>

                                <button className="btn-1" type="button">view details</button>
                            </div>
                        </div>
                        <div className="order-history" style={{ marginTop: "20px" }}>
                            <b>Full sleev Jacket <sup>total paid $ 142</sup></b>
                        </div>
                        <div style={{ margin: "40px", display: "flex", gap: "40px" }}>
                            <button className="btn" type="button">Get HELP</button></div>
                        <div> <button className="btn-order" type="button">Show more  orders</button></div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>

        </Box>
    );
}