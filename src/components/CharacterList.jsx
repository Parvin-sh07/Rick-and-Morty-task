
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loader from "./Loader";


function CharacterList({ characters,children,isLoading , onSelectCharacter}) {
  if(isLoading)
    return (
      <div className="characters-list">
        <Loader/>
      </div>
    )
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} onSelectCharacter={onSelectCharacter}/>
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item , onSelectCharacter}) {
  return (
    <div className="list__item">
      <img src={item.image} alt="item.name" />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        <EyeIcon />
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
