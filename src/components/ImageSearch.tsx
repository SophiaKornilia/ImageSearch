import { useState } from "react";
import "../styles/main.scss";
import { useAuth0 } from "@auth0/auth0-react";


export const ImageSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchTime, setSearchTime] = useState();
  const [wordResponse, setWordResponse] = useState("");
  const [images, setImages] = useState<{ link: string }[]>([]);
  const [selectedLink, setSelectedLink] = useState("");
  const {user} = useAuth0(); 

  console.log(user?.email);
  

  const handleClick = async () => { //skicka in en parameter som är de jag söker med. Inputfältet eller de nya ordet. 
    console.log("handleclick",inputValue);
  
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }&cx=${
        import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
      }&num=10&searchType=image&q=${inputValue}`
    );

    const data = await response.json();
    setSearchTime(data.searchInformation.searchTime);

    if (data.spelling && data.spelling.correctedQuery) {
      setWordResponse(data.spelling.correctedQuery);
    } else {
      setWordResponse("");
    }
    setImages(data.items || []);
  };

  const handleWordClick = () => {
   setInputValue(wordResponse); // hur får inputvalue att uppdaterat till handleclick?
   console.log("hadleaddclick",inputValue);
  }

  const handelAddClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/favouriteImages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userEmail: user?.email,
          link: selectedLink }),
      });
      if (response.ok) {
        console.log("Bilden har lagts till i favoriter.");
      } else {
        console.error(
          "Det uppstod ett fel när bilden skulle läggas till i favoriter."
        );
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  const handleAddToFavorites = (link: string) => {
    setSelectedLink(link); // Sätt selectedLink till länken som klickades på
    console.log(link);
    handelAddClick(); // Anropa handelAddClick-funktionen för att skicka länken till servern
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={handleClick}>Search</button>
      <p onClick={() => { handleWordClick(); handleClick(); }}>{wordResponse}</p>
      <p>{searchTime}</p>

      <div id="imagesResult">
        {images?.map((item, index) => (
          <div key={index} id="imageSearchContainer">
            <div className="imgContainer">
              <img src={item.link} alt={`Image ${index}`} />
            </div>
            <button onClick={() => handleAddToFavorites(item.link)}>
              Add to favourite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
