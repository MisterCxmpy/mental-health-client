import { useState, useEffect } from 'react'
import quotes from '../assets/quotes.json'

function useQuote() {
    const [quote, setQuote] = useState(quotes[0]);

    const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]

    useEffect(() => {
        setQuote(getRandomQuote());
    }, [])

  return { quote, getRandomQuote };
}

export default useQuote;