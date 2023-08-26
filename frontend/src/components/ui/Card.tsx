import React, { FC } from "react";
import index from '../../pages/Home';


interface CardsProps {
  children: React.ReactNode[];
  holderID?:string
}

interface CardProps {
  title?: string;
  children: React.ReactNode;
  id?: string;
  bodyID?: string;
  cardClass?: string;
}

const Card: FC<CardProps> = ({ title, children, id, bodyID,cardClass }) => {
  
  cardClass = "card " + cardClass
  return (
    <div id={id} className={cardClass}>
      <div className="card-heading">
        <h2>{title}</h2>
      </div>
      <div id={bodyID} className="card-body">{children}</div>
    </div>
  );
};

const Cards: FC<CardsProps> = ({ children, holderID }) => {
  return (
    <div id={holderID} className="cards-holder">
      {children}
    </div>
  );
};

export { Cards, Card }
