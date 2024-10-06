import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer>
      <p>&copy; {currentYear} Weather Skies. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
