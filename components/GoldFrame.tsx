/** Gold leaf border framing the whole invitation page (decorative only). */
export default function GoldFrame() {
  return (
    <div className="gold-frame" aria-hidden="true">
      <span className="gf-line" />
      <span className="gf-vine gf-vine-l" />
      <span className="gf-vine gf-vine-r" />
      <span className="gf-corner tl" />
      <span className="gf-corner tr" />
      <span className="gf-corner bl" />
      <span className="gf-corner br" />
    </div>
  );
}
