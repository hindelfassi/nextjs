import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return data.map((e) => (
    <Link key={e.fileID} href={`/${e.fileID}`}>
      {e.title}
    </Link>
  ));
}
