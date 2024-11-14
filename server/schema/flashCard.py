from typing import Literal, List, Union
from pydantic import BaseModel, Field
from datetime import datetime


class Card(BaseModel):
    question: str
    answer: str

class CreateFlashCardPayload(BaseModel):
    name:str
    description: str
    last_attempt_at: Union[datetime, str] = "NA"
    last_attempt_score: Union[int, str, float] = "NA"
    cards: List[Card]



class AddCardPayload(BaseModel):
    _id: int = None
    question: str
    answer: str


class UpdateDeckResultPayload(BaseModel):
    last_attempt_at: Union[datetime, str] = "NA"
    last_attempt_score: Union[int, str, float]


class CreateFlashCardAIPayload(BaseModel):
    name: str
    description: str



class FlashCardAIResponseSchema(BaseModel):
    cards: List[Card]  