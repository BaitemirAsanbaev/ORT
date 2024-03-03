import Banner from '../../components/Banner/Banner'
import Courses from '../../components/Courses/Courses'
import Slider from '../../components/Slider/Slider'
import classes from './Home.module.scss'
export default function Home() {
  return (
    <div className={classes.Home}>
        <Slider/>
        <Banner/>
        <Courses/>
    </div>
  )
}
