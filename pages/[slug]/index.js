import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const BookDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/book?id=${slug}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <NextSeo
        title={book?.title}
        description="Home page description of the page"
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-12">
        <div className="space-y-6">
          <div>My Post: {book?.Author}</div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {book?.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            by {book?.author}
          </p>
          <div className="prose prose-lg dark:prose-invert">
            <p>{book?.description || "No description available."}</p>
          </div>
        </div>
        <div className="space-y-6">
          <img
            alt={book?.title}
            className="aspect-[2/3] rounded-lg object-cover"
            height={600}
            src={book?.imageUrl || "/placeholder-image.jpg"} // Default image if not found
            width={400}
          />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Pages
                </p>
                <p>{book?.pages || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Format
                </p>
                <p>{book?.format || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Language
                </p>
                <p>{book?.language || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  ISBN
                </p>
                <p>{book?.isbn || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Publication Date
                </p>
                <p>{book?.publicationDate || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Publisher
                </p>
                <p>{book?.publisher || "N/A"}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Awards
              </p>
              <ul className="space-y-1">
                {book?.awards &&
                  book.awards.map((award) => <li key={award}>{award}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
