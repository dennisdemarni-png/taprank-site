import Image from "next/image";
import { googleDesigns } from "./content";
import s from "./Homepage.module.css";
export default function GoogleDesignSelector({ selected, onSelect, hero = false }) {
  return <div className={hero ? s.heroDesign : s.designSelector}>
    <p>{hero ? "Google Review · Choose design" : "Design"}</p>
    <div className={s.designOptions} role="group" aria-label={hero ? "Hero Google Review design" : "Google Review design"}>
      {googleDesigns.map(design => <button type="button" key={design.id} aria-pressed={selected.id === design.id} onClick={() => onSelect(design)}>
        <Image src={design.image} alt={`Google Review ${design.name} stand`} width={65} height={65} sizes="65px" />
        <span>{design.name}{design.soldOut && <small>Sold out</small>}</span>
      </button>)}
    </div>
  </div>;
}
