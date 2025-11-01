import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'notes.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function readStorage() {
  try {
    const raw = await fs.readFile(STORAGE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function writeStorage(content) {
  await ensureDataDir();
  const payload = JSON.stringify(content, null, 2);
  await fs.writeFile(STORAGE_FILE, payload, 'utf8');
}

function sanitizeText(text) {
  if (!text) return '';
  return text.toString().trim();
}

export async function addNote(remoteJid, note) {
  const text = sanitizeText(note?.text);

  if (!remoteJid || !text) {
    return { stored: false };
  }

  const entry = {
    type: note.type ?? 'recado',
    text,
    createdAt: new Date().toISOString()
  };

  const storage = await readStorage();
  const list = Array.isArray(storage[remoteJid]) ? storage[remoteJid] : [];
  list.push(entry);

  storage[remoteJid] = list;
  await writeStorage(storage);

  return { stored: true, entry, total: list.length };
}

export async function listNotes(remoteJid) {
  if (!remoteJid) return [];

  const storage = await readStorage();
  return Array.isArray(storage[remoteJid]) ? storage[remoteJid] : [];
}

export async function clearNotes(remoteJid) {
  if (!remoteJid) return { cleared: false };

  const storage = await readStorage();

  if (!Array.isArray(storage[remoteJid]) || storage[remoteJid].length === 0) {
    return { cleared: false };
  }

  delete storage[remoteJid];
  await writeStorage(storage);
  return { cleared: true };
}
