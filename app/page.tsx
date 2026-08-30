"use client";

import { useEffect, useState } from "react";

const CATALOGUE = [
  {
    no: "MINT 001",
    title: "Untitled Mixtape",
    meta: "Mixtape · 2026 · souvenir mint at release",
    tag: "In the vault",
    soon: true,
  },
  {
    no: "MINT 002",
    title: "First Single",
    meta: "Single · TBA · pressed with cover art",
    tag: "Unannounced",
    soon: true,
  },
  {
    no: "MINT 003",
    title: "The Album",
    meta: "LP · TBA · full souvenir series",
    tag: "Unannounced",
    soon: true,
  },
];

const SOUVENIRS = [
  {
    ico: "I",
    title: "Cover plates",
    body: "Every release gets a limited plate. Own the artwork the way you used to own the sleeve.",
  },
  {
    ico: "II",
    title: "Room passes",
    body: "Holders get first look at unreleased records, and the door code to things that never go public.",
  },
  {
    ico: "III",
    title: "House pieces",
    body: "Collaborations, one-off art and physical drops minted alongside the record.",
  },
];

const COIN_CSS = `
  .hero .hero-grid{
    display:grid;
    grid-template-columns:1fr 0.82fr 0.44fr;
    gap:34px;
    align-items:center;
  }
  .hero-coin-col{ display:flex; justify-content:center; align-items:center; }
  .hero-coin-slot{ position:relative; perspective:1300px; }

  .hero-coin{
    width:196px; height:196px; position:relative; transform-style:preserve-3d;
    cursor:pointer; border:0; padding:0; background:none;
    animation:coinFloat 6s ease-in-out infinite;
    transition:transform .9s cubic-bezier(.2,.7,.2,1), filter .4s ease;
    filter:drop-shadow(0 18px 30px rgba(0,0,0,.8));
  }
  .hero-coin:hover{
    filter:drop-shadow(0 22px 36px rgba(0,0,0,.85)) drop-shadow(0 0 24px rgba(201,162,39,.4));
  }
  .hero-coin:focus-visible{ outline:1px solid #8A6E1B; outline-offset:18px; border-radius:50%; }
  .hero-coin.is-flipped{ transform:rotateY(180deg); }

  .hero-coin-face{
    position:absolute; inset:0; backface-visibility:hidden;
    background-size:contain; background-repeat:no-repeat; background-position:center;
  }
  .hero-coin-face--back{ transform:rotateY(180deg); }

  .hero-coin-sheen{
    position:absolute; inset:0; border-radius:50%; pointer-events:none; mix-blend-mode:screen;
    background:linear-gradient(115deg,transparent 34%,rgba(240,220,154,.20) 46%,rgba(255,255,255,.30) 50%,rgba(240,220,154,.18) 54%,transparent 66%);
    background-size:280% 280%;
    animation:coinSheen 7s linear infinite;
  }
  @keyframes coinSheen{ 0%{background-position:130% 0} 100%{background-position:-30% 0} }
  @keyframes coinFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

  .hero-coin-tag{
    position:absolute; top:calc(100% + 14px); left:50%; transform:translateX(-50%);
    white-space:nowrap; font-size:9.5px; letter-spacing:.26em;
    text-transform:uppercase; color:#5d564d;
  }

  .coin-scrim{
    position:fixed; inset:0; background:rgba(4,3,3,.84); backdrop-filter:blur(7px);
    display:flex; align-items:center; justify-content:center; padding:24px;
    opacity:0; pointer-events:none; transition:opacity .34s ease; z-index:80;
  }
  .coin-scrim.is-open{ opacity:1; pointer-events:auto; }
  .coin-panel{
    width:min(480px,100%); background:linear-gradient(180deg,#141110,#0c0a09);
    border:1px solid rgba(201,162,39,.26); padding:42px 38px 34px; position:relative;
    transform:translateY(16px) scale(.97); transition:transform .34s cubic-bezier(.2,.7,.2,1);
  }
  .coin-scrim.is-open .coin-panel{ transform:none; }
  .coin-panel:before{
    content:""; position:absolute; left:38px; right:38px; top:0; height:1px;
    background:linear-gradient(90deg,transparent,#C9A227,transparent);
  }
  .coin-panel h2{ font-size:31px; margin:14px 0 8px; }
  .coin-panel h2 em{ font-style:normal; color:#F0DC9A; }
  .coin-panel p{ color:#948B81; font-size:14.5px; line-height:1.72; margin:0 0 22px; }
  .coin-rows{ border-top:1px solid rgba(255,255,255,.07); margin-bottom:8px; }
  .coin-row{
    display:flex; justify-content:space-between; gap:16px; padding:13px 0;
    border-bottom:1px solid rgba(255,255,255,.07); font-size:13.5px; color:#E8E1D4;
  }
  .coin-row span:first-child{
    color:#736b62; font-size:11px; letter-spacing:.16em;
    text-transform:uppercase; padding-top:2px;
  }
  .coin-row span:last-child{ text-align:right; }
  .coin-close{
    position:absolute; top:14px; right:16px; background:none; border:0; cursor:pointer;
    color:#6b635a; font-size:22px; line-height:1; padding:6px;
  }
  .coin-close:hover{ color:#E8E1D4; }
  .coin-fine{ font-size:11.5px; color:#5d564d; line-height:1.6; margin:20px 0 0; }

  @media (max-width:980px){
    .hero .hero-grid{ grid-template-columns:1fr 1fr; gap:24px; }
    .hero .hero-grid > :first-child{ grid-column:1 / -1; }
  }
  @media (max-width:700px){
    .hero .hero-grid{ grid-template-columns:1fr; gap:18px; }
    .hero-coin{ width:150px; height:150px; }
  }
  @media (prefers-reduced-motion:reduce){
    .hero-coin, .hero-coin-sheen{ animation:none; }
  }
`;

