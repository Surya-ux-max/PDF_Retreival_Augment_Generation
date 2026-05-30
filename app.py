from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

db = FAISS.load_local(
    "train/faiss_index",
    embedding_model,
    allow_dangerous_deserialization=True
)

print("PDF RAG ready. Type 'exit' to quit.\n")

while True:
    query = input("Ask a question: ").strip()
    if query.lower() == "exit":
        break
    if not query:
        continue

    results = db.similarity_search(query, k=3)
    print("\n--- Answer (retrieved context) ---")
    for i, doc in enumerate(results, 1):
        print(f"\n[{i}] {doc.page_content}")
        print("-" * 50)
    print()
