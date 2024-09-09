import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Inline styles for the footer component
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '40px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    footerColumn: {
      flex: '1',
      minWidth: '200px',
      marginBottom: '20px',
    },
    footerLogo: {
      marginBottom: '20px',
    },
    footerTitle: {
      fontSize: '18px',
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
    footerLinks: {
      listStyleType: 'none',
      padding: 0,
    },
    footerLinkItem: {
      marginBottom: '10px',
    },
    footerLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
    },
    socialIcons: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    socialIcon: {
      width: '30px',
      height: '30px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerBottom: {
      borderTop: '1px solid #444',
      marginTop: '20px',
      paddingTop: '20px',
      textAlign: 'center',
      fontSize: '12px',
    },
  };

  return (
    <footer style={styles.footer}>
      {/* Logo and description */}
      <div style={styles.footerColumn}>
        <img src="/logo.png" alt="Logo" style={styles.footerLogo} />
        <p>Providing high-quality sports equipment since 1887.</p>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <img src="/icons/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>

      {/* Customer Support */}
      <div style={styles.footerColumn}>
        <h4 style={styles.footerTitle}>Customer Support</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinkItem}>
            <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/shipping" style={styles.footerLink}>Shipping & Delivery</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/returns" style={styles.footerLink}>Returns</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/faq" style={styles.footerLink}>FAQ</Link>
          </li>
        </ul>
      </div>

      {/* Company Info */}
      <div style={styles.footerColumn}>
        <h4 style={styles.footerTitle}>Company</h4>
        <ul style={styles.footerLinks}>
          <li style={styles.footerLinkItem}>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/careers" style={styles.footerLink}>Careers</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/terms" style={styles.footerLink}>Terms & Conditions</Link>
          </li>
          <li style={styles.footerLinkItem}>
            <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
          </li>
        </ul>
      </div>

      {/* Footer bottom */}
      <div style={styles.footerBottom}>
        <p>&copy; 2024 Rawlings, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
