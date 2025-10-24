// React import removed (automatic JSX runtime) - not referenced directly in this file

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          {/* Logo & Copyright */}
          <div className="col">
            <img
              src="media/images/logo.svg"
              alt="Zerodha Logo"
              style={{ width: "50%" }}
            />
            <p>&copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.</p>
          </div>

          {/* Company Links */}
          <div className="col">
            <p className="fw-bold">Company</p>
            <ul className="list-unstyled">
              {[
                "About",
                "Products",
                "Pricing",
                "Referral programme",
                "Careers",
                "Zerodha.tech",
                "Press & media",
                "Zerodha cares (CSR)",
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ textDecoration: "none" }}
                    aria-label={link}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col">
            <p className="fw-bold">Support</p>
            <ul className="list-unstyled">
              {[
                "Contact",
                "Support portal",
                "Z-Connect blog",
                "List of charges",
                "Downloads & resources",
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ textDecoration: "none" }}
                    aria-label={link}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="col">
            <p className="fw-bold">Account</p>
            <ul className="list-unstyled">
              {['Open an account', 'Fund transfer', '60 day challenge'].map((link, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    style={{ textDecoration: "none" }}
                    aria-label={link}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal / Compliance Section */}
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000031633. 
            CDSL: Depository services through Zerodha Securities Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015. 
            Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.: INZ000038238. 
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, 
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For complaints pertaining to securities broking, write to 
            complaints@zerodha.com, for DP-related issues, dp@zerodha.com. Carefully read the Risk Disclosure Document as prescribed by SEBI | ICF.
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective communication, speedy grievance redressal.
          </p>

          <p>
            Investments in securities markets are subject to market risks; read all related documents carefully before investing.
          </p>

          <p>
            Prevent unauthorised transactions in your account. Update mobile numbers/email IDs with your stock brokers. Receive transaction information directly from Exchange on your mobile/email at day end. KYC is a one-time exercise. IPO subscriptions do not require a cheque; provide bank account number and sign IPO application. We do not provide stock tips. If anyone claims to be part of Zerodha offering such services, create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

