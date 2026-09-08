import { Eyebrow, Arrow } from "./Visuals";
import s from "./Homepage.module.css";

// Review and result supplied by TapRank. This is an individual review, not a
// business TrustScore. The result is a separate anonymous customer example.
export default function CustomerProof() {
  return <section className={`${s.wrap} ${s.customerProof}`} aria-labelledby="proof-title">
    <Eyebrow>In business, in practice</Eyebrow>
    <h2 id="proof-title">Small stand. Real experiences.</h2>
    <div className={s.proofGrid}>
      <article className={s.resultProof} aria-label="One business’s review growth">
        <p className={s.proofLabel}>Real customer result</p>
        <strong className={s.resultNumber}><span>More than</span>4×</strong>
        <h3>the reviews<br /><span>in approximately 2 months</span></h3>
        <p>One TapRank business grew its review count by more than four times within approximately two months of using TapRank.</p>
        <small>Individual results vary. This is not a guarantee.</small>
      </article>
      <figure className={s.reviewProof}>
        <div className={s.reviewStars} aria-label="This customer rated TapRank five out of five stars">★★★★★</div>
        <blockquote>
          <p>“The whole process was quick, easy and very professional.”</p>
          <p>“The quality of the stand is fantastic, and everything works perfectly. I highly recommend TapRank to any business looking for an easy way to collect Google reviews and grow their online presence.”</p>
        </blockquote>
        <figcaption><strong>Iryna S.</strong><span>5-star customer review on Trustpilot · July 2026</span></figcaption>
        <a href="https://uk.trustpilot.com/reviews/6a5bcd66e47e7599cd68a220" className={s.textLink}>View review on Trustpilot <Arrow /></a>
      </figure>
    </div>
  </section>;
}
