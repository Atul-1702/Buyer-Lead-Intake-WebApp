import Image from "next/image";
import "./page.scss";

export default async function Home() {
  return (
    <main className="home-page-main-content-wrapper">
      <h1 id="top-heading">Done-For-You Real Estate Lead Generation</h1>
      <p id="top-heading-description">
        Grow your business consistently by getting a predictable number of
        exclusive buyer & seller leads in your target market every single month.
        To help you get the right leads for your business, Market Leader offers
        these reliable lead generation solutions:
      </p>

      <div className="card-container-outer-wrapper">
        <div className="card-container">
          <div className="card">
            <div className="card-face card-front">
              <div>
                <Image
                  src="/images/leadsDirect-REV.webp"
                  width={256}
                  height={47}
                  alt="lead-direct"
                />
                <Image
                  src="/images/lmLightBlue.webp"
                  width={320}
                  height={36}
                  alt="lightblue"
                  className="learn-more-image"
                />
              </div>
            </div>
            <div className="card-face card-back">
              <h3>LEADS DIRECT</h3>
              <p>
                We target consumers who are searching for home listings on
                Google and other search engines and drive them directly to your
                website.
              </p>
              <Image
                src="/images/lmLightBlue.webp"
                width={320}
                height={36}
                alt="lightblue"
                className="learn-more-image"
              />
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-face card-front">
              <div>
                <Image
                  src="/images/houseValues-REV.webp"
                  width={256}
                  height={47}
                  alt="lead-direct"
                />
                <Image
                  src="/images/lmBrightOrange.webp"
                  width={320}
                  height={36}
                  alt="lightblue"
                  className="learn-more-image"
                />
              </div>
            </div>
            <div className="card-face card-back">
              <h3>HOUSE VALUES</h3>
              <p>
                Potential seller leads visit HouseValues.com to request a free
                personalized home valuation, and we pass their information on to
                you!
              </p>
              <Image
                src="/images/lmBrightOrange.webp"
                width={320}
                height={36}
                alt="lightblue"
                className="learn-more-image"
              />
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-face card-front">
              <div>
                <Image
                  src="/images/networkBoost-REV.webp"
                  width={256}
                  height={47}
                  alt="lead-direct"
                />
                <Image
                  src="/images/lmBrightGreen.png"
                  width={320}
                  height={36}
                  alt="lightblue"
                  className="learn-more-image"
                />
              </div>
            </div>
            <div className="card-face card-back">
              <h3>NETWORK BOOST</h3>
              <p>
                We quickly capture leads for you through Facebook and Instagram.
                AND we even nurture them automatically on your behalf.
              </p>
              <Image
                src="/images/lmBrightGreen.png"
                width={320}
                height={36}
                alt="lightblue"
                className="learn-more-image"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
