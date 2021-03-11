// these are the endpoints we will use
// -https://pokeapi.co/api/v2/pokemon
// -https://pokeres.bastionbot.org/images/pokemon/1.png

//display a list of pokemon cards in one page (index page). not every pokemon on its page. useEffect to fetch the data.
//card has name number type image
// the state should be like this

// [
//  {
//   name:  ""
//   image_url: ""
//   number:""
//   types: []
//  },
// ......
// ]

// putting functions inside a for loop is really unreadable. I guess you did this because of the “asyc” keyword that you can’t use in the for loop
// to fix this you can extract the functions outside the for loop and make the callback function asynchronous then you can use asyc inside the for loop

import React, { useState, useEffect } from "react";

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const imgUrl = "https://pokeres.bastionbot.org/images/pokemon/";
  const holder=[]
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const pokemons = await res.json();
      const { results } = pokemons;
      for (const value of results) {
        await getFollowUp(imgUrl, value);
     }
     setPokemonData(holder)
    }
    getData();

    const getFollowUp = async (imgUrl, value) => {
      const res = await fetch(value.url);
      const pokemon = await res.json().then((data) => {
        return {
          types: data.types,
          name: data.name,
          image_url: imgUrl + data.id + ".png",
          number: data.id,
        };
      });
      holder.push(pokemon);
    };
  }, []);

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Pokiemons</h1>
        <p className="description">click on a pokemon to view his page</p>
        <div className="">
          <ul className="no-bullets grid">
            {pokemonData.map((x) => (
              <li key={x.number} className="card">
                <img src={x.image_url} alt={x.name} width="200" height="200" />
                <h2>
                  {x.number}. {x.name}
                </h2>
                <ul>
                  {x.types.map((x, idx) => (
                    <li key={idx}>{x.type.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        ul.no-bullets {
          list-style-type: none; /* Remove bullets */
          padding: 0; /* Remove padding */
          margin: 0; /* Remove margins */
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://pokeapi.co/api/v2/pokemon");
//   const pokemons = await res.json();
//   return {
//     props: {
//       pokemons,
//     },
//   };
// }

export default Home;
