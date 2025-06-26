"use client";

import Image from "next/image";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
};

type Props = {
  articles: Article[];
};

export default function NewsFeed({ articles }: Props) {
  return (
    <div className="mt-6 ml-6 space-y-4 w-full max-w-[600px]">
      <h2 className="text-xl font-semibold mb-2">Latest Demograpic News</h2>
      {articles.length === 0 && <p>No news available</p>}
      {articles.map((article, index) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-b pb-2 hover:bg-gray-50 transition"
        >
          <Image
            src={article.image}
            alt={article.title}
            width={340}
            height={340}
            className="h-auto object-cover mb-2 rounded"
            unoptimized
          />
          <p className="font-medium">{article.title}</p>
          <p className="text-sm text-gray-600">
            {article.source.name} -{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </a>
      ))}
    </div>
  );
}
