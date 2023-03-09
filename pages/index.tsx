import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Chatbot from '@/components/Chatbot'
import Searchlist from '@/components/Searchlist'
import Search from '@/models/Search'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from "../context/context";
import ImageGen from '@/components/ImageGen'


const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  try {
    const data = await Search.find({}).lean();
    console.log(data)

    const searchList = data.map(({ _id, text, answer, likes }) => ({
      _id: _id.toString(),
      text,
      answer,
      likes
    }));

    return {
      props: {
        searchList,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        searchList: [],
      },
    };
  }
}

export default function Home({ searchList }) {
  const { list, setList } = useContext(AppContext)

  useEffect(() => {
    setList(searchList)
  }, [searchList, setList])

  return (
    <>
      <Navbar/>
      <Chatbot/>
      <ImageGen/>
      <Searchlist list={list} />
    </>
  )
}


