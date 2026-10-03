export type Role = "user" | "assistant";
export type ComposerMode = "chat" | "image" | "write" | "search" | "research";
export type MessageStatus = "pending" | "thinking" | "streaming" | "generating" | "done";

export interface ThinkingTrace {
  steps: string[];
  /** Index of the step currently visible while thinking */
  visible: number;
  durationSec: number;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  status: MessageStatus;
  createdAt: number;
  mode?: ComposerMode;
  thinking?: ThinkingTrace;
  /** Image generation */
  images?: string[];
  progress?: number;
  /** Voice note sent from voice mode */
  voice?: { durationSec: number };
  /** Write mode — links the message to a canvas document */
  canvasTitle?: string;
  sources?: { title: string; domain: string }[];
  attachments?: { name: string; size: string }[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  projectId?: string;
  pinned?: boolean;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  files: { name: string; size: string }[];
}

export interface CanvasDoc {
  title: string;
  content: string;
  status: "streaming" | "done";
  version: number;
}

export type AppView = "chat" | "images" | "library" | "projects" | "project";
export type ModalKey = null | "work" | "plans" | "settings" | "search" | "newProject" | "share";

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  locked?: boolean;
}
