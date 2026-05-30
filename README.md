# PDF RAG — Retrieval-Augmented Generation for PDFs

Hey there, welcome! 👋

This project lets you query any PDF using natural language. It uses **FAISS** as a local vector store and **HuggingFace sentence-transformers** to embed your documents — no OpenAI API key needed, everything runs locally.

---

## How it works

```
PDF → PyPDFLoader → Text Chunks → HuggingFace Embeddings → FAISS Index → Similarity Search → Answer
```

1. The training notebook (`train/train.ipynb`) loads your PDF, splits it into chunks, embeds them, and saves a FAISS index to `train/faiss_index/`.
2. The app (`app.py`) loads that index and lets you query it interactively from the terminal.

---

## Project Structure

```
├── app.py                  # Interactive query CLI
├── requirements.txt        # Python dependencies
├── data/                   # Put your PDF files here (gitignored)
└── train/
    ├── train.ipynb         # Notebook to build the FAISS index
    └── faiss_index/        # Generated vector index (gitignored)
```

---

## Getting Started

### 1. Clone & set up environment

```bash
git clone <repo-url>
cd PDF_Retreival_Augment_Generation

python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Add your PDF

Drop your PDF into the `data/` folder.

### 4. Build the FAISS index

Open `train/train.ipynb` in Jupyter and update the PDF path in the loader cell:

```python
loader = PyPDFLoader(r"data/your-file.pdf")
```

Run all cells. This creates `train/faiss_index/` with `index.faiss` and `index.pkl`.

### 5. Run the app

```bash
python app.py
```

```
PDF RAG ready. Type 'exit' to quit.

Ask a question: What is this document about?

--- Answer (retrieved context) ---

[1] ...relevant chunk from your PDF...
--------------------------------------------------
```

Type `exit` to quit.

---

## Dependencies

| Package | Purpose |
|---|---|
| `langchain-community` | FAISS vector store integration |
| `langchain-huggingface` | HuggingFace embeddings wrapper |
| `langchain-text-splitters` | Chunking documents |
| `pypdf` | PDF loading |
| `faiss-cpu` | Local vector similarity search |
| `sentence-transformers` | Embedding model (`all-MiniLM-L6-v2`) |

---

## Customization

- **Swap the PDF** — update the path in `train.ipynb` and re-run to rebuild the index.
- **Change the embedding model** — replace `"sentence-transformers/all-MiniLM-L6-v2"` in both `train.ipynb` and `app.py` with any model from [HuggingFace](https://huggingface.co/models?pipeline_tag=sentence-similarity).
- **Tune chunk size** — adjust `chunk_size` and `chunk_overlap` in the splitter cell inside `train.ipynb` to control retrieval granularity.
- **Change result count** — modify `k=3` in `app.py` to return more or fewer results per query.

---

## Requirements

- Python 3.11+
- No GPU required (CPU inference works fine for this model)
