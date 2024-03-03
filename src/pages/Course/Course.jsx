import { useParams } from 'react-router-dom'
import classes from './Course.module.scss'
import Videos from '../../components/Videos/Videos'
import Test from '../../components/Tests/Tests'

export default function Course() {
  const params = useParams()
  return (
    <div className={classes.Course}>
       <Videos/>
       <Test/>
    </div>
   
  )
}
