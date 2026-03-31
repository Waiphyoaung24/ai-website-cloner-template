import { cn } from "@/lib/utils";

interface Capability {
  title: string;
  icon: string;
  skills: string[];
}

const capabilities: Capability[] = [
  {
    title: "Strategy",
    icon: "S",
    skills: [
      "Digital Experience Strategy",
      "Technology Strategy",
      "Creative Direction",
      "Discovery",
      "Research",
    ],
  },
  {
    title: "Creative",
    icon: "C",
    skills: [
      "Art Direction",
      "UX/UI Design",
      "Motion Design",
      "Interactive Design",
      "Illustration",
    ],
  },
  {
    title: "Tech",
    icon: "T",
    skills: [
      "WebGL Development",
      "Front End Development",
      "Unity/Unreal",
      "Interactive Installations",
      "AR and VR Experiences",
    ],
  },
  {
    title: "Production",
    icon: "P",
    skills: [
      "Procedural Modeling",
      "3D Asset Creation",
      "3D Optimization",
      "Animation",
      "3D Pipeline Development",
    ],
  },
];

const categoryButtons = ["s", "c", "t", "3"];

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <div className="bg-white text-black rounded-xl p-8 flex flex-col justify-between min-h-[480px]">
      {/* Card header */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[20px] font-bold uppercase">
            {capability.title}
          </h3>
          <span className="text-[24px] font-bold font-mono">
            {capability.icon}
          </span>
        </div>
        {/* Skills list */}
        <div>
          {capability.skills.map((skill) => (
            <div
              key={skill}
              className="py-3.5 border-b border-dotted border-black/20 text-[14px]"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      {/* Card footer (upside down, playing card style) */}
      <div className="flex justify-between items-center rotate-180 mt-8">
        <span className="text-[24px] font-bold font-mono">
          {capability.icon}
        </span>
        <span className="text-[14px] font-bold uppercase">
          {capability.title}
        </span>
      </div>
    </div>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      className={cn(
        "bg-[#0016ec] text-white py-24 px-[60px] min-h-screen"
      )}
    >
      {/* Top area: heading left, description+buttons right */}
      <div className="flex justify-between items-start mb-16">
        <h2 className="text-[min(10vw,120px)] font-normal uppercase leading-[0.9] text-white">
          AREA OF
          <br />
          <span className="ml-[0.5em]">EXPERTISE</span>
        </h2>
        <div className="max-w-[250px]">
          <p className="text-[11px] font-medium uppercase tracking-[1px]">
            MULTIDISCIPLINARY EXPERTISE ACROSS STRATEGY, CREATIVE, TECHNOLOGY,
            AND PRODUCTION.
          </p>
          <div className="flex gap-2 mt-4">
            {categoryButtons.map((label) => (
              <button
                key={label}
                type="button"
                className="w-8 h-8 border border-white/30 rounded text-[12px] font-mono flex items-center justify-center"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-5">
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
    </section>
  );
}
