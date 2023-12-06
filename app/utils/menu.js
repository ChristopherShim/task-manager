import { list, check, todo, home, moon, bell } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: bell,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: todo,
    link: "/incomplete",
  },
  {
    id: 5,
    title: "Unimportant",
    icon: moon,
    link: "/unimportant",
  },
];

export default menu;