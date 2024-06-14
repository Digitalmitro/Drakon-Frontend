const Checkout = () => {
  return (
    <>
<div className="container  d-flex align-items-center justify-content-center m-5" style={{zoom: "1.1"}}>
    <div className="row w-100 px-3" style={{display:"flex" , gap:"7rem"}}>
        <div className="col-md-4">
            <h2 className="fs-2 text pb-3 ">SHIPPING ADDRESS</h2>
            <div className="login-box">
                <button type="btn" className="btn-add">
                    ADD ADDRESS
                </button>

                <div className="address-box">
                    <p>
                        <strong>SHIPPING ADDRESS :</strong> CICAGO, USA
                    </p>
                    <p>
                        <strong>ZIPCODE :</strong> 254153
                    </p>
                    <button type="btn" className="btn-select ">
                        SELECT ADDRESS
                    </button>
                </div>

                <div className="address-box">
                    <p>
                        <strong>SHIPPING ADDRESS :</strong> CICAGO, USA
                    </p>
                    <p>
                        <strong>ZIPCODE :</strong> 254153
                    </p>
                    <button type="btn" className="btn-select ">
                        SELECT ADDRESS
                    </button>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <h2 className="fs-2 text py-3">Your order</h2>

            <table className="table w-full mb-8">
                <thead>
                    <tr className="p-3 m-3">
                        <th scope="col" colspan="2" className="p-10 m-4 px-10 border-b-4 w-1/2">Product</th>
                        <th scope="col" className="p-8 m-4"></th>
                        <th scope="col" className="p-4 m-4">Quantity</th>
                        <th scope="col" className="p-4 m-4">Price</th>
                    </tr>
                </thead>
                <tbody className="p-4 m-6 px-7 border-b-4">
                    <tr className="p-4 m-4 px-7 border-b-4">
                        <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">Jacket</td>
                        <td className="p-4 m-4 px-7 border-b-4"></td>
                        <td className="p-4 m-4 px-7 border-b-4">2</td>
                        <td className="p-4 m-4 px-7 border-b-4">$50</td>
                    </tr>
                    <tr className="p-4 m-4 px-7 border-b-4">
                        <td className="p-4 m-4 px-7 border-b-4 w-1/2" colspan="2">
                            <p className="text-orange-600">Coupon(0%)</p>
                            <p className="text-green-600">tax</p>
                        </td>
                        <td className="p-4 m-4 px-7 border-b-4"></td>
                        <td className="p-4 m-4 px-7 border-b-4"></td>
                        <td className="p-4 m-4 px-7 border-b-4 text-green-600">
                            <p className="text-orange-600">-$0</p>
                            <p className="text-green-600">+$10</p>
                        </td>
                    </tr>
                    <tr className="p-4 m-4 px-7 mb-8 border-b-4">
                        <td className="p-4 m-4 px-7 w-1/2" colspan="2">You Pay</td>
                        <td className="p-4 m-4 px-7 border-b-4"></td>
                        <td className="p-4 m-4 px-7"></td>
                        <td className="p-4 m-4 px-7 border-b-4">-$0</td>
                    </tr>
                </tbody>
            </table>
            <div className="text-center border-4">
                <p>Your personal details will be used to process your order, support your experience throughout this website</p>
                <button className="px-5 py-3 m-3 w-2/3 bg-orange-500 rounded-lg text-white">Place Order</button>
            </div>
        </div>
    </div>
</div>

    </>
  );
};
export default Checkout;
