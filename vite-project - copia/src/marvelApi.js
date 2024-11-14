  import md5 from 'md5'; // Asegúrate de tener la librería md5 instalada

  const API_PUBLIC_KEY = "d3a7640e83e6f26c84e687a10fbe6841"; // Tu clave pública
  const API_PRIVATE_KEY = "734f4fc67918478b3747a392214cb2f6c32e3754"; // Tu clave privada
  const BASE_URL = "https://gateway.marvel.com/v1/public/comics";

  // Función para obtener los cómics utilizando then
  const fetchComics = () => {
    const timestamp = new Date().getTime();  // Genera un timestamp único
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY); // Genera el hash

    // Construimos la URL con los parámetros correctos
    const url = `${BASE_URL}?orderBy=-modified&ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

    // Realizamos la solicitud fetch y devolvemos la promesa
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comics');
        }
        return response.json();
      })
      .then(data => {
        if (data.data && data.data.results) {
          return data.data.results;
        } else {
          throw new Error('No comics found');
        }
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
        throw new Error('Error fetching comics');
      });
  };

  // Función para obtener los detalles de un cómic específico usando then
  const fetchComicById = (comicId) => {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
    const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch comic details');
        }
        return response.json();
      })
      .then(data => {
        return data.data.results[0]; // Retorna el detalle del cómic
      })
      .catch(error => {
        console.error('Error fetching comic details:', error);
        throw new Error('Error fetching comic details');
      });
  };

  // Función para obtener los detalles de un personaje específico usando then
  const fetchCharacterById = (characterId) => {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;



    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }
        return response.json();
      })
      .then(data => {
        return data.data.results[0]; // Retorna el detalle del personaje
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
        throw new Error('Error fetching character details');
      });
  };

  export { fetchComics, fetchComicById, fetchCharacterById };
