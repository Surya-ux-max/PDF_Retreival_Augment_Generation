from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

db = FAISS.load_local(
    "train/faiss_index",
    embedding_model,
    allow_dangerous_deserialization=True
)

class QueryRequest(BaseModel):
    question: str
    k: int = 3

@app.post("/query")
def query(req: QueryRequest):
    results = db.similarity_search(req.question, k=req.k)
    return {
        "results": [
            {"index": i + 1, "content": doc.page_content}
            for i, doc in enumerate(results)
        ]
    }
