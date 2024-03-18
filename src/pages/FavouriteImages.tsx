import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"

export const FavouriteImages = () => {
    const [favoriteImages, setFavoriteImages] = useState<{ link: string }[]>([]);

    const {user} = useAuth0();  

    console.log(user?.email);
    
    useEffect(() => {
        const fetchFavoriteImages = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/favouriteImages/print")
                if (!response.ok) {
                    throw new Error("error")
                }
                const data = await response.json();
                setFavoriteImages(data)
            } catch (error) {
                console.error("error", error);
                
            }
        }
        fetchFavoriteImages(); 
    }, []); 

    return (

        <div>
          {favoriteImages.map((image, index) => (
            <img key={index} src={image.link} alt={`Favorite Image ${index}`} />
          ))}
        </div>
 
    )

}