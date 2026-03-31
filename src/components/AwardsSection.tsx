import { cn } from "@/lib/utils";

interface AwardEntry {
  org: string;
  count: string;
  name: string;
}

const awardsData: AwardEntry[] = [
  { org: "Awwwards", count: "001", name: "Site of the Year" },
  { org: "Awwwards", count: "001", name: "Developer Site of the Year" },
  { org: "Awwwards", count: "001", name: "Site of the Month" },
  { org: "Awwwards", count: "010", name: "Site of the Day" },
  { org: "Awwwards", count: "016", name: "Honorable Mention" },
  { org: "FWA", count: "001", name: "Site of the Year" },
  { org: "FWA", count: "002", name: "Site of the Month" },
  { org: "FWA", count: "017", name: "Site of the Day" },
  { org: "CSSDA", count: "001", name: "Site of the Year" },
  { org: "CSSDA", count: "001", name: "Agency Site of the Year" },
  { org: "Webby Awards", count: "002", name: "Webby Winner" },
  { org: "Webby Awards", count: "002", name: "Webby Nominee" },
  { org: "Lovie Awards", count: "001", name: "Lovie Winner" },
  { org: "Drum Awards", count: "001", name: "The Drum Awards for Design" },
  { org: "CommArts", count: "001", name: "Best-in-show Interactive" },
];

interface ArticleEntry {
  title: string;
}

const articlesData: ArticleEntry[] = [
  { title: "Porsche Newsroom - Driven By Dream" },
  { title: "Wallpaper - Driven by Dreams" },
  { title: "Opera North - The Turn of the Screw" },
];

interface TalkEntry {
  name: string;
  date: string;
}

const talksData: TalkEntry[] = [
  { name: "Digital Design Days", date: "Oct 2024 Milan" },
  { name: "Awwwards Conf", date: "Oct 2023 Amsterdam" },
  { name: "KIKK Festival", date: "Oct 2023 Namur" },
  { name: "Awwwards Conf", date: "Oct 2022 Amsterdam" },
  { name: "Grow Paris", date: "Nov 2018 Paris" },
];

function groupAwards(awards: AwardEntry[]): AwardEntry[][] {
  const groups: AwardEntry[][] = [];
  let currentGroup: AwardEntry[] = [];
  let currentOrg = "";

  for (const award of awards) {
    if (award.org !== currentOrg) {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = [award];
      currentOrg = award.org;
    } else {
      currentGroup.push(award);
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

export function AwardsSection() {
  const awardGroups = groupAwards(awardsData);

  return (
    <section className="relative overflow-hidden bg-black px-[60px] py-24 text-white">
      {/* Watermark text */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[-20px] top-[10%] text-[200px] font-bold uppercase text-white/[0.03]">
          AWARDS
        </span>
        <span className="absolute left-[-20px] top-[30%] text-[200px] font-bold uppercase text-white/[0.03]">
          WINNING
        </span>
      </div>

      {/* Awards Header */}
      <div className="relative z-10 mb-10 flex items-center gap-4">
        <h2 className="text-[24px] uppercase tracking-[2px]">Awards</h2>
        <span className="text-[24px]">✳</span>
        <span className="font-mono text-[24px]">58</span>
      </div>

      {/* Awards Table */}
      <div className="relative z-10 ml-auto max-w-[600px]">
        {awardGroups.map((group) =>
          group.map((award, entryIndex) => (
            <div
              key={`${award.org}-${award.name}`}
              className="flex items-start border-b border-white/10 py-3"
            >
              <span className="w-[160px] text-[14px]">
                {entryIndex === 0 ? award.org : ""}
              </span>
              <span className="w-[60px] font-mono text-[14px]">
                {award.count}
              </span>
              <span className="flex-1 text-[14px]">{award.name}</span>
            </div>
          ))
        )}
      </div>

      {/* Articles Sub-section */}
      <div className="relative z-10 mt-16">
        <div className="mb-6 flex items-center gap-4">
          <h3 className="text-[24px] uppercase tracking-[2px]">Articles</h3>
          <span className="text-[24px]">★</span>
          <span className="font-mono text-[24px]">03</span>
        </div>
        <div className="ml-auto max-w-[600px]">
          {articlesData.map((article) => (
            <p key={article.title} className="py-2 text-[14px]">
              {article.title}
            </p>
          ))}
        </div>
      </div>

      {/* Talks Sub-section */}
      <div className="relative z-10 mt-16">
        <div className="mb-6 flex items-center gap-4">
          <h3 className="text-[24px] uppercase tracking-[2px]">Talks</h3>
          <span className="text-[24px]">⊞</span>
          <span className="font-mono text-[24px]">5</span>
        </div>
        <div className="ml-auto max-w-[600px]">
          {talksData.map((talk) => (
            <div
              key={`${talk.name}-${talk.date}`}
              className="flex justify-between py-2 text-[14px] text-white/30"
            >
              <span>{talk.name}</span>
              <span>{talk.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
