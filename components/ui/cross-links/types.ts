export interface CrossLink {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  externalLogo?: string;
}

export interface Tool {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
}

export type CustomLinkFunction = (dynamicData?: any) => CrossLink;
