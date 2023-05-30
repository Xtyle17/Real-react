const Footer = () => {
  let currentDate = new Date().getFullYear();
  return (
    <footer>
      <h1 id="footPost">Copyright &#169; {currentDate}</h1>
    </footer>
  );
};

export default Footer;
