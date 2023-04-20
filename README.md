# Stable Chat 🌍🦒

The company behind Stable Diffusion just launched their own LLM, StableLM. This repo includes a Runpod.io instance to host the model using their serverless GPUs, along with a chatbot interface to interact with the model in a friendly way (:

## How to use

1. Fork this repo
2. Navigate to /runpod
3. Upload that folder to Runpod using this guide: https://docs.runpod.io/docs/worker-image-creation
4. Navigate to /chatbot
5. Add in your runpod API key and your Model ID to `.env`
6. Hit `npm install` and then `npm run dev`
7. Open `localhost:3000` in your browser and chat with the model!

## Tech Stack

- Next.js
- ChakraUI
- Python
- Vercel (for hosting API and frontend)
- Runpod (for hosting the model)

ps! star this repo if you like it ⭐
