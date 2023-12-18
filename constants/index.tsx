import { SidebarLink, rightsidebar } from "../@types";
export const Themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const tags = [
  {
    _id: 1,
    value: "Javascript",
    totalQuestion: 5,
  },
  { _id: 2, value: "React", totalQuestion: 2 },
  { _id: 3, value: "Nextjs", totalQuestion: 7 },
  { _id: 4, value: "Redux", totalQuestion: 10 },
  { _id: 5, value: "Java", totalQuestion: 5 },
];

export const rightsidebarcontent: rightsidebar[] = [
  {
    value: " amet consectetur adipisicing elit. Eligendivoluptatem odit dolore",
  },
  {
    value: " amet consectetur adipisicing elit. Eligendivoluptatem odit dolore",
  },
  {
    value: " amet consectetur adipisicing elit. Eligendivoluptatem odit dolore",
  },
  {
    value: " amet consectetur adipisicing elit. Eligendivoluptatem odit dolore",
  },
  {
    value: " amet consectetur adipisicing elit. Eligendivoluptatem odit dolore",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
