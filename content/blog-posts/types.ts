interface BlogPost {
  title: string;
  subtitle: string;
  minutesToRead: number;
  createdAt: string;
  url: string;
  tags: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export type { BlogPost };
