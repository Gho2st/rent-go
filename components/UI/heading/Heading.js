import classes from './Heading.module.css'

export default function Heading({ text }) {
  return <h1 className={classes.heading}>{text}</h1>;
}
