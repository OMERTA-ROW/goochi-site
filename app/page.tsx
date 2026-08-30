"use client";

import { useState } from "react";

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

export default function Home() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

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
    </>
  );
}
