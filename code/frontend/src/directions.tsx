import SocialIcon from "./components/SocialIcon";
import "./directions.css";

/**
 * The two directions the owner chooses between — one first screen each, at
 * /directions-1 and /directions-2, rendered outside the app's layout.
 * Desktop only (judged at 1440x790), and deleted once a direction is chosen.
 *
 * It sits here and not in src/pages/ on purpose: a page there draws its words
 * from content.json, and these two are not pages of the site — they are a
 * choice to be made and thrown away, so their words stay in the file with
 * them.
 *
 * The pieces, their glazes, their sizes and their prices are sample records:
 * the brief gave no product list. Everything else — the name, the village,
 * the hours, the phone, the email — is the owner's own.
 */

const PHONE = "0220 3882 345";
const TEL = "tel:02203882345";
const ZALO = "https://zalo.me/02203882345";

export function DirectionOne() {
  return (
    <div className="dir d1">
      <span className="dir__tag">Fired in Thái Tân</span>
      <section className="d1__hero">
        <img className="d1__photo" src="/images/studio.jpg" alt="The studio in Chu Đậu, pieces drying on the shelves" />
        <div className="d1__scrim" />
        <div className="d1__copy">
          <p className="d1__label">Chu Đậu · Thái Tân · Nam Sách</p>
          <h1 className="d1__name">Gốm Chu Đậu</h1>
          <p className="d1__sub">
            Thirty pieces on the shelf at a time, thrown and glazed in the village. See one you
            want — ring the kiln and it is yours.
          </p>
          <div className="d1__acts">
            <a className="d1__btn" href={TEL}>Call {PHONE}</a>
            <a className="d1__btn d1__btn--ghost" href={ZALO} aria-label="Message us on Zalo">
              <SocialIcon network="zalo" size={18} />Message us
            </a>
            <span className="d1__hours">8:00–17:00, Mon–Sat</span>
          </div>
        </div>
      </section>
      <section className="d1__band">
        <article className="d1__piece">
          <img src="/images/bowl.png" alt="Bát men kẻ" />
          <h2>Bát men kẻ</h2>
          <p className="d1__spec">Striped glaze · 14 cm</p>
          <p className="d1__price">480.000 ₫</p>
        </article>
        <article className="d1__piece">
          <img src="/images/plate.png" alt="Đĩa men trắng" />
          <h2>Đĩa men trắng</h2>
          <p className="d1__spec">White glaze · 26 cm</p>
          <p className="d1__price">650.000 ₫</p>
        </article>
        <article className="d1__piece">
          <img src="/images/tea-set.png" alt="Bộ ấm trà vẽ hoa" />
          <h2>Bộ ấm trà vẽ hoa</h2>
          <p className="d1__spec">Painted glaze · 5 pieces</p>
          <p className="d1__price">1.850.000 ₫</p>
        </article>
      </section>
    </div>
  );
}

export function DirectionTwo() {
  return (
    <div className="dir d2">
      <span className="dir__tag">Thirty on the shelf</span>
      <header className="d2__top">
        <h1 className="d2__name">Gốm Chu Đậu</h1>
        <div className="d2__acts">
          <a className="d2__btn" href={TEL}>Call {PHONE}</a>
          <a className="d2__btn d2__btn--ghost d2__btn--icon" href={ZALO} aria-label="Message us on Zalo">
            <SocialIcon network="zalo" size={20} />
          </a>
        </div>
      </header>
      <div className="d2__meta">
        <span>Bowls · Plates · Vases · Tea sets</span>
        <span>Chu Đậu, Thái Tân, Nam Sách, Hải Dương</span>
        <span>8:00–17:00, Monday to Saturday</span>
        <span>Ask about a piece by its name</span>
      </div>
      <div className="d2__grid">
        <div className="d2__cell d2__scene">
          <img src="/images/shelf.jpg" alt="Finished plates and bowls on the workbench" />
          <p className="d2__caption">Off the wheel this week — thirty pieces, each one once</p>
        </div>
        <article className="d2__cell">
          <div className="d2__pic"><img src="/images/bowl.png" alt="Bát men kẻ" /></div>
          <div className="d2__foot">
            <h2 className="d2__piece">Bát men kẻ</h2>
            <p className="d2__row"><span>Striped glaze</span><span className="d2__num">14 cm</span></p>
            <p className="d2__row"><span>Price</span><span className="d2__cost">480.000 ₫</span></p>
          </div>
        </article>
        <article className="d2__cell">
          <div className="d2__pic"><img src="/images/plate.png" alt="Đĩa men trắng" /></div>
          <div className="d2__foot">
            <h2 className="d2__piece">Đĩa men trắng</h2>
            <p className="d2__row"><span>White glaze</span><span className="d2__num">26 cm</span></p>
            <p className="d2__row"><span>Price</span><span className="d2__cost">650.000 ₫</span></p>
          </div>
        </article>
        <article className="d2__cell">
          <div className="d2__pic"><img src="/images/tea-set.png" alt="Bộ ấm trà vẽ hoa" /></div>
          <div className="d2__foot">
            <h2 className="d2__piece">Bộ ấm trà vẽ hoa</h2>
            <p className="d2__row"><span>Painted glaze</span><span className="d2__num">5 pieces</span></p>
            <p className="d2__row"><span>Price</span><span className="d2__cost">1.850.000 ₫</span></p>
          </div>
        </article>
      </div>
      <footer className="d2__bottom">
        <span>xuong@gomchudau.vn</span>
        <span>Nothing is bought here — ring or message about a piece</span>
        <b>{PHONE}</b>
      </footer>
    </div>
  );
}
