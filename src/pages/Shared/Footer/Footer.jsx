import logo from "../.././../assets/logo.png";
const Footer = () => {
  return (
    <>
      <footer className="footer px-10 py-6 bg-base-200 text-base-content">
      <aside>
        <img className="w-20" src={logo} alt="" />
        <p>
          Hostel Management
          <br />
          Search your favourite meals in Hostel Management
        </p>
      </aside>
      <nav>
        <header className="footer-title">Category</header>
        <a className="link link-hover">All Meals</a>
        <a className="link link-hover">Breakfast</a>
        <a className="link link-hover">Lunch</a>
        <a className="link link-hover">Dinner</a>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <header className="footer-title">Contacts</header>
        <fieldset className="form-control w-80">
          <p>Email: contact@hostelmanage.com</p>
          <p>Phone: +01654821</p>
      <label className="label">
        <span className="label-text">Enter your email address to get notification</span>
      </label> 
      <div className="relative">
        <input type="text" placeholder="contact@hostelmanage.com" className="input input-bordered w-full pr-16" /> 
        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
      </div>
    </fieldset>
      </nav>
    </footer>
    <aside className="text-center py-4  bg-base-200 text-base-content">
    <p>Copyright © 2023 - All right reserved by Job Finder</p>
  </aside>
    </>
  );
};

export default Footer;
