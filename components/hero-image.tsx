import Image from "next/image";

const heroImage = "/a_wide_cinematic_construction_site_scene_at_sunse.png";

export function HeroImage() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-navy">
      <Image
        src={heroImage}
        alt="معدات ثقيلة في موقع إنشاء لمنصة فليت معدات"
        fill
        priority
        sizes="100vw"
        className="scale-[1.01] object-cover object-[58%_50%] md:object-center"
      />
      <div className="absolute inset-0 bg-navy/15 mix-blend-multiply" />
      <div className="absolute inset-0 backdrop-blur-[0.2px]" />
    </div>
  );
}
