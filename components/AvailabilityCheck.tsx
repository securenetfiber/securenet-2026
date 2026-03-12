'use client';

export default function AvailabilityCheck() {
  return (
    <section className="availability" id="check">
      <div className="section-container">
        <div className="avail-box">
          <h2 className="avail-heading">See if we&apos;re in your neighborhood.</h2>
          <p className="avail-sub">
            Enter your address and we&apos;ll let you know if SecureNet Fiber is
            available at your location.
          </p>
          <form className="avail-form" action="#" method="post">
            <div className="avail-input-group">
              <label htmlFor="address" className="sr-only">
                Street address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your street address"
                autoComplete="street-address"
                required
              />
              <button type="submit" className="btn btn-primary">
                Check Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
