import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type {
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from "@/types/content";

type TimelineItemProps = {
  item: ExperienceItem | EducationItem | CertificationItem;
};

function isExperience(item: TimelineItemProps["item"]): item is ExperienceItem {
  return "company" in item && "role" in item;
}

function isEducation(item: TimelineItemProps["item"]): item is EducationItem {
  return "school" in item;
}

export function TimelineItem({ item }: TimelineItemProps) {
  if (isExperience(item)) {
    return (
      <div className="flex flex-col items-start gap-2.5">
        <div className="flex items-start justify-between self-stretch">
          <span className="font-body text-fg text-lg leading-[27px]">
            {item.company}
          </span>
          <span className="font-body text-muted-2 text-lg leading-[27px]">
            {item.start} - {item.end}
          </span>
        </div>
        <div className="font-body text-fg text-2xl leading-9">{item.role}</div>
        <div className="flex flex-col gap-4 self-stretch">
          {item.groups.map((group, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              {group.project ? (
                <p className="font-body text-fg text-base italic leading-6">
                  {group.project}
                </p>
              ) : null}
              <ul className="text-muted font-body flex list-disc flex-col gap-1 pl-5 text-base leading-6 marker:text-muted-2">
                {group.bullets.map((bullet) => (
                  <li key={bullet} className="pl-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isEducation(item)) {
    return (
      <div className="flex flex-col items-start gap-2.5">
        <div className="flex items-start justify-between self-stretch">
          <span className="font-body text-fg text-lg leading-[27px]">
            {item.school}
          </span>
          <span className="font-body text-muted-2 text-lg leading-[27px]">
            {item.start} - {item.end}
          </span>
        </div>
        <div className="font-body text-fg text-2xl leading-9">{item.degree}</div>
        {item.notes ? (
          <ul className="text-muted font-body flex list-disc flex-col gap-1 pl-5 text-base leading-6 marker:text-muted-2">
            {item.notes.map((note) => (
              <li key={note} className="pl-1">
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  const cert = item as CertificationItem;
  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="flex items-start justify-between self-stretch">
        <span className="flex items-center gap-2.5">
          {cert.logo ? (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white p-1">
              <Image
                src={cert.logo}
                alt={`${cert.issuer} logo`}
                width={96}
                height={96}
                quality={100}
                className="h-full w-full object-contain"
              />
            </span>
          ) : null}
          <span className="font-body text-fg text-lg leading-[27px]">
            {cert.issuer}
          </span>
        </span>
        <span className="font-body text-muted-2 text-lg leading-[27px]">
          {cert.year}
        </span>
      </div>
      <div className="font-body text-fg text-2xl leading-9">{cert.name}</div>
      {cert.url ? (
        <Link
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-fg mt-2 inline-flex items-center gap-1.5 self-end border-b border-fg/40 pb-1 text-sm tracking-wide uppercase transition-opacity hover:opacity-70"
        >
          View Certification
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </Link>
      ) : null}
    </div>
  );
}
