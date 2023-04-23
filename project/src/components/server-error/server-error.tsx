const ServerError = () => (
  <div className="cities__places-container cities__places-container--empty container">
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">Something went wrong</b>
        <p className="cities__status-description">You may refresh page or try again later</p>
      </div>
    </section>
    <div className="cities__right-section"></div>
  </div>
);

export default ServerError;
