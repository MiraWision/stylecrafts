interface BlogPost {
  title: string;
  subtitle: string;
  minutesToRead: number;
  createdAt: string;
  url: string;
  tags: string[];
  thumbnail: string;
}

export type { BlogPost };
