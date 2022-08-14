import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await fetch(`http://localhost:3000/api/posts`).then(posts =>
        console.log(posts)
      );
    };

    getPosts();
  }, []);

  return (
    <Layout>
      <h1>A thing</h1>
    </Layout>
  );
}
