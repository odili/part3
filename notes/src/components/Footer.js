import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };
  return (
    <footer style={footerStyle}>
      <br />
      <em>{`Note app, Department of Computer Science, University of Helsinki ${new Date().getFullYear()}`}</em>
    </footer>
  );
};

export default Footer;
