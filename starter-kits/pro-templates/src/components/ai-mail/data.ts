import { Mail } from "./types";

export const MOCK_EMAILS: Mail[] = [
  {
    id: "m1",
    senderName: "Google",
    senderEmail: "ahang7@gmail.com",
    subject: "Manual Account Verification",
    preview: "Hello 7ahang, Your account has been verified. (ahang7@gmail.com), and you...",
    body: `Hello 7ahang,

Your account has been verified. You can now access all Google services with your new credentials.
If you have any questions, please contact our support team.

Best,
Google Team`,
    date: "2023-06-25T10:00:00Z",
    folder: "inbox",
    labels: ["updates"],
    isRead: false,
    isStarred: true,
  },
  {
    id: "m2",
    senderName: "Medium",
    senderEmail: "digest@medium.com",
    subject: "Today's highlights",
    preview: "Tint and shade are areas of color theory which focus on the combining of new...",
    body: `Today's highlights

Tint and shade are areas of color theory which focus on the combining of new colors and adjusting their lightness and darkness.

Read more about design theories and principles on Medium.`,
    date: "2023-06-23T14:30:00Z",
    folder: "inbox",
    labels: ["updates"],
    isRead: false,
    isStarred: false,
  },
  {
    id: "m3",
    senderName: "Tamas Bunce",
    senderEmail: "tamas@design.co",
    subject: "Work Enquiry",
    preview: "This is Julim who contacted on Dribbble, thanks for getting back, and hope it...",
    body: `Hi 7ahang,

This is Julim who contacted you on Dribbble, thanks for getting back, and hope it's not too late. 
We are looking for a senior product designer to help us revamp our core platform.

I've attached some initial project briefs. Let me know your thoughts!

Best,
Tamas`,
    date: "2023-06-22T09:15:00Z",
    folder: "inbox",
    labels: ["work"],
    isRead: true,
    isStarred: false,
    threadCount: 2,
    attachments: [
      {
        name: "Projects 7.png",
        size: "2.4 MB",
        type: "image",
        url: "https://picsum.photos/seed/p7/400/300",
      },
    ],
  },
  {
    id: "m4",
    senderName: "Slack",
    senderEmail: "notifications@slack.com",
    subject: "Now's the perfect time to automate you...",
    preview: "That's okay! If you want to learn more about what Slack can do for you, try...",
    body: `Automate your workflow with Slack!

Now's the perfect time to explore Workflow Builder and save your team hours of repetitive tasks.
Click here to learn more.`,
    date: "2023-06-19T11:20:00Z",
    folder: "inbox",
    labels: ["promotions"],
    isRead: true,
    isStarred: true,
  },
  {
    id: "m5",
    senderName: "Yuhang Lu",
    senderEmail: "yuhang@behance.net",
    subject: "Think Different",
    preview: "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round...",
    body: `Here's to the crazy ones.
The misfits. The rebels. The troublemakers.
The round pegs in the square holes.
The ones who see things differently.

They're not fond of rules.
And they have no respect for the status quo.
You can quote them, disagree with them, glorify or vilify them.
About the only thing you can't do is ignore them.

Because they change things.
They push the human race forward.
And while some may see them as the crazy ones, we see genius.
Because the people who are crazy enough to think they can change the world,
are the ones who do.`,
    date: "2023-05-25T10:25:00Z",
    folder: "inbox",
    labels: ["social"],
    isRead: true,
    isStarred: false,
    threadCount: 6,
    attachments: [
      {
        name: "Think Different",
        size: "72.3 MB",
        type: "video",
        url: "https://picsum.photos/seed/v1/400/300",
      },
      {
        name: "Samsung Gala",
        size: "64.7 MB",
        type: "video",
        url: "https://picsum.photos/seed/v2/400/300",
      },
      { name: "Screen", size: "6 MB", type: "image", url: "https://picsum.photos/seed/v3/400/300" },
    ],
    thread: [
      {
        id: "t1",
        senderName: "7ahang",
        senderEmail: "7ahang@gmail.com",
        date: "2023-05-23T19:28:00Z",
        subject: "How to live before you die",
        body: "Your time is limited so don't waste it living someone else's life, or be trapped by dogma which is being trapped by other people's thinking. Have the courage to follow your heart and intuition, they somehow already know what you want to become. Stay hungry, stay foolish.",
      },
    ],
  },
  {
    id: "m6",
    senderName: "Adobe Creative Cloud",
    senderEmail: "hello@adobe.com",
    subject: "Showcase your creative work",
    preview: "Discover new portfolio templates and get your work noticed by top agencies...",
    body: `Showcase your creative work with Adobe Portfolio.`,
    date: "2023-05-24T08:00:00Z",
    folder: "inbox",
    labels: ["promotions"],
    isRead: true,
    isStarred: false,
  },
];
