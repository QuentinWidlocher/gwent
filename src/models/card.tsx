import React from "react";
import { CardComponent } from "../components/Board/Card/Card";

export interface Card {
    title: string;
}

export function cardToComponent(card: Card) {
    return (<CardComponent card={card} />)
}
