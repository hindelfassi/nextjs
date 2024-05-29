import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://146.19.213.47:3000/items")
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