export default function Home() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [coinOpen, setCoinOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCoinOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function join() {
    if (!email.includes("@")) {
      setNote("Enter a valid email address.");
      return;
    }
    setNote("You are on the list.");
    setEmail("");
  }

  return (
    <>
      <style>{COIN_CSS}</style>

      <nav className="nav">
        <div className="shell nav-inner">
          <div className="nav-mark">
            <span>6</span>CRYPTO<span>6</span>GOOCHI<span>6</span>
          </div>
          <div className="nav-links">
            <a href="#house">The house</a>
            <a href="#catalogue">Catalogue</a>
            <a href="#souvenirs">Souvenirs</a>
            <a href="#vault">The vault</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* ---------------- hero ---------------- */}
        <section className="hero">
          <video
            className="hero-video"
            src="/goochi-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="shell hero-grid">
            <div>
              <p className="eyebrow">Omerta Row presents</p>
              <h1>
                <span className="six">6</span>CRYPTO
                <span className="six">6</span>
                <br />
                GOOCHI<span className="six">6</span>
              </h1>
              <p className="hero-sub lede">
                Digital luxury, minted by hand. A record label artist building a
                house currency, one release at a time.
              </p>
              <div className="hero-actions">
                <a className="btn btn--gold" href="#catalogue">
                  Hear the catalogue
                </a>
                <a className="btn btn--ghost" href="#contact">
                  Join the list
                </a>
              </div>
            </div>

            <div className="hero-figure-wrap">
              <img
                className="hero-figure"
                src="/goochi.png"
                alt="6CRYPTO6GOOCHI6"
              />
            </div>

            <div className="hero-coin-col">
              <div className="hero-coin-slot">
                <button
                  className={coinOpen ? "hero-coin is-flipped" : "hero-coin"}
                  onClick={() => setCoinOpen((v) => !v)}
                  aria-label="Open house currency details"
                >
                  <div
                    className="hero-coin-face"
                    style={{ backgroundImage: "url(/coin-front.png)" }}
                  >
                    <div className="hero-coin-sheen" />
                  </div>
                  <div
                    className="hero-coin-face hero-coin-face--back"
                    style={{ backgroundImage: "url(/coin-back.png)" }}
                  >
                    <div className="hero-coin-sheen" />
                  </div>
                </button>
                <div className="hero-coin-tag">Tap the coin</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- the house ---------------- */}
        <section className="band" id="house">
          <div className="shell story-grid">
            <div>
              <p className="eyebrow">The house</p>
              <h2>Every record is a mint.</h2>
              <p className="lede">
                6CRYPTO6GOOCHI6 is an Omerta Row artist. The music comes first —
                a mixtape, then singles, then the album. Everything around it is
                built to make the people who showed up early feel like they own
                a piece of it, because they do.
              </p>
            </div>
            <div className="story-pillars">
              <div className="pillar">
                <div className="pillar-k">Music first</div>
                <p>
                  The catalogue is the product. Nothing here works if the records
                  do not.
                </p>
              </div>
              <div className="pillar">
                <div className="pillar-k">Souvenirs, not securities</div>
                <p>
                  Collectibles tied to releases. Artwork, access, artifacts —
                  never a claim on revenue.
                </p>
              </div>
              <div className="pillar">
                <div className="pillar-k">The room votes</div>
                <p>
                  Holders help pick covers, singles and tour cities. The label
                  keeps the final say.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- catalogue ---------------- */}
        <section className="band" id="catalogue">
          <div className="shell">
            <p className="eyebrow">Catalogue</p>
            <h2>The mint record.</h2>
            <p className="lede" style={{ marginBottom: 44 }}>
              Each release is numbered and pressed with its own souvenir series.
            </p>

            {CATALOGUE.map((item) => (
              <div className="mint" key={item.no}>
                <div className="mint-no">{item.no}</div>
                <div>
                  <div className="mint-title">{item.title}</div>
                  <div className="mint-meta">{item.meta}</div>
                </div>
                <div className={item.soon ? "tag tag--soon" : "tag"}>
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- souvenirs ---------------- */}
        <section className="band" id="souvenirs">
          <div className="shell">
            <p className="eyebrow">Souvenirs</p>
            <h2>Things worth keeping.</h2>
            <p className="lede">
              Digital keepsakes tied to the music — the modern version of holding
              onto the ticket stub.
            </p>

            <div className="souvenirs">
              {SOUVENIRS.map((s) => (
                <div className="souvenir" key={s.title}>
                  <div className="souvenir-ico">{s.ico}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- the vault ---------------- */}
        <section className="band" id="vault">
          <div className="shell">
            <div className="vault">
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                The vault
              </p>
              <h2>The house currency.</h2>
              <p className="lede">
                A fan token for the people who build this thing with us. Not tied
                to revenue, not an investment — a membership card for the room.
              </p>
              <div className="seal">
                <span className="seal-dot" />
                Coming soon
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- list + contact ---------------- */}
        <section className="band" id="contact">
          <div className="shell list-grid">
            <div>
              <p className="eyebrow">The list</p>
              <h2>Get in early.</h2>
              <p>
                Drops, first listens and vault access go out here before anywhere
                else.
              </p>
              <div className="field">
                <input
                  type="email"
                  value={email}
                  placeholder="you@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && join()}
                  aria-label="Email address"
                />
                <button className="btn btn--gold" onClick={join}>
                  Join
                </button>
              </div>
              <div className="field-note">{note}</div>
            </div>

            <div>
              <p className="eyebrow">Business</p>
              <div className="contact-row">
                <span>Bookings</span>
                <span>booking@omertarow.com</span>
              </div>
              <div className="contact-row">
                <span>Press</span>
                <span>press@omertarow.com</span>
              </div>
              <div className="contact-row">
                <span>Label</span>
                <span>Omerta Row</span>
              </div>
              <div className="contact-row">
                <span>Press kit</span>
                <span>On request</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="shell foot">
          <div>© 2026 Omerta Row</div>
          <div>6 · CRYPTO · 6 · GOOCHI · 6</div>
        </footer>
      </main>

      {/* ---------------- coin popup ---------------- */}
      <div
        className={coinOpen ? "coin-scrim is-open" : "coin-scrim"}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCoinOpen(false);
        }}
      >
        <div
          className="coin-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coin-title"
        >
          <button
            className="coin-close"
            onClick={() => setCoinOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="seal">
            <span className="seal-dot" />
            Coming soon
          </div>
          <h2 id="coin-title">
            The house <em>currency</em>.
          </h2>
          <p>
            A membership piece for the people who build this with us. Struck for
            the room, not for the market.
          </p>
          <div className="coin-rows">
            <div className="coin-row">
              <span>Mark</span>
              <span>6C · 6G · 6</span>
            </div>
            <div className="coin-row">
              <span>House</span>
              <span>Omerta Row</span>
            </div>
            <div className="coin-row">
              <span>Struck</span>
              <span>Est. 2024</span>
            </div>
            <div className="coin-row">
              <span>Holds</span>
              <span>Room passes, first listens, the vote</span>
            </div>
          </div>
          <p className="coin-fine">
            Not tied to revenue. Not an investment. A door code, an early seat
            and a say in what gets pressed next.
          </p>
        </div>
      </div>
    </>
  );
}
