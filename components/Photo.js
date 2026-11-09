import Image from "next/image";

// A cropped photo. `focus` is the point kept in view, `zoom` magnifies around it.
// ratio="fill" makes it fill its (positioned) parent instead of using an aspect ratio.
export default function Photo({ item, ratio = "4 / 5", sizes = "(max-width: 700px) 50vw, 33vw", priority = false, className = "" }) {
  const focus = item.focus || "50% 50%";
  const fill = ratio === "fill";
  return (
    <div className={`ph ${fill ? "fill" : ""} ${className}`} style={fill ? undefined : { aspectRatio: ratio }}>
      <div className="ph-in">
        <Image
          src={item.image}
          alt={item.name || item.title}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: focus, transformOrigin: focus, transform: `scale(${item.zoom || 1})` }}
        />
      </div>
    </div>
  );
}
