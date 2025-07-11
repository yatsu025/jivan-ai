 # 🧘‍♂️ Jivan.ai – A Multi-Faith Spiritual AI Guide

[🌐 Live Demo](https://jivan-ai.vercel.app/)  
[📁 GitHub Repo](https://github.com/yatsu025/jivan-ai.git)

Jivan.ai is a spiritual guidance platform powered by AI, offering emotional and moral support to users based on their religious background — anonymously and respectfully.

---

## 🔮 Overview

**Jivan.ai** offers AI-powered conversations tailored to four major religions — **Hinduism, Islam, Christianity, and Sikhism**. Each religion has a unique UI and receives guidance based on traditional values, all powered by **OpenRouter's Mistral-7B model**.

---

## 🚀 Features

- 🛕 Select your religion: Hindu, Muslim, Christian, Sikh
- 🤖 AI chatbot for spiritual & emotional queries
- 🧠 Context-aware system prompts per religion
- 🌗 Light/Dark mode toggle
- 🔄 Multilingual support: Hindi, Urdu, Punjabi, English, Hinglish
- 🔐 No login required — 100% anonymous
- ⏳ Smooth loader animation while AI responds
- ⚠️ Handles API overload gracefully

---

## 🛠️ Tech Stack

| Category         | Tool / Library                          |
|------------------|------------------------------------------|
| Frontend         | React (Vite)                            |
| Styling          | Tailwind CSS                            |
| Routing          | React Router DOM                        |
| State Mgmt       | React Context API                       |
| API Integration  | Axios                                   |
| AI Model         | OpenRouter API (`mistral-7b`)           |
| Hosting          | Vercel                                  |

---

## 🧾 Project Structure

```

/src
├── /pages
│   ├── Home.jsx
│   ├── ReligionSelect.jsx
│   ├── Hindu.jsx
│   ├── Muslim.jsx
│   ├── Christian.jsx
│   └── Sikh.jsx
├── /components
│   └── ChatBox.jsx
├── /services
│   └── openRouterApi.js
├── /context
│   └── ReligionContext.jsx
└── App.jsx

````

---

## 💻 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/yatsu025/jivan-ai.git
cd jivan-ai
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variable

Create a file named `.env` in the root folder:

```env
VITE_OPENROUTER_API_KEY=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
```

> ⚠️ Never share your API key publicly. Keep `.env` in `.gitignore`.

### 4. Start the Dev Server

```bash
npm run dev
```

---

## 🔑 Get Your Own OpenRouter API Key

1. Go to 👉 [https://openrouter.ai](https://openrouter.ai)
2. Login with Google or GitHub
3. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
4. Click "Create API Key"
5. Paste it into your `.env` file like this:

```env
VITE_OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📦 Deployment

This project is deployed live using **Vercel**:

🔗 [https://jivan-ai.vercel.app/](https://jivan-ai.vercel.app/)

To deploy your fork:

* Push to GitHub
* Go to [https://vercel.com](https://vercel.com)
* Import your GitHub repo
* Add your environment variable in **Settings > Environment Variables**
* Redeploy and you're live 🎉

---

## 🙌 Acknowledgements

* [OpenRouter.ai](https://openrouter.ai) – Free and open AI API gateway
* [Mistral-7B](https://openrouter.ai/models/mistral-7b) – Fast and powerful open-source model

---

## 📜 License

This project is open-source and free to use under the **MIT License**.
