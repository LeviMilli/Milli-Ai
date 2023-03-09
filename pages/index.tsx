import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/Chatbot';
import Searchlist from '@/components/Searchlist';
import Search from '@/models/Search';
import { useState, useContext, useEffect, createContext } from 'react';
import ImageGen from '@/components/ImageGen';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  searchList: {
    _id: string;
    text: string;
    answer: string;
    likes: number;
  }[];
}

interface AppContextValue {
  list: {
    _id: string;
    text: string;
    answer: string;
    likes: number;
  }[];
  setList: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      text: string;
      answer: string;
      likes: number;
    }[]>
  >;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export async function getServerSideProps(): Promise<{ props: Props }> {
  try {
    const data = await Search.find({}).lean();
    console.log(data);

    const searchList = data.map(({ _id, text, answer, likes }) => ({
      _id: _id.toString(),
      text,
      answer,
      likes,
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

export default function Home({ searchList }: Props): JSX.Element {
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext) {
      appContext.setList(searchList);
    }
  }, [searchList, appContext]);

  return (
    <>
      <Navbar />
      <Chatbot />
      <ImageGen />
      <Searchlist serverList={searchList} />
    </>
  );
}
