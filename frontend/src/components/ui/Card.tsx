import React, { FC } from "react";
import index from '../../pages/Home';

interface CardsProps {
  children: React.ReactNode[];
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-heading">
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

const Cards: FC<CardsProps> = ({ children }) => {
  return (
    <div className="cards-holder">
      {children?.map((child:any, index:number) => {
        return <Card key={index} title={child?.props.title}>{child}</Card>;
      })}
    </div>
  );
};

export default Cards
