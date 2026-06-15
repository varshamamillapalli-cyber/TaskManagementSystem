from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Render Spring Boot URL
SPRING_BOOT_URL = "https://taskmanager-springboot-varsha.onrender.com"


class User(BaseModel):
    username: str = ""
    email: str
    password: str


class Task(BaseModel):
    title: str
    description: str
    status: str
    assignedTo: str


@app.get("/")
def home():
    return {"message": "FastAPI Gateway Running"}


@app.get("/tasks")
def get_tasks():
    response = requests.get(
        f"{SPRING_BOOT_URL}/tasks"
    )
    return response.json()


@app.post("/tasks")
def add_task(task: Task):
    response = requests.post(
        f"{SPRING_BOOT_URL}/tasks",
        json=task.dict()
    )
    return response.json()


@app.put("/tasks/{id}")
def update_task(id: int, task: dict):
    response = requests.put(
        f"{SPRING_BOOT_URL}/tasks/{id}",
        json=task
    )
    return response.json()


@app.delete("/tasks/{id}")
def delete_task(id: int):
    response = requests.delete(
        f"{SPRING_BOOT_URL}/tasks/{id}"
    )
    return {"message": response.text}


@app.post("/auth/signup")
def signup(user: User):
    response = requests.post(
        f"{SPRING_BOOT_URL}/auth/signup",
        json=user.dict()
    )

    try:
        return response.json()
    except:
        return {"message": response.text}


@app.post("/auth/login")
def login(user: User):
    response = requests.post(
        f"{SPRING_BOOT_URL}/auth/login",
        json=user.dict()
    )

    try:
        return response.json()
    except:
        return {"message": response.text}
