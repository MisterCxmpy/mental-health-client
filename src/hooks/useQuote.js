import { useState, useEffect } from 'react'
import quotes from '../assets/quotes.json'

function useQuote() {
    const [quote, setQuote] = useState(quotes[0]);

    const getRandomQuote = () => {
      let quote = quotes[Math.floor(Math.random() * quotes.length)]
      
      if(quote.q.length > 60) getRandomQuote()

      return quote
    }

    useEffect(() => {
      setQuote(getRandomQuote());
    }, [])

  return { quote, getRandomQuote };
}

export default useQuote;