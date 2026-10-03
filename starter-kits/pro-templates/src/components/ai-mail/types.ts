export type MailFolder =
  "inbox" | "starred" | "snoozed" | "sent" | "drafts" | "spam" | "scheduled" | "trash";
export type MailLabel = "personal" | "work" | "promotions" | "social" | "updates";

export interface Attachment {
  name: string;
  size: string;
  type: "image" | "video" | "document";
  url: string;
}

export interface ThreadItem {
  id: string;
  senderName: string;
  senderEmail: string;
  date: string;
  subject: string;
  body: string;
  avatar?: string;
}

export interface Mail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  folder: MailFolder;
  labels: MailLabel[];
  isRead: boolean;
  isStarred: boolean;
  isSnoozed?: boolean;
  attachments?: Attachment[];
  thread?: ThreadItem[];
  threadCount?: number;
}

export interface ComposeDraft {
  to: string;
  subject: string;
  body: string;
  status: "idle" | "draft" | "sending" | "sent" | "failed";
  isAiThinking: boolean;
}

export interface MailState {
  emails: Mail[];
  activeFolder: MailFolder;
  searchQuery: string;
  selectedMailId: string | null;
  composeDraft: ComposeDraft | null;
  isAuth: boolean;
}
