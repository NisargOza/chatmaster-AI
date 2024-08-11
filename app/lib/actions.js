"use server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const { OpenAIEmbeddings } = require("@langchain/openai");
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { redirect } from "next/navigation";

const EMBED_MODEL = "text-embedding-3-small";
const INDEX_NAME = "ai-customer-support";
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pc.index(INDEX_NAME);
const YOUTUBE_URLS_PATH = "./app/youtube-url.json";

// Let the model study the Youtube video
export async function feedModel(prevState, url) {
  // Check if the URL is a valid Youtube URL
  if (!isValidYoutubeUrl(url)) {
    return { message: "Invalid Youtube URL" };
  }

  if (!urlExists(url)) {
    storeUrl(url);
    try {
      const texts = await getYoutubeTranscript(url);
      const docs = await getTextSplitter(texts);
      await insertDataToPinecone(docs);
    } catch (error) {
      console.log("Error feeding model:", error);
      removeUrl(url);

      if (
        error.message.includes(
          "Cannot read properties of undefined (reading 'filter')"
        )
      ) {
        return { message: "This video does not have transcripts." };
      }

      return { message: "Error feeding model." };
    }
  }

  redirect("/chatbot/youtube");
}

async function getYoutubeTranscript(url) {
  const loader = YoutubeLoader.createFromUrl(url, {
    language: "en",
    addVideoInfo: true,
  });

  try {
    const docs = await loader.load();
    return docs;
  } catch (error) {
    console.error("Error loading transcript:", error);
  }
}

async function getTextSplitter(texts) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const textToSplit = texts;
  const docs = await textSplitter.splitDocuments(textToSplit);
  return docs;
}

async function insertDataToPinecone(docs) {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: EMBED_MODEL,
  });

  for (const doc of docs) {
    const embedding = await embeddings.embedQuery(doc.pageContent);
    await pineconeIndex.upsert([
      {
        id: uuidv4(),
        values: embedding,
        metadata: {
          text: doc.pageContent,
          source: doc.metadata.source,
        },
      },
    ]);
  }
}

function urlExists(url) {
  const filePath = YOUTUBE_URLS_PATH;

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const urls = JSON.parse(fileContent);
    return urls.includes(url);
  }

  return false;
}

function storeUrl(url) {
  const filePath = YOUTUBE_URLS_PATH;

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the existing file content
    const fileContent = fs.readFileSync(filePath, "utf8");
    const urls = JSON.parse(fileContent);

    // Add the new URL to the array if it doesn't already exist
    if (!urls.includes(url)) {
      urls.push(url);
      fs.writeFileSync(filePath, JSON.stringify(urls));
    }
  } else {
    // Create the file with the new URL if it doesn't exist
    fs.writeFileSync(filePath, JSON.stringify([url]));
  }
}

function removeUrl(url) {
  const filePath = YOUTUBE_URLS_PATH;

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const urls = JSON.parse(fileContent);
    const updatedUrls = urls.filter((u) => u !== url);
    fs.writeFileSync(filePath, JSON.stringify(updatedUrls));
  }
}

function isValidYoutubeUrl(url) {
  const youtubeRegex =
    /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/watch\?v=.+$/.test(url);

  return youtubeRegex;
}
