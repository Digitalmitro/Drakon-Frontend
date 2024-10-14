import React, { useState, useEffect } from "react";
import styles from '../styles/orderDetails.module.scss';
import img5 from "../../assets/img5.jpg"



export const OrderPanel = () => {
  const [orders, setOrders] = useState([


  ]);

  const ordersList = [
    { id: 1, details: 'Drakon Card Azure Blue', price: 259, status: 'Completed', date: 'just now' },
    { id: 2, details: 'Phoenix Ring', price: 99, status: 'Cancelled', date: '1 day ago' },
    { id: 3, details: 'Drakon Card Azure Blue', price: 259, status: 'Pending', date: 'just now' },
    { id: 4, details: 'Phoenix Ring', price: 99, status: 'Completed', date: '1 day ago' },
    { id: 5, details: 'Drakon Card Azure Blue', price: 259, status: 'Cancelled', date: 'just now' },
    { id: 6, details: 'Phoenix Ring', price: 99, status: 'Pending', date: '1 day ago' },
    { id: 7, details: 'Drakon Card Azure Blue', price: 259, status: 'Completed', date: 'just now' },
    { id: 8, details: 'Phoenix Ring', price: 99, status: 'Pending', date: '1 day ago' },
  ]

  useEffect(() => {
    const getOrders = () => {
      setOrders(ordersList)
    }
    getOrders()
  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // Set the number of orders per page

  // Get the current orders to display on the page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Scroll to top when the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className={styles.orderPanel}>
      <h4>Order History</h4>

      {/* Orders Table */}
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order Details</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id}>
              <td >
        
               <p>#OrderID - {order.id}</p>
               <div className={styles.productsDetails}>
               <div >
                  <img  src={img5} alt=""/>
                </div>
                <div>
                <p><b>{order.details}</b></p>
                <p><b>${order.price}</b></p>
                </div>
               </div>
                
              
              </td>

              <td style={{
                color: order.status === 'Cancelled' ? 'red' :
                  order.status === 'Pending' ? '#ffb100' :
                    order.status === 'Completed' ? 'green' : 'inherit'
              }}
              ><p className={` ${styles.statusColumn} 
    ${order.status === 'Cancelled' ? styles.statusCancelled : ''} 
    ${order.status === 'Pending' ? styles.statusPending : ''} 
    ${order.status === 'Completed' ? styles.statusCompleted : ''}`}>{order.status}</p></td>
              <td><p>{order.date}</p></td>
              <td className={styles.buttonList}>
                <p>  <button>Order Details</button></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              padding: '5px 12px',
              margin: '0 5px',
              border: '1px solid #ddd',
              backgroundColor: currentPage === index + 1 ? '#ff5722' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#000',
              cursor: 'pointer',
              borderRadius: '50%',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
