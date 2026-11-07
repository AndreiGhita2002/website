import data from './content/projects.json';

export interface Project {
  id: string;
  name: string;
  mark: string;
  tag: string;
  tagColor: { bg: string; fg: string };
  thumb: { bg: string; fg: string; src: string | null; alt?: string };
  blurb: string;
  details: string[];
  images: { label: string; src: string | null; alt: string }[];
  tags: string[];
  links: { label: string; href: string }[];
}

export interface TimelineEntry {
  when: string;
  title: string;
  note: string;
}

export const projects: Project[] = data.projects;
export const timeline: TimelineEntry[] = data.timeline;
