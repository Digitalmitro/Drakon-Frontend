import React, { useState, useEffect } from "react";
import styles from '../styles/orderDetails.module.scss';

export const OrderPanel = () => {
  const [orders, setOrders] = useState([
    { id: 1, details: 'Drakon Card Azure Blue', price: 259, status: 'Completed', date: 'just now' },
    { id: 2, details: 'Phoenix Ring', price: 99, status: 'Shipped', date: '1 day ago' },
    // Add more orders here...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2; // Set the number of orders per page

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
              <td>
                <p>#OrderID {order.id}</p>
                <p><b>{order.details}</b></p>
                <p>${order.price}</p>
              </td>
              <td><p className={styles.statusColumn}>{order.status}</p></td>
              <td><p>{order.date}</p></td>
              <td className={styles.buttonList}>
                <button>Order Details</button>
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
              padding: '8px 16px',
              margin: '0 5px',
              border: '1px solid #ddd',
              backgroundColor: currentPage === index + 1 ? '#ff5722' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#000',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
